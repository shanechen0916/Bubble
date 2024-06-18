/**
 * 随机大小配置
 */
const ScaleRange = cc.Class({
    name: 'SFXStars.ScaleRange',
    properties: {
        min: {
            default: 0.5,
            type: cc.Float,
            range: [0.01, undefined, 0.01],
            tooltip: '星星节点缩放范围起始值'
        },
        max: {
            default: 1,
            type: cc.Float,
            range: [0.01, undefined, 0.01],
            tooltip: '星星节点缩放范围终止值'
        }
    },
    setScaleOf (star) {
        if (!star || this.min === 1 && this.max === 1) {
            return;
        }
        star.scale = this.min + (this.max - this.min) * Math.random();
    }
});

/**
 * Fade效果配置
 */
const FadeRange = cc.Class({
    name: 'SFXStars.FadeRange',
    properties: {
        min: {
            default: 10,
            type: cc.Float,
            range: [0, 255, 1],
            tooltip: '星星fadeTo起始值'
        },
        max: {
            default: 155,
            type: cc.Float,
            range: [0, 255, 1],
            tooltip: '星星fadeTo终止值'
        },
        time2min: {
            default: 1,
            type: cc.Float,
            range: [0.01, undefined, 0.01],
            tooltip: '星星fadeTo min时间'
        },
        time2minDelay: {
            default: 2,
            type: cc.Float,
            range: [0.01, undefined, 0.01],
            tooltip: '星星fadeTo min时间'
        },
        time2max: {
            default: 1,
            type: cc.Float,
            range: [0.01, undefined, 0.01],
            tooltip: '星星fadeTo max时间'
        },
        time2maxDelay: {
            default: 0.5,
            type: cc.Float,
            range: [0.01, undefined, 0.01],
            tooltip: '星星fadeTo max时间'
        },
    },
    setFadeOf (star, startDelay = 0.01) {
        if (!star || this.min === 255 && this.max === 255) {
            return;
        }
        star.x = -10000;
        star.y = -10000;
        star.opacity = this.min;
        let scaleMax = star.scale;
        star.runAction(cc.sequence(
            cc.delayTime(startDelay),
            cc.callFunc(function () {
                star.x = star.parent.width * (Math.random() - star.parent.anchorX);
                star.y = star.parent.height * (Math.random() - star.parent.anchorY);
                star.runAction(cc.repeatForever(
                    cc.sequence(
                        cc.spawn(
                            cc.scaleTo(this.time2max, scaleMax),
                            cc.fadeTo(this.time2max, this.max)
                        ),
                        cc.delayTime(this.time2maxDelay),
                        cc.spawn(
                            cc.scaleTo(this.time2min, 0),
                            cc.fadeTo(this.time2min, this.min)
                        ),
                        cc.delayTime(this.time2minDelay),
                        cc.callFunc(function () {
                            star.x = star.parent.width * (Math.random() - star.parent.anchorX);
                            star.y = star.parent.height * (Math.random() - star.parent.anchorY);
                        }, this)
                    )
                ));
            }, this)
        ));
    }
});

/**
 * 星星随机效果
 *
 * 随机内容：指定范围内随机位置、指定范围内随机大小、指定范围内随机透明度变化（透明度及速度）
 */
const SFXStars = cc.Class({
    extends: cc.Component,
    properties: {
        randomPos: {
            default: true,
            tooltip: '是否随机位置'
        },
        scaleRange: {
            type: ScaleRange,
            default: null,
            tooltip: '是否随机大小：当 min === max === 1 或 scaleRange === null 时，随机生效，使用 stars 原始缩放值。'
        },
        fadeRange: {
            type: FadeRange,
            default: null,
            tooltip: '是否使用fadeTo效果：min === max === 255 或 fadeRange === null 时，不使用fadeTo效果。'
        },
    },

    onLoad () {
        this.stars = [], this.node.children.forEach(star => this.stars.push(star));
    },

    reset () {
        this.stars.forEach(star => star && star.stopAllActions());
        let startDelay = 0;
        this.stars.forEach(star => {
            if (this.randomPos && star) {
                star.x = this.node.width * (Math.random() - this.node.anchorX);
                star.y = this.node.height * (Math.random() - this.node.anchorY);
            }
            this.scaleRange && this.scaleRange.setScaleOf(star);
            if (this.fadeRange) {
                this.fadeRange.setFadeOf(star, startDelay);
                startDelay += (this.fadeRange.time2min + this.fadeRange.time2minDelay + this.fadeRange.time2max + this.fadeRange.time2maxDelay) / 3 + Math.random();
            }
        });
    },

    onEnable () {
        this.reset();
    },

    onDisable () {
        this.stars.forEach(star => star && star.stopAllActions());
    },
});

export { SFXStars };