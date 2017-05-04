# markdown-preview 预览

### 1. 介绍

> 将markdown文件动态转换，可直接网页浏览
    
### 2. 使用方法
```
npm install

node index
```
### 3. 站点发布[以IIS做示例]
> 安装要求
- 服务器端安装 node [点此下载](http://nodejs.org/)
- 安装 IIS的 URL Rewrite 模块 [点此下载]( http://www.iis.net/downloads/microsoft/url-rewrite)
- 安装 iisnode [点此下载](https://github.com/tjanczuk/iisnode)
> 然后正常顺序部署站点就OK

### 4. 使用
```
假设部署后网址为：http://md.zuorishu.com/upload

1.访问http://md.zuorishu.com/upload上传你要预览的md文件
2.上传成功后系统默认为你分配访问链接
3.访问为你分配的链接地址即可

```