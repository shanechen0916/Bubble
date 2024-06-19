/**
 * 战队排行榜 第一名战队的信息展示
 */

import { tool } from 'tool';

cc.Class({
    extends: cc.Component,

    properties: {
        topGroupHead: cc.Prefab,
        groupMembers: cc.Node,

        groupName: cc.Label,
        groupScore: cc.Label,
        topHead: cc.Sprite,
        topName: cc.Label,
        topScore: cc.Label,
    },

    onLoad () {
        // 组员的头像列表， 避免头像的频繁创建和销毁，用headList来存储已经生成的头像
        this.headList = [];
        // item的一半宽度
        let h = 34 / 2;

        // 仿微信群头像排列
        this.headPos = {
            1: [{x: 0, y: 0}],
            2: [{x: -h, y: 0}, {x: h, y: 0}],
            3: [{x: 0, y: h}, 
                 {x: -h, y: -h}, {x: h, y: -h}],
            4: [{x: -h, y: h}, {x: h, y: h}, 
                 {x: -h, y: -h}, {x: h, y: -h}],
            5: [{x: -h, y: h}, {x: h, y: h},
                 {x: -2 * h, y: -h}, {x: 0, y: -h}, {x: 2 * h, y: -h}],
            6: [{x: -2 * h, y: h}, {x: 0, y: h}, {x: 2 * h, y: h},
                 {x: -2 * h, y: -h}, {x: 0, y: -h}, {x: 2 * h, y: -h}],
            7: [{x: 0, y: 2 * h},
                 {x: -2 * h, y: 0}, {x: 0, y: 0}, {x: 2 * h, y: 0},
                 {x: -2 * h, y: -2 * h}, {x: 0, y: -2 * h}, {x: 2 * h, y: -2 * h}],
            8: [{x: -h, y: 2 * h}, {x: h, y: 2 * h},
                 {x: -2 * h, y: 0}, {x: 0, y: 0}, {x: 2 * h, y: 0},
                 {x: -2 * h, y: -2 * h}, {x: 0, y: -2 * h}, {x: 2 * h, y: -2 * h}], 
            9: [{x: -2 * h, y: 2 * h}, {x: 0, y: 2 * h}, {x: 2 * h, y: 2 * h},
                {x: -2 * h, y: 0}, {x: 0, y: 0}, {x: 2 * h, y: 0},
                {x: -2 * h, y: -2 * h}, {x: 0, y: -2 * h}, {x: 2 * h, y: -2 * h}],     
        }
        for (let i = 1; i <= 9; i++) {
            let scale = 1 / 3 - 0.01;
            let posScale = 1;
            if (i === 1) {
               scale = 1 + 0.01;
               posScale = 3;
            } else if (i >= 2 && i <= 4) {
                scale = 1 / 2 - 0.01;
                posScale = 1.5;
            }
            for(let j = 0; j < this.headPos[i].length; j++) {
                this.headPos[i][j].scale = scale;
                this.headPos[i][j].posScale = posScale;
            }
        }
    },

    init (top1GroupMembers, topGroupInfo) {
        this.headList.map(v => v.active = false);

        this.groupName.string = tool.trimString(topGroupInfo.name, 8);
        this.groupScore.string = topGroupInfo.score;
        // 战队的成员头像
        let len =  top1GroupMembers.length;
        for (let i = 0; i < len && i < 9; i++) {
            let item = null;
            if (this.headList[i] === undefined) {
                item = cc.instantiate(this.topGroupHead);
                this.headList.push(item);
                item.parent = this.groupMembers;
            } else {
                item = this.headList[i];
            }
            item.active = true;
        }

        len = len > 9 ? 9 : len;
        let curHeadPos = this.headPos[len];

        for(let i = 0; i < len; i++) {
            if(this.headList[i]){
                this.headList[i].x = curHeadPos[i].x * curHeadPos[i].posScale;
                this.headList[i].y = curHeadPos[i].y * curHeadPos[i].posScale;
                this.headList[i].scale = curHeadPos[i].scale;
            }
        }

        top1GroupMembers.sort(function (a, b) {
            if(b.score === undefined) return -1;
            if(a.score === undefined) return 1;
            return b.score - a.score;
        });
        
        this.topName.string = tool.trimString(top1GroupMembers[0].nickname, 8);
        this.topScore.string = top1GroupMembers[0].score;
    },
});
