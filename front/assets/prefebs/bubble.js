

let store = require('store');
let userInfo = store.global;
let explodes = require('explodes');
let evt = new cc.Event.EventCustom('peng', true);
let touchTime = Date.now();
cc.Class({
    extends: cc.Component,

    properties: {
        explodes: {
            default: null,
            type: explodes
        },

        gift: {
            default: null,
            type: cc.Node,
        },
        giftSpriteFrames: [cc.SpriteFrame],
        
        bubbleSpr: cc.Node,
        bubbleSpriteFrames: [cc.SpriteFrame],
    },

    onLoad () {
        this.isColor = false;
        let bd = this.node.getComponent(cc.RigidBody);
        let bdCollider = this.node.getComponent(cc.PhysicsCircleCollider);
        let radius = bdCollider.radius = 60 + Math.random() * 60;
        let originalWidth = this.node.width;
        this.curScale = radius * 2 / originalWidth;
        this.node.width = this.node.height = radius * 2;
        this.bubbleSpr.width = this.bubbleSpr.height = this.node.width;
        bd.linearVelocity = cc.v2(-50 + 100 * Math.random(), -50 + 100 * Math.random());
        // this.bd.gravityScale = 3;
        this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
            // 限制多点触碰
            if (Date.now() - touchTime > 100) {
                touchTime = Date.now();
                this.onPeng({x: this.node.x, y: this.node.y});
                this.node.dispatchEvent(evt);
            }
        }, this);

        this.showStatus();
    },

    showStatus () {
        if (userInfo.colorBubbleCntArr_id.length > 0) {
            let bubbleID = userInfo.colorBubbleCntArr_id[0];
            userInfo.colorBubbleCntArr_cnt[0]--;
            if(userInfo.colorBubbleCntArr_cnt[0] <= 0) {
                userInfo.colorBubbleCntArr_id.splice(0, 1);
                userInfo.colorBubbleCntArr_cnt.splice(0, 1);
            }

            // 是否为彩色泡泡
            if(bubbleID >= 3 && bubbleID <= 5) {
                this.isColor = true;
            }
            if (bubbleID < 1 || bubbleID > this.bubbleSpriteFrames.length) {
                bubbleID = this.bubbleSpriteFrames.length;
            }
            if (bubbleID === 2) {
                this.bubbleSpr.opacity = 30.6;
            }
            this.bubbleSpr.getComponent(cc.Sprite).spriteFrame = this.bubbleSpriteFrames[bubbleID - 1];
        }
    },

    onPeng (pos) {
        if (this.isColor) {
            userInfo.colorBubbleScore++;
        }

        this.explodes.emit(pos, this.curScale);
        
        if (this.gift.active) {
            this.explodes.emitAd(pos, this.curScale);
        } else {
            if (this.isColor) {
                this.explodes.emitColor(pos, this.curScale);
            } else {
                this.explodes.emit(pos, this.curScale);
            }
        }
        this.node.destroy();
    },

    // 每次处理完碰撞体接触逻辑时被调用
    onBeginContact: function (contact, selfCollider, otherCollider) {
        
    },

    update (dt) {
        
    },
});
