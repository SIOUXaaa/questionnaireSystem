function delSpan(str: string) {
    return str.replace(/<span .*?>(.*?)<\/span>/g, "$1");
}

export {delSpan as DelSpan}