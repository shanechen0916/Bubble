/**
 * user Profile
 */
import { DialogBase } from 'DialogBase';
let store = require('store');
let userInfo = store.global;
cc.Class({
    extends: DialogBase,

    properties: {
        myCreatedName: {
            default: null,
            type: cc.Label,
        },

        myChangeBtn: {
            default: null,
            type: cc.Node,
        },

        createdNode: {
            default: null,
            type: cc.Node,
        },

        username: {
            default: null,
            type: cc.Label,
        },

        nickname: {
            default: null,
            type: cc.Label,
        },

        score: {
            default: null,
            type: cc.Label,
        },

        closeBtn: {
            default: null,
            type: cc.Node,
        }
    },

    onLoad () {
        this.closeBtn.on('click', this.onCloseBtn, this);

        this.myChangeBtn.on('click', function () {
            // TODO: wallet connect
            console.log('connect wallet');
        }, this);

        userInfo.wallet && (this.myCreatedName.string = userInfo.wallet);

        userInfo.username && (this.username.string = userInfo.username);
        userInfo.nickname && (this.nickname.string = userInfo.nickname);
        userInfo.totalScore && (this.score.string = userInfo.totalScore);
    },

    onEnable () {
        userInfo.totalScore && (this.score.string = userInfo.totalScore);
    },

    onCloseBtn(){
        this.hide();
    },

    onShow() {
        userInfo.username && (this.username.string = userInfo.username);
        userInfo.nickname && (this.nickname.string = userInfo.nickname);
        userInfo.totalScore && (this.score.string = userInfo.totalScore);
    }

    // update (dt) {},
});
