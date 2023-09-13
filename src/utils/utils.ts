
function delSpan(str: string) {
    let s = str.replace(/<span .*?>(.*?)<\/span>/g, "$1");
    //去除s中的<br />标签
    s = s.replace(/<\/br>/g, "");
    return s;
}

//将字符串中的/”替换为'
function convert(str: string) {
    return str.replace(/\\"/g, "'");
}


function setStyle(str: string, style: string) {
    return '<span style="' + style + '">' + str + '</span>';
}

//根据当前时间戳生成5位用户ID
function generateID() {
    let date = new Date();
    let time = date.getTime();
    let id = time.toString().substring(5);
    return id;
}


export { delSpan, setStyle, convert, generateID }