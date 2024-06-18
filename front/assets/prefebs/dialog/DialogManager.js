/**
 * 对话框管理
 * 
 * 负责各个对话框的显示，关闭，队列显示，底部banner广告
 */

const DialogManager = cc.Class({

    extends: cc.Component,

    statics: {
        getInstance() {
            return cc.find('Canvas/DialogManager').getComponent('DialogManager');
        }
    },

    properties: {
        dialogs: [cc.Prefab],
    },

    ctor() {
        this._dialogsMap = new Map();
        this._isShowing = false;
        this._showList = [];
        this._currentDialog = null;
    },

    onLoad() {

        this.dialogs.forEach(prefab => {

            if (prefab) {

                let dialog = cc.instantiate(prefab);
                dialog.active = false;
                dialog.parent = this.node;

                let ctrl = dialog.getComponent(prefab.name);
                if (ctrl) {
                    ctrl.setOnHide(() => {
                        if (this._showList.length > 0) {
                            const { name, args } = this._showList.shift();
                            this._doShow(name, ...args);
                        } else {
                            this._isShowing = false;
                            this._currentDialog = null;
                        }
                    });
                    this._dialogsMap.set(prefab.name, dialog);
                } else {
                    cc.error('>> %s.js 不存在！', prefab.name);
                }
            }
        });
    },

    isShowing () {
        return this._isShowing;
    },
    
    // 正常地按顺序展示
    show(name, ...args) {
        if (this._isShowing) {
            this._showList.push({ name, args });
        } else {
            this._doShow(name, ...args);
        }
    },

    // 将当前展示列表清除，并立即展示，用于群排行和加入战队
    clearshow(name, ...args) {
        if (!this._isShowing) {
            this._doShow(name, ...args);
        } else {
            this._showList = [];
            this._showList.push({ name, args });
            if(this._currentDialog){
                this._currentDialog.hide();
            }
        }
    },

    // 将弹窗插入第一位展示位置
    insertshow (name, ...args) {
        if (!this._isShowing) {
            this._doShow(name, ...args);
        } else {
            this._showList.splice(0, 0, { name, args });
        }
    },

    // 将弹窗展示在最上面，不影响其他弹窗的逻辑，使用该函数需要把DialogBase的canShowInTop属性设置为true，且不可以使用show、clearshow、insertshow函数
    showInTop (name, ...args) {
        let dialog = this._dialogsMap.get(name) && this._dialogsMap.get(name).getComponent(name);
        if (dialog) {
            dialog.node.zIndex = 99;
            dialog.show(...args);
        } else {
            cc.error('>> %s 未注册！ 或 %s.js 不存在！', name, name);
        }
    },
    
    _doShow(name, ...args) {
        this._isShowing = true;
        let dialog = this._dialogsMap.get(name) && this._dialogsMap.get(name).getComponent(name);
        if (dialog) {
            this._currentDialog = dialog;
            dialog.show(...args);
        } else {
            cc.error('>> %s 未注册！ 或 %s.js 不存在！', name, name);
        }
    },
});

export { DialogManager };
