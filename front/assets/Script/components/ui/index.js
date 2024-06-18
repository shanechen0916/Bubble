
/**
 * 主界面按钮的状态变化
 */

let store = require('store');
import { DialogManager } from 'DialogManager';
let userInfo = store.global;

cc.Class({
    extends: cc.Component,

    properties: {

        rankBtn: {
            default: null,
            type: cc.Node,
        }
    },

    onLoad () {

        this.rankBtn.on('click', ()=>{
            DialogManager.getInstance().show('dialogRank');
        });
    }

});
