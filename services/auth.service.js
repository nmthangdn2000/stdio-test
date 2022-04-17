import User from '../models/user.model';
import { ERROR } from '../common/constants';
import * as PasswordHash from '../common/hashPassword';
import jwt from 'jsonwebtoken';
import appConfig from '../configs/appConfig';
import * as mailer from '../helpers/mailer';

const login = async (email, password) => {
  const query = {
    email,
    password: PasswordHash.sha512(password),
  };
  const user = await User.findOne(query).select('-password').lean();
  if (!user) throw new Error(ERROR.AccountDoesNotExist);
  const { _id, name, ...data } = user;
  const token = endCodeToken({ _id, name });
  return { ...user, token };
};

const register = async (data) => {
  let { password, ...objectUser } = data;
  password = PasswordHash.sha512(password);
  const newUser = new User({
    ...objectUser,
    password,
  });
  const user = await newUser.save();
  if (!user) throw new Error(ERROR.CanNotCreateUser);
  const token = PasswordHash.sha512(tokenVerifyEmail(data.name, data.email));
  mailer.sendMail(data.email, subject, html(data.name, data.email, token));
};

const verifyEmail = async (email, tokenUrl) => {
  const user = await User.findOne({ email }).lean();
  const { _id, name } = user;
  const token = PasswordHash.sha512(tokenVerifyEmail(name, email));
  if (tokenUrl != token) throw new Error(ERROR.CantNotVerifyEmail);
  const update = await User.updateOne({ _id }, { verify_email: new Date(), updatedAt: new Date() });
  if (update.modifiedCount < 1) throw new Error(ERROR.CantNotVerifyEmail);
};

const sendVerifyEmail = async (email) => {
  if (!email) throw Error(ERROR.CantNotSendVerifyEmail);
  const user = await User.findOne({ email }).lean();
  if (!user) throw Error(ERROR.CantNotSendVerifyEmail);
  const token = PasswordHash.sha512(tokenVerifyEmail(user.name, email));
  mailer.sendMail(email, subject, html(user.name, email, token));
};

export { login, register, verifyEmail, sendVerifyEmail };

const subject = 'Verify email';

const tokenVerifyEmail = (name, email, password) => `${name}-${email}-${password}`;

const endCodeToken = (data) => {
  return jwt.sign(data, appConfig.KEY_SECRET_JWT, { expiresIn: '30d' });
};

const html = (name, email, token) => `
<p>Xin chào <strong>${name}</strong></p>
<p>Cảm ơn bạn đã đăng ký tài khoảng tại website khoi.com của chúng tôi</p>
<p>
  Để có trải nghiệm tốt bạn vui lòng click vào button dưới đây để xác thực email của
  bạn
</p>
<a style="
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 50px;
  " href="http://localhost:3000/api/verify/${email}?token=${token}">
  Xác thực email
</a>
<div style="margin-top: 20px">
  <strong style="font-size: 50px"> Wellcome to khoi.com </strong>
</div>
`;
