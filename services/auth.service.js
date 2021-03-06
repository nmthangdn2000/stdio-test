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
  const { _id, userName, ...data } = user;
  const token = endCodeToken({ _id, userName });
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

  const token = PasswordHash.sha512(tokenVerifyEmail(data.userName, data.email, user.updatedAt));
  mailer.sendMail(data.email, subjectEmail, htmlVerifyEmail(data.userName, data.email, token));
};

const verifyEmail = async (email, tokenUrl) => {
  const user = await User.findOne({ email }).lean();
  const { _id, userName, updatedAt } = user;
  const token = PasswordHash.sha512(tokenVerifyEmail(userName, email, updatedAt));
  if (tokenUrl != token) throw new Error(ERROR.CantNotVerifyEmail);
  const update = await User.updateOne({ _id }, { verify_email: new Date(), updatedAt: new Date() });
  if (update.modifiedCount < 1) throw new Error(ERROR.CantNotVerifyEmail);
};

const sendVerifyEmail = async (email) => {
  if (!email) throw Error(ERROR.CantNotSendVerifyEmail);
  const user = await User.findOne({ email }).lean();
  if (!user) throw Error(ERROR.CantNotSendVerifyEmail);
  const { userName, updatedAt } = user;
  const token = PasswordHash.sha512(tokenVerifyEmail(userName, email, updatedAt));
  mailer.sendMail(email, subjectEmail, htmlVerifyEmail(userName, email, token));
};

const forgotPassword = async (email) => {
  if (!email) throw Error(ERROR.EmailDoesNotExist);
  const user = await User.findOne({ email }).lean();
  if (!user) throw Error(ERROR.EmailDoesNotExist);
  const { userName, updatedAt } = user;
  const token = PasswordHash.sha512(tokenResetPassword(userName, email, updatedAt));
  mailer.sendMail(email, subjectPasswrod, htmlResetPassword(userName, email, token));
};

const resetPassword = async (email, tokenUrl) => {
  const user = await User.findOne({ email }).lean();
  const { userName, updatedAt } = user;
  const token = PasswordHash.sha512(tokenResetPassword(userName, email, updatedAt));
  if (tokenUrl != token) throw new Error(ERROR.CantNotResetPassword);
};

const changePassword = async (email, password, tokenUrl) => {
  if (!email || !password || !tokenUrl) throw Error(ERROR.CantNotUpdatePassword);

  const user = await User.findOne({ email }).lean();
  if (!user) throw Error(ERROR.CantNotUpdatePassword);

  const { userName, updatedAt } = user;
  const token = PasswordHash.sha512(tokenResetPassword(userName, email, updatedAt));
  if (tokenUrl != token) throw new Error(ERROR.CantNotUpdatePassword);

  password = PasswordHash.sha512(password);
  const update = await User.updateOne({ email }, { password, updatedAt: new Date() });
  if (update.modifiedCount < 1) throw new Error(ERROR.CantNotUpdatePassword);
};

export { login, register, verifyEmail, sendVerifyEmail, forgotPassword, resetPassword, changePassword };

const subjectEmail = 'Verify email';
const subjectPasswrod = 'Forgot password';

const tokenVerifyEmail = (userName, email, password) => `${userName}-${email}-${password}-verifyemail`;
const tokenResetPassword = (userName, email, password) => `${userName}-${email}-${password}-resetpassword`;

const endCodeToken = (data) => {
  return jwt.sign(data, appConfig.KEY_SECRET_JWT, { expiresIn: '30d' });
};

const htmlVerifyEmail = (userName, email, token) => `
<p>Xin ch??o <strong>${userName}</strong></p>
<p>C???m ??n b???n ???? ????ng k?? t??i kho???ng t???i trang web blog c???a ch??ng t??i</p>
<p>
  ????? c?? tr???i nghi???m t???t b???n vui l??ng click v??o button d?????i ????y ????? x??c th???c email c???a
  b???n
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
  X??c th???c email
</a>
`;

const htmlResetPassword = (userName, email, token) => `
<p>Xin ch??o <strong>${userName}</strong></p>
<p>????? ?????t l???i m???t kh???u c???a b???n t???i trang web blog c???a ch??ng t??i vui l??ng click v??o button d?????i ????y:</p>
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
  " href="http://localhost:3000/api/password/reset/${email}?token=${token}">
  ?????t l???i m???t kh???u
</a>
`;
