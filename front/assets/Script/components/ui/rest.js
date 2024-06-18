
/**
 * 主界面按钮的状态变化
 */

let store = require('store');
let userInfo = store.global;
// import { DialogManager } from 'DialogManager';
// import { AcrossTips } from 'AcrossTips';

cc.Class({
    extends: cc.Component,

    properties: {
        timeTxt: {
            default: null,
            type: cc.Label,
        },
    },

    onLoad () {
        this.gaming = cc.find('Canvas/gaming').getComponent('gaming');
    },

    onEnable () {
        this.timer = 10;
        this.schedule(this.updateTimeTxt, 1);
        this.updateTimeTxt();
    },

    onVideoAdBtn () {
        let self = this;

        // 看广告
        self.unschedule(self.updateTimeTxt);
    },

    updateTimeTxt () {
        if (this.timer >= 0) {
            this.timeTxt.string = '还有' + (Math.floor(this.timer)) + '秒';
            this.timer -= 1;
            if (this.timer < 0) {
                this.getAward();
            }
        }
    },

    getAward () {
        this.unschedule(this.updateTimeTxt);
        this.close();
        this.gaming.showBubbles(true);
        userInfo.bubbleCntForRest = 0;
        userInfo.dstBubbleCntForRest = 100;
    },

    // update (dt) {

    // },

    show () {
        this.node.active = true;
    },

    close () {
        this.node.active = false;
    }

});
