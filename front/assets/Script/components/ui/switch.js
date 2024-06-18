
/**
 * 开关ui逻辑
 */
cc.Class({
    extends: cc.Component,

    properties: {
        btn: {
            default: null,
            type: cc.Node
        },
        onNode: {
            default: null,
            type: cc.Node
        },
        offNode: {
            default: null,
            type: cc.Node
        },
    },
    // #
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('click', function () {
            this.isOn = this.isOn ? false : true;
            if (this.isOn) {
                this.on();
                this.node.emit('switch', {
                    isOn: this.isOn
                });
            } else {
                this.off();
                this.node.emit('switch', {
                    isOn: this.isOn
                });
            }
        }, this);
    },

    on () {
        this.isOn = true;
        this.onNode.active = true;
        this.offNode.active = false;
        this.btn.runAction(cc.moveTo(0.1, 18, -1));
    },

    setOn () {
        this.isOn = true;
        this.onNode.active = true;
        this.offNode.active = false;
        this.btn.x = 18;
        this.btn.y = -1;
    },

    off () {
        this.isOn = false;
        this.onNode.active = false;
        this.offNode.active = true;
        this.btn.runAction(cc.moveTo(0.1, -18, -1));
    },

    start () {

    },

    // update (dt) {},
});
