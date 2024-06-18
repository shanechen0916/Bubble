import { createHmac } from 'node:crypto';

/**
 * 根据tg的initData验证用户身份
 * @param {string} initData
 * @returns
 */
function verifyTgInitData(initData, env) {
	const pairs = initData.split('&').sort();
	let hash = '';
	const str = pairs.map(pair => {
		if (pair.startsWith('hash=')) {
			hash = pair.slice(5);
			return '';
		} else {
			return pair;
		}
	}).filter(item => Boolean(item)).join('\n');
	let hmac = createHmac('sha256', 'WebAppData');
	hmac.update(env.secret_key);
	const key = hmac.digest('hex');
	hmac = createHmac('sha256', key);
	hmac.update(str);
	return hmac.digest('hex') === hash;
}

function generateRefCode(user, env) {
	const hmac = createHmac('sha256', env.secret_key);
	hmac.update(user.id.toString());
	hmac.update(user.username);
	hmac.update(user.first_name || '');
	hmac.update(user.last_name || '');
	const code = hmac.digest('hex').slice(0, 8);
	return code;
}

async function initUser(env, user) {
	const { DATABASE, KV } = env;
	let hasInited = Boolean(await KV.get(user.id));
	if (!hasInited) {
		console.log('[auth][initUser] user(%d) not inited, check database...', user.id)
		const stmt = DATABASE.prepare('SELECT * FROM user WHERE tg_id = ? LiMIT 1').bind(user.id);
		const result = await stmt.first();
		if (result) {
			await KV.put(user.id, '1');
			hasInited = true;
		}
	}
	if (!hasInited) {
		console.log('[auth][initUser] user(%d) not inited, insert into database...', user.id)
		const insert = DATABASE.prepare('INSERT INTO user (tg_id, tg_username, tg_first_name, tg_last_name, score, ref_code) VALUES (?, ?, ?, ?, ?, ?)').bind(user.id, user.username, user.first_name || '', user.last_name || '', 0, generateRefCode(user, env));
		await insert.run();
		console.log('[auth][initUser] user(%d) inited', user.id)
	}
}
async function auth(request, env) {
	const { initData } = await request.json();
	console.log('[auth] initData %O', initData);
	if (!initData) {
		return null;
	}
	// const isValid = verifyTgInitData(initData, env);
	// if (!isValid) {
	// 	return null;
	// }
	const params = new URLSearchParams(initData);
	const user = JSON.parse(params.get('user'));
	await initUser(env, user);
	console.log('[auth] user %O', user);
	return user;
}

export default auth;
