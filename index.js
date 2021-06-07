const cookieParser = require('cookie-parser');
const random = (() => {
  const random = Math.floor(Math.random() * 10000000000).toString().split('');
  const date = Date.now().toString().split('');
  date.forEach((char, index) => {
    const partial = Math.floor(index / date.length * random.length);
    random.splice(partial, 0, char);
  });
  return random.join('');
});
module.exports = ((app, cookieName = '_qs') => {
  app.use(cookieParser());
  const sessionStorage = {};
  app.use((req, res, next) => {
    if (req.cookies[cookieName] == undefined) res.cookie(cookieName, random(35), {expire: 3600000 + Date.now()});
    req.sessionID = req.cookies[cookieName];
    req.session = {};
    req.session.get = (key) => {
      if (sessionStorage[req.sessionID] == undefined || sessionStorage[req.sessionID] == null) sessionStorage[req.sessionID] = {};
      return sessionStorage[req.sessionID][key];
    }
    req.session.getAll = () => {
      if (sessionStorage[req.sessionID] == undefined || sessionStorage[req.sessionID] == null) sessionStorage[req.sessionID] = {};
      return sessionStorage[req.sessionID];
    }
    req.session.set = (key, value) => {
      if (sessionStorage[req.sessionID] == undefined || sessionStorage[req.sessionID] == null) sessionStorage[req.sessionID] = {};
      return sessionStorage[req.sessionID][key] = value;
    }
    res.logout = () => {
      delete sessionStorage[req.sessionID];
      req.sessionID = null;
      res.clearCookie(cookieName);
      return res;
    }
    next();
  });
});