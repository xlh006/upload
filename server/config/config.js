const path = require('path')

const systemPassword = 'upup';

const port = 5000;

var tmptk = 0;
//process.cwd() 方法返回 Node.js 进程的当前工作目录。
const uploadDir = path.join(process.cwd(), 'uploads/')

users={
    axhaor:[
        {
            src:"AccInfo.dat",
            size:'1333',
            mtimeMs:1629998141401.4275,
            isDirectory:false},
        {
            src:"AccInfo.dat",
            size:'1333',
            mtimeMs:1629998141401.4275,
            isDirectory:false},
        {
            src:"AccInfo.dat",
            size:'1333',
            mtimeMs:1629998141401.4275,
            isDirectory:false}
    ],
    upup:[
        {
            src:"asd.dat",
            size:'1333',
            mtimeMs:1629998141401.4275,
            isDirectory:false},
        {
            src:"asd.dat",
            size:'1333',
            mtimeMs:1629998141401.4275,
            isDirectory:false},    
        {
            src:"asd.dat",
            size:'1333',
            mtimeMs:1629998141401.4275,
            isDirectory:false},
            
    ],
    haohao:[{
        'src':"qwe.dat",
        size:'1333',
        mtimeMs:1629998141401.4275,
        isDirectory:false}],
}

module.exports = {
    port,
    systemPassword,
    uploadDir,
    tmptk
}