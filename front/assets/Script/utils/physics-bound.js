
cc.Class({
    extends: cc.Component,

    properties: {
        // width为横向范围，height是从顶端为起点开始计算的值
        size: cc.size(0, 0),

        score: cc.Node,
        fadeRank: cc.Node,

        mouseJoint: true
    },

    // use this for initialization
    onLoad: function () {
        let width   = this.size.width || this.node.width;
        let height  = this.size.height || this.node.height;

        let node = new cc.Node();

        let body = node.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Static;

        if (this.mouseJoint) {
            // add mouse joint
            let joint = node.addComponent(cc.MouseJoint);
            joint.mouseRegion = this.node;    
        }

        // 以分数和排行榜按钮为边界
        let maxY = this.score.parent.convertToWorldSpaceAR(cc.v2(this.score.x, this.score.y)).y;
        let minY = this.fadeRank.parent.convertToNodeSpaceAR(cc.v2(this.fadeRank.x, this.fadeRank.y)).y;
        this._addBound(node, 360, maxY, width, 20);
        this._addBound(node, 360, minY, width, 20);
        this._addBound(node, 360 - width / 2, (maxY - minY) / 2 + minY, 20, maxY - minY);
        this._addBound(node, 360 + width / 2, (maxY - minY) / 2 + minY, 20, maxY - minY);

        node.parent = this.node;
    },

    _addBound (node, x, y, width, height) {
        let collider = node.addComponent(cc.PhysicsBoxCollider);
        collider.offset.x = x;
        collider.offset.y = y;
        collider.size.width = width;
        collider.size.height = height;
        collider.friction = 0;
        collider.restitution = 1;
    }
});
