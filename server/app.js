const http = require('http');
const path = require('path');
const fs = require('fs');


const {
    port,
    uploadDir,
    tmptk
} = require('./config/config.js')


const {
    loginlogin,
    cookieVerify,
    logout,
    getAllFileInfo,
    uploadFile,
    deleteFile,
    directoryDownload,
    addonehour
} = require('./control/control.js');

const {
    writeContentType
} = require('./utils/common');



// 文件不存在返回404
function handle404(res, fileDir) {
    if (!fs.existsSync(fileDir)) {
        res.writeHead(404, { 'content-type': 'text/html;charset=UTF-8' });
        res.end("404, no such file or directory");
        console.log("no such file or directory: ", fileDir);
        return true; // 处理成功
    }
    return false
}



var server = http.createServer(function (req, res) {

    let url = decodeURI(req.url);
    console.log("url: ", url);
    console.log("tmptk: ", tmptk);
    let method = req.method.toLowerCase();
    let parameter = '';
    let parameterPosition = url.indexOf('?');   //没有?号返回-1
    if(parameterPosition > -1){
        parameter = url.slice(parameterPosition) //保存?后的参数
        url = url.slice(0,parameterPosition)    //去掉url中的参数部分
    }


    if (url === '/data') {
		console.log('获取json数据成功');
        let paramsPathVal = parameter.slice('?path='.length)
        getAllFileInfo(req, res, paramsPathVal)
    }

    else if (url === '/login' && method === 'post') {
        console.log("loginlogin");
        loginlogin(req, res)
        //return;
    }


    else if (url === '/upload' && method === 'post') {
        console.log("upload");
        uploadFile(req, res)
        //return;
    }

    else if(url === '/getAllfiles' &&method === 'get'){
        console.log('进入getAllfiles');
        let paramsPathVal = parameter.slice('?path='.length)
        getAllFileInfo(req, res, paramsPathVal)
    }

    else if(/^\/directoryDownload/.test(url)){
        directoryDownload(req, res, url)
    }

        
    else if (/^\/deleteFile/.test(url) && method === 'get') {

        // 删除文件
        console.log('进入删除文件');
        deleteFile(req, res);
    }else if(url === '/addonehour' && method === 'get'){
        addonehour(req,res);
    }
    
    else{

        // 默认发送uploads目录下的文件
        let fileDir = path.join(uploadDir, url);
        console.log("fileDir: ", fileDir);

        if (!handle404(res, fileDir)) {
            //读取文件的状态
            fs.stat(fileDir, function (err, stats) {
                if (stats.isDirectory()) { // 如果是文件夹就更改path参数并重定向
                    let redirectPath = '/?path=' + encodeURI(url)
                    console.log('redirectPath', decodeURI(redirectPath));
                    res.writeHead(301, { 'Location': redirectPath });
                    res.end()
                } else {
                    // 否则就把文件发送过去
                    fs.createReadStream(fileDir).pipe(res)
                }
            })
        }

    }
})

server.listen(port,function(){
    console.log('访问 http://localhost:' + port);
});
