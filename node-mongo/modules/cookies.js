const parseCookies = (request) => {
    const list = {};
    const cookieHeader = request.headers.cookie;
    console.log(cookieHeader);
    if (cookieHeader) {
        cookieHeader.split(';').forEach(cookie => {
            const parts = cookie.split("=");
            list[parts.shift().trim()] = decodeURL(parts.join("="));
        });
    }
    return list;
};

function clearCookies(response) {
    response.setHeader('Set-Cookie', [
        'sessionId=; Max-Age=0; HttpOnly',
        'name=; Max-Age=0; HttpOnly'
    ]);
}

module.exports = {parseCookies, clearCookies};