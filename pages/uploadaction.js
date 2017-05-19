var uuid = require('node-uuid');
var file = require('../utils/file.js');
var Base64 = require('../static/utils/base64.js');

module.exports = function (req, res, app) {
    file.upload(req, res, function (id,name) {
        res.set({
            'Content-Type': 'text/html',
            'ETag': uuid.v4(),
            'Transfer-Encoding': 'chunked'
        });
        //var encodeName = Base64.encode(name);
        res.write("<p>上传文件为：<span style='color:green;'>" + name + "</span><a style='padding-left:20px;' href='/" + id + "'>立即访问</a></p>");
        res.end();
    });
};