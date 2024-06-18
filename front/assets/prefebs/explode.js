cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function () {
        this.particle = this.node.getComponent(cc.ParticleSystem);
    },

    emit: function () {
        this.particle.resetSystem();
    },

    hide: function () {
        this.particle.stopSystem();
    }
});
