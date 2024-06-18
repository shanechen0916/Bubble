
/**
 * 泡泡工厂，每次返回最新的泡泡实例，
 */

cc.Class({
    extends: cc.Component,

    properties: {
        bubble: {
            default: null,
            type: cc.Node,
        },
        adBubble: {
            default: null,
            type: cc.Node,
        },
    },

    /**
     * 根据队列生成
     */
    getBlock () {
        let bubbleNode = cc.instantiate(this.bubble);
        return bubbleNode;
    }

    // update (dt) {},
});
