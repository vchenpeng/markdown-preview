var uuid = require('node-uuid');
var Base64 = require('../static/utils/base64.js');
var fs = require('fs');
var mongoose = require("mongoose");

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
        'Content-Type': 'text/html',
        'ETag': uuid.v4()
    });
    var code = req.params.code;

    var mongooseModel = db.model('md_info', mongooseSchema);
    var data = fs.readFileSync("./pages/markdown.html", "utf-8");
    mongooseModel.findById(code,function(err,t){
        console.log("err",err,t);
        if(err){
            data = data.replace('<title>加载中</title>', '<title>404</title>');
            res.send(data);
        }else{
            //console.log("密内容",data);
            data = data.replace('<title>加载中</title>', '<title>' + t.name + '</title>');
            res.send(data);
        }
    });

    
    //var decodeName = Base64.decode(code);
    

};