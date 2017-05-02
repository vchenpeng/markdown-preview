/*示例*/
var http = require('http');
var _url = require('url');
var cheerio = require("cheerio");
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');
var crypto = require('crypto');
var file = require("./file.js");  //此时，route.js与file.js处于同个目录下
var rf = require('fs');
var Base64 = require('./base64.js');
var CryptoJS = require("./aes.js");
var charset = 'utf8';


http.createServer(function (req, res) {
    var arg = _url.parse(req.url, true).query;
    var link = arg.link;
    var callback = arg.callback;
    var protocol = "http";

    var isReadMd = arg["key"];

    if (!isReadMd) {
        var isUpload = req.url.indexOf("?upload") >= 0;
        if (isUpload) {
            var isUploadAction = req.url.indexOf("?uploadaction") >= 0;
            if (isUploadAction) {
                file.upload(req, res, function (name) {
                    res.writeHead(200, {
                        "Content-Type": "text/html;charset=utf-8",
                        "Transfer-Encoding": "chunked"
                    });
                    var encodeName = Base64.encode(name);
                    res.write("<p>上传文件为：<span style='color:green;'>" + name + "</span><a style='padding-left:20px;' href='http://md.zuorishu.com/?" + encodeURIComponent(encodeName) + "'>立即访问</a></p>");
                    res.end();
                });
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/html;charset=utf-8",
                    "Transfer-Encoding": "chunked"
                });
                var data = rf.readFileSync("upload.html", "utf-8");
                res.write(data);
                res.end();
            }
        } else {
            res.writeHead(200, {
                "Content-Type": "text/html;charset=utf-8",
                "Transfer-Encoding": "chunked"
            });

            var name = req.url.substring(req.url.indexOf('?') + 1);
            var decodeName = Base64.decode(name);
            var data = rf.readFileSync("index.html", "utf-8");
            data = data.replace('<title>加载中</title>', '<title>' + decodeURIComponent(decodeName) + '</title>');
            res.write(data);
            res.end();
        }
    } else {
        var filename = arg["key"];
        var name = Base64.decode(filename);
        res.writeHead(200, {
            "Content-Type": "text/plain;",
            "Transfer-Encoding": "chunked"
        });
        var url = "md/" + name + ".md";
        rf.exists(url, function (exists) {
            if (exists) {
                var data = rf.readFileSync("md/" + name + ".md", "utf-8");

                /*var cipher = crypto.createCipher('aes-256-cbc', 'InmbuvP6Z8');
                var crypted = cipher.update("chenpeng", 'utf8', 'hex');
                res.write(crypted + ",");
                crypted += cipher.final('hex');
                res.write(crypted);*/

                /*var decipher = crypto.createDecipher('aes-256-cbc', 'InmbuvP6Z8');
                var dec = decipher.update(crypted, 'hex', 'utf8');
                dec += decipher.final('utf8');
                res.write(crypted);*/

                var result = CryptoJS.AES.encrypt(data, "aes").toString();
                res.write(result);
                res.end();
            } else {
                var data = rf.readFileSync("404.md", "utf-8");
                var result = CryptoJS.AES.encrypt(data, "aes").toString();
                res.write(result);
                res.end();
            }
        });


    }
}).listen(process.env.PORT);


function download(url, callback) {
    http.get(url, function (res) {
        var bufferHelper = new BufferHelper();
        //var body = [];
        res.on('data', function (chunk) {
            bufferHelper.concat(chunk);
            //body.push(chunk);
        });
        res.on("end", function () {
            var val = iconv.decode(bufferHelper.toBuffer(), 'utf8');
            charset = '';
            if (val.indexOf('charset=gb2312') > -1 || val.indexOf('charset=GB2312') > -1) {
                val = iconv.decode(bufferHelper.toBuffer(), 'gb2312');
                charset = 'gb2312';
            }
            else {
                charset = 'utf8';
            }
            callback(val);
        });
    }).on("error", function () {
        callback(null);
    });
}

function download2(url, callback, req, res) {
    var data = {};

    data = JSON.stringify(data);
    console.log(data);
    var opt = {
        method: "POST",
        host: "music.163.com",
        port: 80,
        path: "/api/search/pc?offset=0&limit=100&type=1&s=zhou",
        headers: {
            "Content-Type": 'application/json',
            "Content-Length": data.length
        }
    };

    var req = http.request(opt, function (serverFeedback) {
        if (serverFeedback.statusCode == 200) {
            var body = "";
            serverFeedback.on('data', function (data) { body += data; })
                          .on('end', function () { res.send(200, body); });
        }
        else {
            res.send(500, "error");
        }
    });
    req.write(data + "\n");
    req.end();
}