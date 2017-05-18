var formidable = require('formidable');
var fs = require('fs');  //node.js核心的文件处理模块
var mongoose = require("mongoose");
var db = mongoose.createConnection("mongodb://115.29.230.180:27017/dada");
var mongooseSchema = new mongoose.Schema({
    key : {type:String},        //显示key
    name : {type:String},       //文件名称
    filename : {type:String},   //文件名称含拓展名称
    content : {type:String},
    time : {type:Date,default:Date.now}
});

exports.upload = function (req, res, next) {
    var message = '';
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'files/';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
        }
        console.log("文件名称1", files.resource.name);
        var filename = encodeURIComponent(files.resource.name);

        // 对文件名进行处理，以应对上传同名文件的情况
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }

        var avatarName = decodeURIComponent(name) + '.' + type;

        var mongooseModel = db.model('mongoose', mongooseSchema);
        var doc = {
            key: +new Date(),
            name: files.resource.name,
            filename: avatarName,
            content: "test data~"
        }；
        var entity = new mongooseModel(doc);
        entity.save(function(error){
            if(error){
                console.log(error);
            }else{
                console.log("保存成功");
            }
        });

        var newPath = form.uploadDir + avatarName;
        console.log("文件名称2", files.resource.path, newPath);
        fs.renameSync(files.resource.path, newPath);  //重命名
        next(decodeURIComponent(name));
    });
};