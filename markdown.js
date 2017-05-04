var fs = require('fs');
var uuid = require('node-uuid');
var Base64 = require('./base64.js');
var Base64 = require('./base64.js');

module.exports = function (req, res, app) {
    res.set({
        'Content-Type': 'text/plain',
        'ETag': uuid.v4(),
        'Transfer-Encoding': 'chunked'
    });

    var name = Base64.decode(filename);

    res.send("markdown");
};

