const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model');

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: 'lax',
  signed: true,
};

function createUser(name, email, password) {
  return bcrypt.hash(password, 10).then((hash) => {
    model.createUser(name, email, hash);
    console.log(name, email, hash);
  });
}

function verifyUser(email, password) {
  return model.getUser(email).then((user) => {
    return bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        throw new Error("password doesn't match!");
      } else {
        delete user.password;
        return user;
      }
    });
  });
}

function saveUserSession(user) {
  const sid = crypto.randomBytes(18).toString('base64');
  return model.createSession(sid, { user });
}

module.exports = { verifyUser, saveUserSession, createUser, COOKIE_OPTIONS };
