/** 
 * 模态框基础ui逻辑，支持显示和关闭
 */

cc.Class({
    extends: cc.Component,

    properties: {
        close: {
            default: null,        // The default value will be used only when the component attaching
            type: cc.Node, // optional, default is typeof default
        },
        title: {
            default: null,        // The default value will be used only when the component attaching
            type: cc.Label, // optional, default is typeof default
        },
        gaming: {
            default: null,
            type: cc.Node,
        },
        index: {
            default: null,
            type: cc.Node,
        },
    },
    
    show (title) {
        this.node.active = true;
        this.title.string = title ? title : '';
    },

    onClose () {
        this.node.active = false;
        this.node.emit('close');
    },
});
