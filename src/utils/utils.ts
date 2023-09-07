function delSpan(str: string) {
    return str.replace(/<span .*?>(.*?)<\/span>/g, "$1");
}

function setStyle(str: string, style: string) {
    return '<span style="' + style + '">' + str + '</span>';
}

export { delSpan, setStyle }