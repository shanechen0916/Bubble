/**
 * 全局数据，自动同步到服务端，也可以主动通过update同步
 */

const debounce = require('debounce');
const globalData = require('globalData');
const { getUserInfo, updateScore, scoreQueneRunner } = require('api');

function update2Storage () {
    isReadyPromise.then(() => {
        cc.sys.localStorage.setItem(`u:${globalData.uid}:global`, JSON.stringify(globalData));
        scoreQueneRunner(() => updateScore(globalData.score));
    });
}

const debounceUpdate = debounce(update2Storage, 1000);

function updatebyStorage () {
    return getUserInfo().then(data => {
        const dataWithDefault = {
            user: {
                tg_id: 0,
                score: 0,
                tg_first_name: '',
                tg_last_name: '',
                tg_username: '',
                wallet: ''
            },
            dailyScore: globalData.bubbleCntForRest,
            dailyScoreLimit: globalData.dstBubbleCntForRest
        }
        const { user, dailyScore, dailyScoreLimit } = data || dataWithDefault;
        const globalStr = cc.sys.localStorage.getItem(`u:${user.tg_id}:global`);
        if (globalStr) {
            Object.assign(globalData, JSON.parse(globalStr));
            if (!(globalData.colorBubbleCntArr_id instanceof Array)) objectToArr('colorBubbleCntArr_id');
            if (!(globalData.colorBubbleCntArr_cnt instanceof Array)) objectToArr('colorBubbleCntArr_cnt');
            globalData.colorBubbleCntArr = [];
        }
        if (data) {
            globalData.uid = user.tg_id;
            globalData.totalScore = user.score;
            globalData.score = dailyScore;
            globalData.nickname = `${user.tg_first_name} ${user.tg_last_name}`;
            globalData.username = user.tg_username,
            globalData.bubbleCntForRest = dailyScore;
            globalData.dstBubbleCntForRest = dailyScoreLimit;
            globalData.wallet = user.wallet || '';
            globalData.remainTimeToNextDay = data.remainTimeToNextDay || 60 * 60 * 24 * 1000;
        }
    });
}

let isReadyPromise = updatebyStorage();

function objectToArr (globalKey) {
    let newArr = [];
    console.log(globalKey + ' before: ', globalData[globalKey]);
    if (globalData[globalKey] instanceof Object) {
        for (var key in globalData[globalKey]) {
            newArr.push(globalData[globalKey][key]);
        }
    }
    globalData[globalKey] = newArr;
    console.log(globalKey + ' after: ', globalData[globalKey]);
}

/**
 * 目前只支持绑定userInfo。建议等云端数据更新后再初始化游戏
 * @param globalData {Object} 用户游戏数据
 * @param bind {Function} 绑定store属性回调
 * @param unbind {Function} 取消绑定
 */
let store = {
    global: globalData,
    save: debounceUpdate,
    ready: () => isReadyPromise
};

module.exports = store;
