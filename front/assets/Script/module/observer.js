/**
 * watch 监听对象，如果更新，回调，不支持数组push等触发。
 * watch({a: 1}, function(path, value) {});
 */
let watch = function (obj, cb, path) {
    if (!obj || typeof obj !== 'object') return;

    // 设置_observeProps不可枚举
    Object.defineProperty(obj, '_observeProps', {
        enumerable: false,
        value: {}
    });

    for (let key in obj) {
        let result = obj._observeProps[key] = obj[key];
        let type = typeof result;
        let _path = path ? path + '.' + key : key;
        Object.defineProperty(obj, key, {
            set: function (value) {
                let newType = typeof value;
                if (newType !== type) {
                    throw new Error('observer：不能更改监听数据的值类型 ' + type + ' -> ' + newType);
                }
                if (type === 'number') {
                    if (value <= Number.MAX_VALUE) {
                        this._observeProps[key] = value;
                    } else {
                        cc.error('>> Number溢出！key = ' + key);
                        this._observeProps[key] = Number.MAX_VALUE;
                    }
                } else {
                    this._observeProps[key] = value;
                }
                watch(value, cb, _path);
                cb(_path, value);
            },
            get: function () {
                return this._observeProps[key];
            }
        });
        if (type === 'object') {
            watch(result, cb, _path);
        }
    }
};

module.exports = {
    watch: watch,
};