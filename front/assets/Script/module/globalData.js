module.exports = {
    uid: 0,
    username: '',
    nickName: '',
    score: 0,
    totalScore: 0,
    wallet: '',
    remainTimeToNextDay: 60 * 60 * 24,
    // 累计的捏彩泡泡数
    colorBubbleScore: 0,
    // 泡泡生产的数量，用于显示奖励弹出的触发条件，进入游戏不清0
    bubbleCntForAward: 0,
    // 泡泡生产的数量，用于不生产泡泡的触发条件，进入游戏清0
    bubbleCntForRest: 0,
    // 泡泡不生产泡泡的触发条件
    dstBubbleCntForRest: 1000,
    // 彩色泡泡的剩余数量数组：[{id: 1, cnt: 50}, {id: 1, cnt: 50}];
    colorBubbleCntArr: [],
    colorBubbleCntArr_id: [],
    colorBubbleCntArr_cnt: [],
};

