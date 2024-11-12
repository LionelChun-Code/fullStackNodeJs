module.exports = function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Signup Page</title>
        </head>
        <body>
            <h1>Signup Page</h1>
        </body>
        </html>
    `);
};