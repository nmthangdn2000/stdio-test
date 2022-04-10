'use strict';

import crypto from 'crypto';

class HashPassword {
  hash(algorithm, text) {
    return crypto.createHash(algorithm).update(text).digest('hex');
  }

  sha512(text) {
    return this.hash('sha512', text);
  }
}

export default new HashPassword();
