var uuid = require('node-uuid');
var Base64 = require('../static/utils/base64.js');
var fs = require('fs');

module.exports = function (req, res, app) {
    res.set({
        'Content-Type': 'text/html',
        'ETag': uuid.v4()
    });

    var code = req.params.code;
    var decodeName = Base64.decode(code);
    var data = fs.readFileSync("./pages/markdown.html", "utf-8");
    data = data.replace('<title>加载中</title>', '<title>' + decodeURIComponent(decodeName) + '</title>');
    res.send(data);

};