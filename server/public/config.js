const path = require('path')

const systemPassword = 'minsup';

const port = 3007;

//process.cwd() 方法返回 Node.js 进程的当前工作目录。
const uploadDir = path.join(process.cwd(), 'uploads/')


module.exports = {
    port,
    systemPassword,
    uploadDir
}