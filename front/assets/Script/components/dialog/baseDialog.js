/**
 * 全屏弹框的基类，支持显示和关闭回调
 */
let modalNode;
let modal;
cc.Class({
    extends: cc.Component,

    // properties: {

    // },

    // LIFE-CYCLE CALLBACKS:

    show (title) {
        if (!modalNode || !modal) {
            modalNode = cc.find('Canvas/modal');
            modal = modalNode.getComponent('modal');
        }
        modalNode.on('close', this.close, this);
        modal.show(title);
    },

    // start () {

    // },

    // update (dt) {},
});
