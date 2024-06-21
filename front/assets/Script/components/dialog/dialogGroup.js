/**
 * user Profile
 */
import { DialogBase } from 'DialogBase';
import { bindWallet } from '../../module/api';
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

        myChangeBtnTxt: {
            default: null,
            type: cc.Label,
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
        },

        changeBtn: {
            default: null,
            type: cc.Node,
        }
    },

    async setWalletInfo(rebind = false) {
        const address = new TonWeb.utils.Address(tonConnectUI.account.address);
        const wallet = address.toString({ isUserFriendly: true, isBounceable: false });
        this.myCreatedName.string = wallet.slice(0, 8) + '...' + wallet.slice(-8);
        this.myChangeBtnTxt.string = 'connected';
        this.myChangeBtnTxt.node.color = cc.color(0, 255, 0);
        this.myChangeBtn.getComponent(cc.Button).interactable = false;
        if (rebind) {
            bindWallet(wallet).catch(console.error);
        }
    },

    onLoad () {
        this.closeBtn.on('click', this.onCloseBtn, this);

        this.myChangeBtn.on('click', async function () {
            await tonConnectUI.connectWallet();
            this.setWalletInfo(true);
        }, this);

        userInfo.username && (this.username.string = userInfo.username);
        userInfo.nickname && (this.nickname.string = userInfo.nickname.slice(0, 3));
        userInfo.totalScore && (this.score.string = userInfo.totalScore);

        const wallet = userInfo.wallet;
        if (wallet || tonConnectUI.connected) {
            this.setWalletInfo(!wallet && tonConnectUI.connected);
        }
    },

    onEnable () {
        userInfo.totalScore && (this.score.string = userInfo.totalScore);
    },

    onCloseBtn(){
        this.hide();
    },

    onShow() {
        userInfo.username && (this.username.string = userInfo.username);
        userInfo.nickname && (this.nickname.string = userInfo.nickname.slice(0, 3));
        userInfo.totalScore && (this.score.string = userInfo.totalScore);
    }

    // update (dt) {},
});
