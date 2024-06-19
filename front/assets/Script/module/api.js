let token = '';
const host = 'https://api.bit123.finance';
// const host = 'http://localhost:8787';

function getUserInfo() {
    console.log('>>>>>tgInitData', window.Telegram.WebApp.initData);
    if (!window.Telegram.WebApp.initData) {
        return Promise.resolve();
    }
    return fetch(`${host}/user/info`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initData: window.Telegram.WebApp.initData }),
    }).then(res => res.json())
    .then(res => {
        if (res.code !== 0) {
            throw new Error(res.msg);
        }
        token = res.data.token;
        return res.data;
    });
    // return post(`${host}/user/info`, { initData: tgInitData }).then(res => {
    //     if (res.code !== 0) {
    //         throw new Error(res.msg);
    //     }
    //     console.log(res);
    //     token = res.token;
    //     return res.data;
    // });
}

function updateScore(score) {
    console.log('>>>>>tgInitData', window.Telegram.WebApp.initData);
    if (!window.Telegram.WebApp.initData) {
        return Promise.resolve();
    }
    return fetch(`${host}/score/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initData: window.Telegram.WebApp.initData, score, token }),
    }).then(res => res.json())
    .then(res => {
        if (res.code !== 0) {
            throw new Error(res.msg);
        }
        token = res.data.token;
        return res.data;
    });
    // post(`${host}/score/add`, { initData: tgInitData, score, token }).then(res => {
    //     if (res.code !== 0) {
    //         throw new Error(res.msg);
    //     }
    //     token = res.token;
    //     console.log(res);
    //     return res.data;
    // });
}

function generateQueneRunner () {
    const quene = [];
    return (fn) => {
        if (quene.length > 1) {
            quene.splice(1, quene.length - 1, fn);
        } else {
            quene.push(fn);
        }
        const run = () => {
            const task = quene[0];
            if (!task) {
                return Promise.resolve();
            }
            return task().finally(() => {
                quene.shift();
                console.log('next task', quene);
                if (quene.length) {
                    return run();
                }
            });
        }
        if (quene.length === 1) {
            return run();
        }
        return Promise.resolve();
    }
}

module.exports = {
    getUserInfo,
    updateScore,
    scoreQueneRunner: generateQueneRunner(),
};
