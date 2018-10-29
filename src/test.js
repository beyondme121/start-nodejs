const http = require('http');
const conf = require('../config/defaultConfig');
const chalk = require('chalk');

const server = http.createServer( (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    let content = `
        <html>
            <body>
                <h1>hello world !!!</h1>
            </body>
        </html>
    `;
    res.write(content);
    res.end();
});

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.log(`Server started at ${chalk.green(addr)}`);
});
