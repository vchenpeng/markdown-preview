# markdown-preview 预览

### 1. 介绍

> 将markdown文件动态转换，可直接网页浏览
    
### 2. 使用方法
```
npm install

node index
```
### 3. 站点发布
> 安装要求【以IIS做示例】
- 服务器端安装 node [点此下载](http://nodejs.org/)
- 安装 IIS的 URL Rewrite 模块 [点此下载]( http://www.iis.net/downloads/microsoft/url-rewrite)
- 安装 iisnode [点此下载](https://github.com/tjanczuk/iisnode/releases/download/v0.2.11/iisnode-full-v0.2.11-x64.msi)
> 然后正常顺序部署站点就OK


### 4. 使用
```
假设部署后网址为：http://md.zuorishu.com:80

1.访问http://md.zuorishu.com/upload上传你要预览的md文件
2.上传成功后系统默认为你分配访问链接
3.访问为你分配的链接地址即可

```
### 5. 测试访问地址和二维码
```
http://md.zuorishu.com/dGVzdA%3D%3D
```
![test](http://qr.api.cli.im/qr?data=http%253A%252F%252Fmd.zuorishu.com%252FdGVzdA%25253D%25253D&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=fa86d219a610494d1dce0531512e3dc3)

### 6. 已知bug
```
+ 上传文件名为中文导致出错
```

### 7. 修改记录
```
+ 将md文档存入mongodb
```
