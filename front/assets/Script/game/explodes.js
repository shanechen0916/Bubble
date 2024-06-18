/**
 * 爆炸发射器
 */

// 普通泡泡
let normals = [];
let normalMax = 10;
let normalIndex = 0;

// 广告泡泡
let ads = [];
let adMax = 2;
let adIndex = 0;

// 彩色泡泡
let colors = [];
let colorMax = 10;
let colorIndex = 0;
cc.Class({
    extends: cc.Component,

    properties: {
        stage: {
            default: null,
            type: cc.Node
        },
        normal: {
            default: null,
            type: cc.Prefab,
        },
        adExplode: {
            default: null,
            type: cc.Prefab,
        },
        colorExplode: {
            default: null,
            type: cc.Prefab,
        },
    },

    onLoad () {
        for (let i = 0; i < normalMax; i++) {
            let normal = cc.instantiate(this.normal);
            normal.x = 2000;
            normal.y = 2000;
            normals.push(normal);
            this.stage.addChild(normal);
        }

        for (let i = 0; i < adMax; i++) {
            let ad = cc.instantiate(this.adExplode);
            ad.x = 2000;
            ad.y = 2000;
            ads.push(ad);
            this.stage.addChild(ad);
        }

        for (let i = 0; i < colorMax; i++) {
            let color = cc.instantiate(this.colorExplode);
            color.x = 2000;
            color.y = 2000;
            colors.push(color);
            this.stage.addChild(color);
        }
    },

    emit (pos, scale) {
        if (normalIndex === normalMax) {
            normalIndex = 0;
        }
        this.showExplode(normals[normalIndex], pos, scale);
        normalIndex++;
    },

    emitAd (pos, scale) {
        if (adIndex === adMax) {
            adIndex = 0;
        }
        this.showExplode(ads[adIndex], pos, scale);
        adIndex++;
    },

    emitColor (pos, scale) {
        if (colorIndex === colorMax) {
            colorIndex = 0;
        }
        this.showExplode(colors[colorIndex], pos, scale);
        colorIndex++;
    },

    showExplode (node, pos, scale) {
        node.x = pos.x;
        node.y = pos.y;
        node.scaleX = node.scaleY = scale;
        node.getComponent('explode').emit();
    }
});
