var fs = require('fs');
var uuid = require('node-uuid');
var Base64 = require('../static/utils/base64.js');
var CryptoJS = require('../static/utils/aes.js');
//var aesutil = require('../utils/aesutil.js');

module.exports = function (req, res, app) {
    res.set({
        'Content-Type': 'text/plain',
        'ETag': uuid.v4(),
        'Transfer-Encoding': 'chunked'
    });
    
    if (req.query.key) {
        var name = Base64.decode(req.query.key),
            url = "files/" + name + ".md";
        fs.exists(url, function (exists) {
            if (exists) {
                var data = fs.readFileSync(url, "utf-8");
                console.log('加密前内容',data);
                var result = CryptoJS.AES.encrypt(data, "aes").toString();
                //var result = aesutil.encryption("aaabbb", "aes");
                res.send(result);
            } else {


                url = 'files/404.md';
                var data = fs.readFileSync(url, "utf-8");
                var result = CryptoJS.AES.encrypt(data, "aes").toString();
                //var result = aesutil.encryption(data, "aes");
                res.send(result);
            }

            /*if(exists){
                fs.readFile(url, "utf-8", function(err, data){
                    var result = CryptoJS.AES.encrypt(data, "aes").toString();
                    res.send(result);
                });
            }else{
                url = 'files/404.md';
                fs.readFile(url, "utf-8", function(err, data){
                    var result = CryptoJS.AES.encrypt(data, "aes").toString();
                    res.send(result);
                });
            }*/
        });
    } else {
        res.send("网页未找到");
    }
};