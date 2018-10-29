const http = require('http');
const chalk = require('chalk');
const config = require('../config/defaultConfig');
const path = require('path');
const fs = require('fs');

const server = http.createServer( (req, res) => {
    // 获取文件路径 = 文件在系统的路径 + req.url  ==> /abc..
    const filePath = path.join(config.root, req.url);
    console.log(filePath);
    // 判断整个路径是目录还是文件
    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain;charset=utf8');
            res.end(`${filePath} is not a directory or file`);
            return;
        }
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain;charset=utf8');
            fs.createReadStream(filePath).pipe(res);
            // 下面这种超级慢,自己卡自己,虽然是异步的
            // fs.readFile(filePath, (err, data) => {
            //     res.end(data);
            // })
        } else if (stats.isDirectory()) {
            fs.readdir(filePath, (err, files) => {
                if (err) {
                    throw err;
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    console.log(files);
                    res.end(files.join(','));
                    // res.end(files);
                }
            })
        }
    })


})

server.listen(config.port, config.hostname, () => {
    const addr = `http://${config.hostname}:${config.port}`;
    console.log(`server is started at ${chalk.green(addr)}`);
})

