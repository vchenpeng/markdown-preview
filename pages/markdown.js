var fs = require('fs');
var uuid = require('node-uuid');
var Base64 = require('../static/utils/base64.js');
var CryptoJS = require('../static/utils/aes.js');
var mongoose = require("mongoose");
//var aesutil = require('../utils/aesutil.js');
//
var db = mongoose.createConnection("mongodb://115.29.230.180:27017/dada");
var mongooseSchema = new mongoose.Schema({
    key : {type:String},        //显示key
    name : {type:String},       //文件名称
    filename : {type:String},   //文件名称含拓展名称
    content : {type:String},
    pwd: {type:String},
    time : {type:Date,default:Date.now}
});

module.exports = function (req, res, app) {
    res.set({
        'Content-Type': 'text/plain',
        //'ETag': uuid.v4(),
        //'Transfer-Encoding': 'chunked',
        'Connection': 'keep-alive',
        'v-flag': 'ex'
    });

    //mongodb查询
    var mongooseModel = db.model('md_info', mongooseSchema);
    var wherestr = {'_id' : req.query.key,'pwd':req.query.flag};
    mongooseModel.find(wherestr, function(err,data){
    //mongooseModel.findById(req.query.key,function(err,data){
        console.log("err",err);
        if(err){
            res.send("U2FsdGVkX1/MCXTWSE2wjqvs7dymJVqx++z2iMeWP6aayFcU8i9KEJLESnBB1b+xfbF77XDzMocF/965sjp/0umLf2AM4tdZjuffcW2zZdtWzyL85MSF/fC0SbLENfT7ajq5lp+SDzKtX/RjzvUS/w==");
        }else{
            if(data.length>0){
                console.log("密内容",data);
                var first = data[0];
                res.send(first.content);
            }else{
                res.send("文件不存在");
            }
        }
    });

    
    // if (req.query.key) {
    //     var name = Base64.decode(req.query.key),
    //         url = "files/" + name + ".md";
    //     fs.exists(url, function (exists) {
    //         if (exists) {
    //             var data = fs.readFileSync(url, "utf-8");
    //             console.log('加密前内容',data);
    //             var result = CryptoJS.AES.encrypt(data, "aes").toString();
    //             //var result = aesutil.encryption("aaabbb", "aes");
    //             res.send(result);
    //         } else {


    //             url = 'files/404.md';
    //             var data = fs.readFileSync(url, "utf-8");
    //             var result = CryptoJS.AES.encrypt(data, "aes").toString();
    //             //var result = aesutil.encryption(data, "aes");
    //             res.send(result);
    //         }
    //     });
    // } else {
    //     res.send("网页未找到");
    // }
};