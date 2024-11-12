// sessionManager.js
const crypto = require('crypto');

// In-memory session store
const sessions = {};

// Helper function to parse cookies
const parseCookies = (cookieHeader) => {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=');
    cookies[name.trim()] = decodeURIComponent(rest.join('=')).trim();
  });
  return cookies;
};

// Helper function to generate a session ID
const generateSessionId = () => {
  return crypto.randomBytes(16).toString('hex');
};

const createSession = (res) => {
  const sessionId = generateSessionId();
  sessions[sessionId] = { user: null }; // Example session data
  res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Secure; SameSite=Strict`);
  return sessionId;
};

const getSession = (cookies) => {
  const sessionId = cookies['sessionId'];
  if (sessionId && sessions[sessionId]) {
    return sessions[sessionId];
  }
  return null;
};

const destroySession = (res, sessionId) => {
  delete sessions[sessionId];
  res.setHeader('Set-Cookie', 'sessionId=; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
};

module.exports = {
  parseCookies,
  createSession,
  getSession,
  destroySession
};
