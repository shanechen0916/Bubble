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
        },

        changeBtn: {
            default: null,
            type: cc.Node,
        }
    },

    async connectToWallet() {
        const currentWallet = tonConnectUI.wallet;
        const currentWalletInfo = tonConnectUI.walletInfo;
        const currentAccount = tonConnectUI.account;
        const currentIsConnectedStatus = tonConnectUI.connected;
        console.log("currentWallet:", currentWallet);
        console.log("currentWalletInfo:", currentWalletInfo);
        console.log("currentAccount:", currentAccount);
        console.log("currentIsConnectedStatus:", currentIsConnectedStatus);
        const unsubscribe = tonConnectUI.onStatusChange(
            walletAndwalletInfo => {
                // update state/reactive variables to show updates in the ui
                console.log('status change', walletAndwalletInfo);
            } 
        );
        await tonConnectUI.connectWallet;
        const address = new TonWeb.utils.Address(tonConnectUI.currentAccount.address);
        console.log(address.toString({ isUserFriendly: true, isBounceable: false }))
        // try {
        //     const connectedWallet = await tonConnectUI.connectWallet();
        //     console.log("Connected to wallet:", connectedWallet);
        // } catch(error) {
        //     console.error("Error connecting to wallet:", error);
        //     const connectedWallet = await tonConnectUI.restoreConnection();
        //     console.log("Connected to wallet:", connectedWallet);
        // }
        // 如果需要，可以对connectedWallet做一些事情
        // console.log(connectedWallet);
    },

    onLoad () {
        this.closeBtn.on('click', this.onCloseBtn, this);

        this.myChangeBtn.on('click', function () {
            console.log('connect wallet');
            // 调用函数
            this.connectToWallet();
        }, this);

        if (tonConnectUI.connected) {
            tonConnectUI.disconnect();
            // this.changeBtn.active = false;
        }

        userInfo.wallet && (this.myCreatedName.string = userInfo.wallet);

        userInfo.username && (this.username.string = userInfo.username);
        userInfo.nickname && (this.nickname.string = userInfo.nickname.slice(0, 3));
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
        userInfo.nickname && (this.nickname.string = userInfo.nickname.slice(0, 3));
        userInfo.totalScore && (this.score.string = userInfo.totalScore);
    }

    // update (dt) {},
});
