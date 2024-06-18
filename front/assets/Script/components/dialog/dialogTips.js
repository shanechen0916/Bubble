/**
 * 通用提示框
 */

let store = require('store');
import { DialogBase } from 'DialogBase';

cc.Class({
    extends: DialogBase,

    properties: {
        title: cc.Label,
        content: cc.RichText,

        btnTxt: cc.Label,
        btn: cc.Node,
    },

    onLoad () {
        this.btn.on('click', ()=>{
            this.hide();
        } )
    },

    onShow (opt) {
        opt.title && (this.title.string = opt.title);
        opt.content && (this.content.string = opt.content);
        opt.btnTxt && (this.btnTxt.string = opt.btnTxt);
    }

});
