'use strict';

var serializeParam = function serializeParam (param) {
    if (!param) return '';
    var s = [];
    for (var key in param) {
        s.push(encodeURIComponent(key) + '=' + encodeURIComponent(param[key]));
    }
    return s.join('&');
};

var ajax = function ajax (option) {
    var o = option;
    var m = o.type.toLocaleUpperCase();
    var isPost = 'POST' === m;
    var isComplete = false;
    var timeout = o.timeout || 8000;
    var withCredentials = o.withCredentials;
    var xhr = new XMLHttpRequest();
    var qstr = serializeParam(o.data);
    var url = o.url;
    !isPost && (url += (url.indexOf('?') > -1 ? '&' : '?') + qstr);

    xhr.open(m, url, true);
    var headers = option.headers;
    if (headers) {
        for (var key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }
    if (withCredentials) xhr.withCredentials = true;
    if (o.dataType) xhr.dataType = o.dataType;

    isPost && xhr.setRequestHeader('Content-Type', 'application/json');
    var timer = 0;

    xhr.onreadystatechange = function () {
        if (4 == xhr.readyState) {
            var status = xhr.status;
            if (status >= 200 && status < 300 || status == 304) {
                var response = xhr.responseText;
                var json = null;
                try {
                    json = JSON.parse(response);
                } catch (e) {
                    throw e;
                }
                o.success && o.success(json, xhr);
            } else {
                o.error && o.error(xhr, xhr.status ? 'error' : 'abort', o.url);
            }
            isComplete = true;
            if (timer) {
                clearTimeout(timer);
            }
        }
    };

    xhr.send(isPost ? qstr : null);

    if (timeout) {
        timer = setTimeout(function () {
            if (!isComplete) {
                xhr.onreadystatechange = function () {};
                xhr.abort();
                o.error && o.error(xhr, 'timeout', o.url);
            }
        }, timeout);
    }

    return xhr;
};

function get (url, data, option) {
    return new Promise(function (resolve, reject) {
        return ajax({
            ...option,
            type: 'GET',
            url: url,
            data: data,
            success: resolve,
            error: reject
        });
    });
}

function post (url, data, option) {
    return new Promise(function (resolve, reject) {
        return ajax({
            ...option,
            type: 'POST',
            url: url,
            data: data,
            success: resolve,
            error: reject
        });
    });
}

module.exports = { get, post };