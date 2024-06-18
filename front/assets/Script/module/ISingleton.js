/**
 * 单例接口
 */

const _constructor = new WeakMap();
const _instance = new WeakMap();

class ISingleton {

    static getInstance () {
        if (!_instance.get(this)) {
            _constructor.set(this, true), _instance.set(this, new this()), _constructor.set(this, false);
        }
        return _instance.get(this);
    }

    constructor () {
        if (new.target === ISingleton) {
            throw new Error('Cannot instantiate the type ISingleton!');
        }
        if (!_constructor.get(this.constructor)) {
            throw new Error('Cannot instantiate the type ' + this.constructor.name + '! Please use ${this.constructor.name}.getInstance().');
        }
    }
}

export { ISingleton };