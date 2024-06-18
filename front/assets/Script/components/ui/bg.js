
/**
 * 背景动态效果
 * 1.背景一直旋转，实现类网易云sati空间的动态效果
 * 2.randomColor 接口调用，背景可以产生随机的颜色渐变
 * 3.randomBgPos 接口调用，背景可以偏移到一个旋转不出现黑底的安全位置（充分利用美术图片的每一块区域）
 */

let store = require('store');
let userInfo = store.global;

const defaultBgID = 10;

cc.Class({
    extends: cc.Component,

    properties: {
        bg1: cc.Node,
        bg2: cc.Node,

        bg3: cc.Node,
        bg3_1: cc.Node,
        bg3_2: cc.Node,

        starLayer: cc.Node,

        bg3SpriteFrame: [cc.SpriteFrame],
    },

    onLoad () {
        // 一直旋转背景
        this.rotationVal = 0;
        this.timer = 0;

        this.isChanging = false;

        let designSize = cc.view.getDesignResolutionSize();
        let frameSize = cc.view.getFrameSize();
        if(frameSize.height / frameSize.width > designSize.height / designSize.width) {
            this.starLayer.height = this.starLayer.height / designSize.height * (frameSize.height / frameSize.width * designSize.width);;
        }
    },

    // 旋转背景
    rotateBg () {
        this.bg1.angle = this.rotationVal;
        this.bg2.angle = this.rotationVal;
        this.rotationVal++;
        this.rotationVal %= 360;
    },

    update (dt) {
        if (this.timer > 0.2) {
            this.timer = 0;
            this.rotateBg();
            return;
        }
        this.timer += dt;
    },

});
