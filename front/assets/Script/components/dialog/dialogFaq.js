import { DialogBase } from 'DialogBase';
cc.Class({
    extends: DialogBase,
    properties: {
        closeBtn: {
            default: null,
            type: cc.Node
        }
    },
    onLoad() {
        this.closeBtn.on('click', this.onCloseBtn, this);
    },
    onCloseBtn() {
        this.hide();
    }
});