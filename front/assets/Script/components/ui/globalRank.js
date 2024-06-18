/**
 * 全球排行榜
 */

import { tool } from 'tool';
let store = require('store');
let userInfo = store.global;

cc.Class({
    extends: cc.Component,

    properties: {
        globalCell: cc.Prefab,
        globalContent: cc.Node,
        globalView: cc.Node,

        // 奖牌排名需要的图片
        crown: [cc.SpriteFrame],
        myGlobalRankIma: cc.Sprite,
        myGlobalRank: cc.Label,
        myNickName: cc.Label,
        myGlobalScore: cc.Label,
        headIcon: cc.Sprite,

        bottomTips: cc.Node,
        allNickName: [cc.Label],
        allScores: [cc.Label],
        allRankNums: [cc.Label],
    },

    onLoad () {
        this.globalCellList = [];
    },

    init (opt) {
        this.node.x = -9999;
    },

    showInfo (globalInfo) {
        this.node.x = 0;
        this.myGlobalScore.string = '0';
        this.myGlobalRank.string = '未上榜';
        this.myGlobalRankIma.node.active = false;
        this.myNickName.string = tool.trimString(userInfo.nickName, 8);

        this.globalCellList.map(v => v.x = -9999);
        let len = globalInfo.globalUsers.length;
        if (len === 0) {
            // 没有战队排行
            return;
        }

        let rankNum = -1;
        let height = 0;

        let allGroupNameStr = ['', '', ''];
        let allScoreStr = ['', '', ''];
        let allRankNumStr = ['', '', ''];

        // 第一名之后的展示
        for (let i = 0; i < len && i < 50; i++) {
            let item = null;
            if (this.globalCellList[i] === undefined) {
                item = cc.instantiate(this.globalCell);
                this.globalCellList.push(item);
                item.parent = this.globalContent;
                item.x = 0;
                item.y = - (i + 1 / 2) * item.height;
                if (i === 0) {
                    let line = item.getChildByName('line');
                    if (line) {
                        line.active = false;
                    }
                }
            } else {
                item = this.globalCellList[i];
            }

            item.x = 0;
            height += item.height;
            let globalCell = item.getComponent('globalCell');
            let self = this;
            globalCell.init(globalInfo.globalUsers[i], i);
            if (globalInfo.user.length > 0){
                if (globalInfo.globalUsers[i]._id === globalInfo.user[0]._id) rankNum = i + 1;
            }
            let spaceStr = '\n'+ '\n'+ '\n' + '\n';
            if (i === 15 || i === 31 || i === 49) {
                spaceStr = '\n'+ '\n'+ '\n';
            }
            let groupNameStr = tool.trimString(globalInfo.globalUsers[i].nickName, 8) + spaceStr;
            let scoreStr = tool.formatNum(0) + spaceStr;
            let rankNumStr = (i + 1) + spaceStr;
            let index = 0;
            if(i < 16){
                index = 0;
            }else if(i >= 16 && i < 32){
                index = 1;
            }else{
                index = 2;
            }
            allGroupNameStr[index] += groupNameStr;
            allScoreStr[index] += scoreStr;
            allRankNumStr[index] += rankNumStr;
        }

        for(let i = 0; i <= 2; i++){
            this.allNickName[i].string = allGroupNameStr[i];
            this.allScores[i].string = allScoreStr[i];
            this.allRankNums[i].string = allRankNumStr[i];
        }

        // 滑动内容的高度
        this.globalContent.height = height;

        // 自己信息名次的展示
        this.myGlobalRankIma.node.active = (rankNum >= 1 && rankNum <= 3);
        this.myGlobalRank.node.active = !this.myGlobalRankIma.node.active;
        if (rankNum === -1) {
            this.myGlobalRank.string = '未上榜';
            this.myGlobalRank.fontSize = 44;
            this.myGlobalRank.lineHeight = 50;
            this.myGlobalRank.node.x = -238;
        } else if (rankNum >= 1 && rankNum <= 3) {
            this.myGlobalRankIma.spriteFrame = this.crown[rankNum - 1];
        } else {
            this.myGlobalRank.string = rankNum;
            this.myGlobalRank.fontSize = 62;
            this.myGlobalRank.lineHeight = 70;
            this.myGlobalRank.node.x = -231;
        }
    }
});
