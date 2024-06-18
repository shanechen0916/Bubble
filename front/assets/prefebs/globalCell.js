/**
 * 全球榜成员单元
 */

import { tool } from 'tool';
let store = require('store');

cc.Class({
    extends: cc.Component,

    properties: {
        // 奖牌排名需要的图片
        crown: [cc.SpriteFrame],

        headIcon: cc.Sprite,
        rankTxt: cc.Label,
        rankIma: cc.Sprite,
        memberName: cc.Label,
        score: cc.Label,
    },

    onLoad () {

    },

    init (data, index) {
        this.rankIma.node.active = index < 3;
        if (index < 3) {
            this.rankIma.spriteFrame = this.crown[index];
        }
    },
});
