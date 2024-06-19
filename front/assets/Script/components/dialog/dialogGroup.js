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

    async connectToWallet() {
        const connectedWallet = await tonConnectUI.connectWallet();
        // 如果需要，可以对connectedWallet做一些事情
        console.log(connectedWallet);
    },

    onLoad () {
        this.closeBtn.on('click', this.onCloseBtn, this);

        this.myChangeBtn.on('click', function () {
            console.log('connect wallet');
            // 调用函数
            connectToWallet().catch(error => {
                console.error("Error connecting to wallet:", error);
            });
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
