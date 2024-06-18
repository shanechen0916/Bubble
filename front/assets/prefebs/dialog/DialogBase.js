/**
 * Dialog根节点基类
 */

import { OrderManager } from 'OrderManager';

var DialogBase = cc.Class({

    extends: cc.Component,

    properties: {
        autoMask: true,
        hideGaming: false,
        // 是否可以不考虑其他弹窗的逻辑，展示在最顶层，例如提示弹窗
        canShowInTop: false,
    },

    ctor() {
        // 自动mask相关，autoMask未true使用
        this.__autoMaskInited = false;
        this.__onHideCallList = [];
    },

    /**
     * 显示节点功能函数
     */
    show(...args) {

        if (!this.node) {
            return;
        }

        if (!this.node.active) {
            if (this.hideGaming) {
                OrderManager.hideGaming();
            }
            this.node.active = true;

            // 检查屏蔽层设置
            this._checkAddMask();

            this.onShow(...args);
        }
    },

    /**
     * 隐藏节点功能函数
     */
    hide() {

        if (this.node && this.node.active) {
            if (this.hideGaming) {
                OrderManager.showGaming();
            }
            this.node.active = false;
            this.onHide();
            this.__onHideCallList.forEach(cb => cb && cb());
        }
    },

    /**
     * 界面显示回调界面，子类可重写覆盖，但是不可直接调用，只有当前类可以调用
     */
    onShow() { },

    /**
     * 界面隐藏回调界面，子类可重写覆盖，但是不可直接调用，只有当前类可以调用
     */
    onHide() { },

    isShowing() {
        return this.node && this.node.active;
    },

    setOnHide(cb) {
        if (!this.canShowInTop) {
            this.__onHideCallList.push(cb);
        }
    },

    /**
     * 自动缩放：供子类使用
     * @param {Object} [opt]
     * @param {cc.Node} [opt.root] 弹出动画根节点
     * @param {Number} [opt.scale] 最终缩放比例
     * @param {() => {}} [opt.cb] 动画结束回调
     */
    showPopAction(opt = {}) {

        // const { root = this.node.getChildByName('root'), scale = 1, cb = () => { } } = opt;

        // if (!root) {
        //     return cb();
        // }

        // root.scale = 0.01;
        // root.runAction(cc.sequence(
        //     cc.scaleTo(0.3, scale * 1.1),
        //     cc.scaleTo(0.15, scale * 0.98),
        //     cc.scaleTo(0.15, scale),
        //     cc.callFunc(function () {
        //         cb();
        //     }, this)
        // ));
    },

    _checkAddMask() {

        if (!this.__autoMaskInited) {
            this.__autoMaskInited = true;

            if (this.autoMask) {
                this._addMaskLayer();
            }
        }
    },

    // pop节点增加下层mask遮罩层（包含触摸吞噬）
    _addMaskLayer() {
        cc.loader.loadRes('prefab/AutoMask', (err, prefab) => {
            if (prefab) {
                this.node.insertChild(cc.instantiate(prefab), 0);
            }
        });
    },
});

export { DialogBase };