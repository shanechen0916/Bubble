
let store = require('store');
let userInfo = store.global;
let bubbles = require('bubbles');

cc.Class({
    extends: cc.Component,
    properties: {
        score: {
            default: null,
            type: cc.Label
        },
        bubbles: {
            default: null,
            type: bubbles
        },

        scoreNode: {
            default: null,
            type: cc.Node,
        },

        fadeRankNode: {
            default: null,
            type: cc.Node,
        },

        topName: {
            default: null,
            type: cc.Label,
        },

    },
    onLoad () {
        userInfo.bubbleCntForRest = 0;

        cc.director.getPhysicsManager().enabled = true;

        this.node.on('peng', this.onPeng, this);
        store.ready().finally(() => {
            this.score.string = store.global.score;
            this.topName.string = (userInfo.nickname || '').slice(0, 3);
        });
        this.showBubbles(false);
        this.rest = cc.find('Canvas/rest').getComponent('rest');
    },

    onEnable(){
    },

    onPeng (e) {
        store.global.score++;
        store.global.totalScore++;
        this.score.string = store.global.score;
        store.save();
        if(userInfo.bubbleCntForRest < userInfo.dstBubbleCntForRest - 12){
            userInfo.bubbleCntForAward++;
            this.showBubble(true);
        }
        userInfo.bubbleCntForRest++;
        if(userInfo.bubbleCntForRest >= userInfo.dstBubbleCntForRest){
            // 展示休息界面
            setTimeout(() => {
                this.rest.show();
            }, 2000);
        }
    },

    showBubbles(withAct){
        for (let i = 0; i < 12; i++) {
            this.showBubble(withAct);
        }
    },

    showBubble (withAct) {
        let bubble = this.bubbles.getBlock();
        bubble.x = this.node.width * Math.random();
        // 以分数和排行榜为边界随机生产泡泡，+-60是为了确保泡泡不出去
        let maxY = this.scoreNode.parent.convertToWorldSpaceAR(cc.v2(this.scoreNode.x, this.scoreNode.y)).y;
        let minY = this.fadeRankNode.parent.convertToNodeSpaceAR(cc.v2(this.fadeRankNode.x, this.fadeRankNode.y)).y;
        bubble.y = (maxY - minY) * Math.random() + minY;
        if(withAct){
            bubble.scaleX = bubble.scaleY = 0.01;
            let act = cc.sequence(
                cc.scaleTo(0.4, 1.1, 1.1),
                cc.scaleTo(0.2, 1, 1),
                cc.scaleTo(0.05, 1.01, 1.01),
                cc.scaleTo(0.05, 1, 1),
                );
            bubble.runAction(act);
        }
        this.node.addChild(bubble);
    }
});
