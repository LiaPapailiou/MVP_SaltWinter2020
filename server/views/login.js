const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');


function generateToken(user) {
  const { email } = user;
  const payload = { email };
  const signOptions = {
    issuer: 'PromoreSolution',
    subject: 'dev@promoresolution.com',
    audience: 'https://promoresolution.com',
    expiresIn: '7d',
    algorithm: 'RS256',
  };

  const privateKey = fs.readFileSync('./jwtkeys/jwt.key', 'utf8');
  const token = jwt.sign(payload, privateKey, signOptions);

  return token;
}

function isAuthorized(ctx, next) {
  const authToken = ctx.cookies.get('authtoken');

  if (typeof authToken !== 'undefined') {
    const cert = fs.readFileSync('./jwtkeys/jwt.pub', 'utf8');

    jwt.verify(authToken, cert, { algorithms: ['RS256'] }, async (err) => {
      if (err) {
        ctx.status = 200;
        ctx.body = { error: { code: '403RUS03', message: 'Not Authorized' } };
      }

      return next();
    });
  } else {
    ctx.status = 200;
    ctx.body = { error: { code: '403RUS04', message: 'Not Authorized' } };
  }
}

const login = async (ctx) => {
  const { email, password } = ctx.request.body;
  let data = await fetch('http://localhost:5000/DB.json');
  data = await data.json();
  const user = data.find((person) => person.email === email);


  if (typeof user === 'undefined') {
    ctx.status = 200;
    ctx.body = { error: { code: '403RUS01', message: 'Incorrect email address' } };
  } else {
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      ctx.status = 200;
      ctx.body = { error: { code: '403RUS02', message: 'Incorrect password ' } };
    } else {
      const token = generateToken(user);

      ctx.cookies.set('authtoken', token);
      ctx.status = 200;
      ctx.body = { success: { code: 200, message: 'Logged in' } };
    }
  }
};

module.exports = {
  login,
  isAuthorized,
};
