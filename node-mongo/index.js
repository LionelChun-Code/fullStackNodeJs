const http = require('http');
const { parseCookies, createSession, getSession, destroySession } = require('./modules/sessionManager');
const { handleProfile } = require('./profile');
const { handleRegister } = require('./register');

const server = http.createServer((req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  let session = getSession(cookies);

  if (!session) {
    const sessionId = createSession(res);
    session = { id: sessionId, user: null };
  }

  if (req.url === '/register') {
    handleRegister(req, res);  // 先處理註冊路由
  } else if (req.url === '/login') {
    session.user = 'loggedInUser';
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Logged in successfully!');
  } else if (req.url === '/profile') {
    handleProfile(req, res);  // 再處理個人資料路由
  } else if (req.url === '/logout') {
    destroySession(res, session.id);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Logged out successfully!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
