//格式化时间

function formatDate(inputTime = new Date()){
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDay();
    m = m < 10 ? ('0' + m) : m;
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};