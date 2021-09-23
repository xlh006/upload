const fs = require('fs');
const path = require('path');
const formidable = require('formidable')
const jwt = require('jsonwebtoken')
const uuid = require('node-uuid')

var zipper = require("zip-local");

const { 
    systemPassword,
    uploadDir,
    tmptk
} = require('../config/config');

const { listenerCount } = require('events');
const { Stream } = require('stream');


const {
    getIp,
    cookiesSplitArray,
    cookieSplitKeyValue,
    cookiesSplitArrar,
    mkdirSync
} = require('../utils/common.js')



const log = console.log;
const loginSuccessCookieArr = []; // 存在缺陷, 重启时loginSuccessCookieArr数据会丢失, 可以用Redis持久化保存


//在后端数组中删除掉对应的cookie
function deleteLoginSuccessCookieArrItem(item) {
    //如果未找到该值，则返回 -1。
    let cookieIndex = loginSuccessCookieArr.indexOf(item)
    if(cookieIndex > -1){
        console.log("删除COOKIE:",item);
        
        //splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
        //var removed = myFish.splice(2, 0, "drum");
        //从索引 2 的位置开始删除 0 个元素，插入“drum”
        loginSuccessCookieArr.splice(cookieIndex,1)
        //这里返回的是布尔类型，需要仔细琢磨，在setTime方法中未指定function的返回类型
        return true;
    }
    return false;
}

let nowtime = [];
function loginlogin(req,res){

    admin = "upload"
    let password = ''
    req.on('data', function(verify_data) {
        password += verify_data;
        console.log('password',password)
    })

    req.on('end',function(){

        if(password === admin){
            const token = jwt.sign({ password: password }, 'jwtKey', {
                expiresIn: 10
            });
            const tmptime = new Date();
            nowtime.push(tmptime.getTime() + 10800000);
            res.end(JSON.stringify({code:0,msg:'验证成功',token:token,endtime:nowtime[0]}));
        }else{

            res.end(JSON.stringify({code:1,msg:'验证失败'}))
        }

    })

}

function addonehour(req,res){
    nowtime[0] += 3600000;
    res.end(JSON.stringify({endtime:nowtime[0]})) 
}

//验证账号和密码，验证成功设置cookie，验证结果写入到login_record.log日志文件里
function identityVerify(req,res){

    let clientIp = getIp(req);

    let verify_str = ''
    req.on('data', function(verify_data) {
        verify_str += verify_data;
    })
    req.on('end',function(){
        let verify_obj = {};
        try{
            verify_obj = JSON.parse(verify_str)
        }catch(e){
            console.log(e);
        }
        log("verify_obj",verify_obj)

        res.writeHead(200,{
            'Content-Type':'text/plain;charset=UTF-8'
        })

        //保存登录信息日志
        // let loginInfo = {
        //     Time:formatDateTime(),
        //     IP:clientIp,
        //     User:verify_obj.password
        // }

        if(verify_obj.password === systemPassword){
            
            let randomKey = String(Math.random()).slice(2);
            let randomValue = String(Math.random()).slice(2,12) + String(Date.now());


            //把生成的随机数key和value设置到cookie，过期时间2小时
            let twoHour = 1000 * 60 * 60 * 2;
            res.writeHead(200,{
                'Set-Cookie': randomKey + '=' + randomValue + ";path=/;expires=" + new Date(Date.now() + twoHour).toGMTString(), 
            });
            //时间一到,后端删除cookie
            setTimeout(function (){
                deleteLoginSuccessCookieArrItem(randomKey + '=' + randomValue)
            },twoHour);


            //登录成功就把生成的随机key和value存在loginSuccessCookieArr中
            loginSuccessCookieArr.push(randomKey+'='+randomValue);
            //JSON.stringify() 方法将一个 JavaScript 对象或值转换为 JSON 字符串
            res.end(JSON.stringify({code:0,msg:'验证成功'}));
        }else{
            //验证失败
            // loginInfo.Result = "验证失败"
            // loginInfo.password = verify_obj.password

            res.end(JSON.stringify({code:1,msg:'验证失败'}))
        }
        //写入json文件
        //pushJsonData(login_record_path,loginInfo)



    })



}

//cookie验证
// 如果cookie中有一对键值存在于loginSuccessCookieArr中, 就认为验证成功
function cookieVerify(req){
    const cookies = req.headers.cookie;
    const cookieArray = cookiesSplitArray(cookies);
    
    // 新增的cookie一般在最后, 因此数组从后往前遍历
    for(let index = cookieArray.length;index >= 0;index--){
        const item = cookieArray[index];
        const {cookie_key,cookie_value} = cookieSplitKeyValue(item);
        
        if(loginSuccessCookieArr.includes(cookie_key + "=" + cookie_value)){
            return true;
        }
    }

    return false;
}


//退出登陆，即为在后端数组中删除掉对应的cookie
function logout(req,res){
    const cookies = req.headers.cookie;
    const cookieArray = cookiesSplitArray(cookies)
    // 新增的cookie一般在最后, 因此数组从后往前遍历
    for(let index = cookieArray.length;index >= 0;index--){
        const item = cookieArray[index];
        const {cookie_key,cookie_value} = cookieSplitKeyValue(item);
        
        let deleteRes = deleteLoginSuccessCookieArrItem(cookie_key + '=' + cookie_value)
        if(deleteRes){
            // 删除成功把cookie_key返回让前端也删除该cookie
            res.end(cookie_key)
        }
    }
}

    function fileSizeFormat(fileSize) {
        if (fileSize < 1024) {
            return fileSize.toFixed(2) + "B";
        } else if (fileSize < 1024 * 1024) {
            return (fileSize / 1024).toFixed(2) + "KB";
        } else if (fileSize < 1024 * 1024 * 1024) {
            return (fileSize / 1024 / 1024).toFixed(2) + "MB";
        } else {
            return (fileSize / 1024 / 1024 / 1024).toFixed(2) + "GB";
        }
    }

    // 修改时间显示的格式
    function modifyTimeFormat(mtimeMs) {
        return new Date(mtimeMs);
    }



// 读取固定目录下的文件信息并返回
function getAllFileInfo(req,res,directory){
    //path.join() 方法使用特定于平台的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。
    let fileDir = path.join(uploadDir,directory + '/');
    //console.log('读取文件下的文件信息：',fileDir);
    //读取目录的内容。 回调有两个参数 (err, files)，其中 files 是目录中文件名的数组，不包括 '.' 和 '..'。
    fs.readdir(fileDir,function(err,data){
        console.log("读取文件信息需要返回的目录（数组）：", data)
        if(!Array.isArray(data)){
            res.end('路径不存在');
            return
        }
        let resultArray = [];
        for(let d of data){
            //console.log("for循环遍历data", d);
            //fs.statSync()方法用于异步返回有关给定文件路径的信息。返回的fs.Stat对象具有多个字段和方法，以获取有关文件的更多详细信息。
            let statSyncRes = fs.statSync(fileDir + d);
            //console.log("statSyncRes", statSyncRes)
            resultArray.push({
                id:uuid.v4(),
                src:d,  //名称
                size:fileSizeFormat(statSyncRes.size),          //大小
                date:modifyTimeFormat(statSyncRes.mtimeMs),    //最近一次修改时间
                isDirectory:statSyncRes.isDirectory(),   //是否为文件夹
                check:true
            })
        }
        console.log("读取文件信息所获resultArray数组：", resultArray);

        res.end(JSON.stringify(resultArray))
    })
}


// 上传文件, 文件/多文件/文件夹都用这同一个方法上传(如果需要把文件上传到指定文件夹下,在上传的时候需要多传递一个文件路径的字段信息,然后后端使用uploadDir拼接这个字段就可以得到完整的保存路径,接下来保存就行了)
function uploadFile(req, res) {
    console.log("上传文件");
    res.writeHead(200, { 'content-type': 'text/plain;charset=UTF-8' });

    let form = new formidable.IncomingForm();
    form.uploadDir = uploadDir; // 保存上传文件的目录
    form.multiples = true; // 设置为多文件上传
    form.keepExtensions = true; // 保持原有扩展名
    form.maxFileSize = 10 * 1024 * 1024 * 1024; // 限制上传文件最大为10GB
    form.maxFields = 10; // 限制字段的数量
    form.maxFieldsSize = 100; // 限制字段大小, 单位bytes


    form.on('end', (err) => {
        res.end("文件全部上传成功!")
    });
    //其中当服务端全部接收完客户端用post方式提交的表单数据之后，触发执行该回调函数。以post方式提交的表单域数据都放在fields这个对象当中，以post方式上传的文件、图片等文件域数据都放在files这个对象当中。
    //通过formidable进行图片的上传
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log("接收文件出错: ", JSON.stringify(err.message));
            res.writeHead(400, { 'content-type': 'text/html;charset=UTF-8' });
            res.end("文件大小过大或者文件总数过多, 无法上传;\n错误信息:" + JSON.stringify(err.message));
            return;
        }

        console.log('fields:\n', fields);
        console.log('files:\n', files);
        for (let key in files) {
            console.log('key:',key)
            rename(files[key])
        }

        // 文件会被formidable自动保存, 而且文件名随机, 因此保存后建议重命名
        function rename(fileItem) {
            // 单文件上传时fileItem为对象, 多文件上传时fileItem为数组,
            // 单文件上传时也将fileItem变成数组统一当做多文件上传处理;
            let fileArr = fileItem;
            if (Object.prototype.toString.call(fileItem) === '[object Object]') {
                fileArr = [fileItem];
            }

            for (let file of fileArr) {

                let fileName = file.name; // 上传文件夹时文件名可能包含上传的文件夹路径
                console.log("上传文件名: ", fileName);

                let suffix = path.extname(fileName); // 文件后缀名
                console.log("文件后缀名: ", suffix);
                let oldPath = file.path; // formidable自动保存后的文件路径
                let newPath = path.join(uploadDir, fileName);

                log('oldPath', oldPath)
                log('newPath', newPath)

                // 防止路径不存在
                mkdirSync(newPath);

                // 如果不允许覆盖同名文件
                // if (fields.isAllowCoverageFile !== 'true') {
                //     // 并且文件已经存在，那么在文件后面加上时间和随机数再加文件后缀
                //     if (fs.existsSync(newPath)) {
                //         newPath = newPath + '-' + formatDateTime2() + '-' + Math.trunc(Math.random() * 1000) + suffix;
                //     }
                // }

                fs.rename(oldPath, newPath, function (err) {
                    if (err) {
                        log(err)
                    }
                })
            }

        }

    });
}

// 根据文件夹，删除文件
function deleteFile(req,res){
    let url = decodeURI(req.url);
    let fileName = url.slice(url.indexOf('?') + 1);
    console.log("删除文件：",fileName);
    var rootPath = uploadDir + fileName;
    //fs.statSync()方法用于异步返回有关给定文件路径的信息。
    //console.log("fs.statSync(rootPath)：",fs.statSync(rootPath));
    if(fs.statSync(rootPath).isDirectory()){
        deleteAllFile(rootPath);//递归删除文件
    }else{
        fs.unlinkSync(rootPath);//删除文件
    }
    //如果服务端没有数据传回客户端就可以直接用red.end返回
    res.end();
}


// 递归删除文件夹
function deleteAllFile(path) {
    var files = [];
    if (fs.existsSync(path)) {
        //方法将返回一个包含“指定目录下所有文件名称”的数组对象。
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteAllFile(curPath); // 递归删除目录
            } else {
                // 删除文件
                fs.unlinkSync(curPath);
            }
        });
        //fs.rmdirSync()方法用於同步刪除給定路徑下的目錄
        fs.rmdirSync(path);
    }
}



//文件下载
function directoryDownload(req,res,url){
    //要下载的文件路径
    let dirPath = path.join(uploadDir,url.slice('/directoryDownload'.length));
    //生成的临时压缩包路径
    //process.cwd()返回当前工作目录。
    let tempDir = path.join(process.cwd(), 'tmp', 'zip', './uploads' + url.slice('/directoryDownload'.length) + '.zip')
 

    console.log("dirPath: ", dirPath);
    console.log("tempDir: ", tempDir);

    mkdirSync(tempDir, function () {
        console.log("进入文件夹压缩成压缩包: ");
        // 把文件夹压缩成压缩包
        zipper.sync.zip(dirPath).compress().save(tempDir);
        let createReadStream = fs.createReadStream(tempDir);
        createReadStream.pipe(res);
        //'end' 事件只有在数据被完全消费掉后才会触发。
        createReadStream.on('end', () => {
            console.log("传输完成");
            // 传输完成后删除临时压缩包文件(压缩包所在的文件夹没有删除, 如果要删除可以使用本文件中的deleteAllFile()方法)
            fs.unlink(tempDir, (err) => {
                if (err) {
                    console.log(err);
                    res.end('delete fail: ' + JSON.stringify(err));
                }
                console.log("删除文件", tempDir);
            });
        })
        console.log("end: ");
    })
}




module.exports = {
    loginlogin,
    identityVerify,
    cookieVerify,
    logout,
    getAllFileInfo,
    uploadFile,
    deleteFile,
    directoryDownload,
    addonehour
}