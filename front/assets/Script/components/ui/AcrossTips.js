
/**
 * 横条提示消息
 */

const AcrossTips = cc.Class({
    extends: cc.Component,

    statics: {
        getInstance() {
            return cc.find('Canvas/AcrossTips').getComponent('AcrossTips');
        }
    },

    properties: {
        tipsPrefab: cc.Prefab,
    },

    onLoad () {
        this.tipsList = [];
    },

    showTips (content) {
        let tips = this.tipsList.find(function (v) {
            return v.active === false;
        });

        if (tips === undefined) {
            tips = cc.instantiate(this.tipsPrefab);
            this.tipsList.push(tips);
            this.node.addChild(tips);
        }

        tips.opacity = 0;
        tips.x = 0;
        tips.y = cc.winSize.height * 0.5 - 240;
        tips.active = true;
        tips.runAction(cc.sequence(cc.spawn(cc.moveBy(0.3, cc.v2(0, 50)), cc.fadeTo(0.4, 255)).easing(cc.easeOut(2.0)), cc.delayTime(1), cc.callFunc(function () {
            tips.active = false;
        })));

        let text = tips.getChildByName('text');
        text.getComponent(cc.Label).string = content;
    },

});

export { AcrossTips };
