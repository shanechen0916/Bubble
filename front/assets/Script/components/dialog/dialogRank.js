
/**
 * 排行榜对话框
 */

import { tool } from 'tool';
import { DialogBase } from 'DialogBase';
import { DialogManager } from 'DialogManager';
let store = require('store');
let userInfo = store.global;

cc.Class({
    extends: DialogBase,
    properties: {
        rankCell: cc.Prefab,
        topCell: {
            default: null,
            type: cc.Node,
        },
        
        groupContent: {
            default: null,
            type: cc.Node,
        },

        groupsRank: {
            default: null,
            type: cc.Node,
        },

        globalRank: {
            default: null,
            type: cc.Node,
        },

        friendsRank: {
            default: null,
            type: cc.Node,
        },

        // 奖牌排名需要的图片
        crown: [cc.SpriteFrame],

        tabNode: cc.Node,
        tabBtns: [cc.Node],
        tabTexts: [cc.Node],

        closeBtn: {
            default: null,
            type: cc.Node,
        },

        allGroupNames: [cc.Label],
        allScores: [cc.Label],
        allRankNums: [cc.Label],
    },
    onLoad () {
        this.closeBtn.on('click', ()=>{
            this.hide();
        })

        for (let i = 0, len = this.tabBtns.length; i < len; i++) {
            if (this.tabBtns[i]) {
                this.tabBtns[i].on('click', function () {
                    this.onTabMenuSwitch(i);
                }, this);
            }
        }
        this.onTabMenuSwitch(0);
    },

    // 战队和好友tab
    onTabMenuSwitch: function (type) {
        if (this.curRankType === type) {
            return;
        }
        this.curRankType = type;
    
        for (let i = 0, len = this.tabTexts.length; i < len; i++) {
            let node = this.tabTexts[i];
            if (node) {
                node.color = i === type ? new cc.Color(31, 42, 173) : new cc.Color(255, 255, 255);
            }
        }

        this.tabNode.x = (type - 1) * 167;

        this.groupsRank.x = (type === 0 ? 0 : -9999);
        this.globalRank.x = type === 1 ?  0 : -9999;
        this.friendsRank.x = type === 2 ?  0 : -9999;
    }
});
