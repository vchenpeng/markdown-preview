var fs = require('fs');
var uuid = require('node-uuid');


module.exports = function (req, res, app) {
    res.set({
        'Content-Type': 'text/html',
        'ETag': uuid.v4(),
        'Transfer-Encoding': 'chunked'
    });

    var data = fs.readFileSync("./pages/upload.html", "utf-8");
    res.write(data);
    res.end();
};