const { parseCookies, getSession } = require('./modules/sessionManager');

const handleProfile = (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const session = getSession(cookies);

  if (session && session.user) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Welcome back, ${session.user}!`);
  } else {
    res.writeHead(401, { 'Content-Type': 'text/plain' });
    res.end('Please log in first.');
  }
};

module.exports = { handleProfile };
