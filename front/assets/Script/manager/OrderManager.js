/**
 * 层级管理
 * 1.打开排行榜时不显示主界面
 */

let gaming;
let rest;
let index;
let maskLayer;
let starLayer;
let OrderManager = {

    init: function () {
        if(!gaming){
            gaming = cc.find('Canvas/gaming');
        }
        if(!rest){
            rest = cc.find('Canvas/rest');
        }
        if(!index){
            index = cc.find('Canvas/index');
        }
        if(!maskLayer){
            maskLayer = cc.find('Canvas/maskLayer');
        }
        if(!starLayer){
            starLayer = cc.find('Canvas/bg/bg3/starLayer');
        }
    },

    showGaming: function () {
        this.init();
        gaming.opacity = 255;
        rest.opacity = 255;
        index.opacity = 255;
        maskLayer.active = false;
        starLayer.active = true;
    },

    hideGaming: function(){
        this.init();
        gaming.opacity = 0;
        rest.opacity = 0;
        index.opacity = 0;
        maskLayer.active = true;
        starLayer.active = false;
    }
}

export { OrderManager };
