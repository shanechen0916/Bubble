
/**
 * 工具类
 */

const tool = {};

// 获取当天23:59:59的时间戳(毫秒)
tool.getTodayEndTime = function () {
    let date = new Date();
    let timeStr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    let res = new Date(new Date(timeStr).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
    res = res === null ? 0 : res;
    return res;
};

/**
 * 计算字符串所占的内存字节数，默认使用UTF-8的编码方式计算，也可制定为UTF-16
 * UTF-8 是一种可变长度的 Unicode 编码格式，使用一至四个字节为每个字符编码
 * @return {Number}
 */
(function () {
    let reg = /[^\x00-\xff]/g;
    let replaceStr = 'ci';
    tool.sizeof = function (str) {
        return str.replace(reg, replaceStr).length;
    };
})();

/**
 * 取得指定字节长度的字符串
 *
 * str:字符串
 * len:截取长度
 *
 * return: 截取后的字符串
 */
(function () {
    let letterLen = 0;
    let charCode;
    let cutStr = '';
    let i = 0;
    let strLen = 0;
    tool.cutString = function (str, len) {
        letterLen = 0;
        cutStr = '';
        for (i = 0, strLen = str.length; i < strLen; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0x007f) {
                letterLen += 1;
            } else {
                letterLen += 2;
            }
            if (letterLen > len) {
                break;
            }
            cutStr += str.substr(i, 1);
        }
        return cutStr;
    };
})();

/**
 *
 * 指定字符串最大长度，超出最大长度自动截取并补...
 *
 * str:字符串
 * len:最大长度(宽字符长度，非字母长度)
 *
 * return: 修剪后的字符串
 */
tool.trimString = function (str = '', len) {
    if (this.sizeof(str) > len * 2) {
        return this.cutString(str, len * 2 - 1) + '...';
    }
    return str;
};

/**
 * 数字保留小数
 *
 * @param {any} num
 * @param {any} fix
 * @returns Number
 */
tool.toFixed = function (num, fix) {
    return parseFloat(num.toFixed(fix));
};

/**
 * 数字保留小数
 *
 * @param {any} num
 * @param {any} fix
 * @returns String
 */
tool.toFixedStr = function (num, fix) {
    return Number.parseFloat(num).toFixed(fix);
};

/**
 * 泡泡的显示
 */
tool.formatNum = function (num, fix = 3) {
    if (typeof num !== 'number' || Number.isNaN(num)) {
        cc.error(num + ' is not number!!!');
        return '';
    }

    if(num >= 100000) {
        return this.toFixed(num / 10000, fix) + '万';
    } else {
        return num;
    }
}

export { tool };