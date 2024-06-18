import { DialogManager } from "../../../prefebs/dialog/DialogManager";

cc.Class({
    extends: cc.Component,

    properties: {
        avatar: cc.Node,
        usename: cc.Label,
        faq: cc.Node,
    },
    
    onLoad() {
        this.avatar.on('click', () => {
            DialogManager.getInstance().show('dialogGroup');
        });
        this.faq.on('click', () => {
            DialogManager.getInstance().show('dialogFaq');
        });
    }
});
