const fs = require('fs');
const path = require('path')





//获取客户端IP
function getIp(req){
    let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress || '';
    return ip;
}

//把cookie拆分成数组
function cookiesSplitArray(cookies){
    let cookieArray = [];
    if(cookies){
        cookieArray = cookies.split(';')
    }
    return cookieArray;
}


//把cookies键值拆分
function cookieSplitKeyValue(cookie){
    if(!cookie){
        return {};
    }
    //去除字符串的头尾空格:
    let KeyValue = cookie.trim().split('=');

    const cookie_key = KeyValue[0];
    const cookie_value = KeyValue[1];

    return {cookie_key,cookie_value}

}



/**
 * 同步递归创建路径
 * fs.mkdirSync(fileDir)要求路径的父级存在才能创建, 否则报错.
 * 注: NodeJS 10以后的版本，fs.mkdir已经增加递归选项:
 * fs.mkdir('/home/test1/test2', { recursive: true }, (err) => {})
 *
 * @param  {string} dir   处理的文件路径(不是文件夹路径)
 * @param  {function} cb  回调函数
 */
 function mkdirSync(dir, cb) {
    let pathinfo = path.parse(dir);
    console.log("pathinfo: ", pathinfo);
    if (!fs.existsSync(pathinfo.dir)) {
        mkdirSync(pathinfo.dir, function () {
            console.log('创建文件夹: ' + pathinfo.dir);
            fs.mkdirSync(pathinfo.dir)
        })
    }
    cb && cb();
}










// 根据文件后缀返回对应的文件类型
// suffix可以为文件路径|文件后缀|带点号的文件后缀, 例如./html/index.html | .html  | html
function writeContentType(res, suffix, code = 200) {
    suffix = path.extname(suffix) ? path.extname(suffix) : suffix   //获取扩展名    .html
    suffix = suffix.slice(suffix.indexOf('.' + 1))  //如果有点号，去掉点号      html
    suffix = suffix.toLocaleLowerCase() //全部小写      html
    


    let ContentType = "";
    switch(suffix){
        case 'txt':
        case 'md':
        case 'log':
            ContentType = 'text/plain;charset=UTF-8';
            break;
        case 'htm':
        case 'html':
            ContentType = 'text/html;charset=UTF-8';
            break;
        case 'css':
            ContentType = 'text/css;charset=UTF-8';
            break;
        case 'js':
            ContentType = "application/javascript;charset=UTF-8";
            break;
        case 'json':
            ContentType = "application/json;charset=UTF-8";
            break;
        case 'mp4':
            ContentType = "video/mp4";
            break;
        case 'jpg':
        case 'jpeg':
            ContentType = "image/jpeg";
            break;
        case 'png':
            ContentType = "image/png";
            break;
        case 'gif':
            ContentType = "image/gif";
            break;
        default:
            ContentType = "";
    }
    if(ContentType){
        res.writeHead(code,{
            "Content-Type": ContentType
        })
    }
}





module.exports = {
    writeContentType,
    getIp,
    cookiesSplitArray,
    cookieSplitKeyValue,
    mkdirSync
};