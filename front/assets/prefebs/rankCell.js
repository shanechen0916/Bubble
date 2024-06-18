/**
 * 排行榜信息单元
 */

cc.Class({
    extends: cc.Component,

    properties: {
        // 奖牌排名需要的图片
        crown: [cc.SpriteFrame],

        rankTxt: cc.Label,
        rankIma: cc.Sprite,
        groupName: cc.Label,
        score: cc.Label,
    },

    onLoad () {
        this.cb = null;
        this.groupid = null;
        this.node.on('click', function () {
            this.cb && this.cb(this.groupid);
        }, this);
    },

    init (data, index, cb) {
        this.groupid = data._id;
        this.cb = cb;
        this.rankIma.node.active = index < 3;
        if (index < 3) {
            this.rankIma.spriteFrame = this.crown[index];
        }
    },
});
