import { DAILY_SCORE_KEY_PREFIX, SCORE_UPDATE_TOKEN_KEY_PREFIX } from './const';
import res from './util/res';
import { randomUUID } from 'node:crypto';
import { DAILY_LIMIT } from './const';
import { remainTimeToNextDay } from './util/date';

async function info(request, env, user) {
	console.log('[user][info] user %O', user);
	const { DATABASE, KV } = env;
	const stmt = DATABASE.prepare('SELECT * FROM user WHERE tg_id = ? LIMIT 1').bind(user.id);
	const dailyScoreKey = DAILY_SCORE_KEY_PREFIX + '_' + user.id;
	const uuid = randomUUID();
	const scoreUpdateTokenKey = SCORE_UPDATE_TOKEN_KEY_PREFIX + '_' + user.id;
	const result = await Promise.all([stmt.first(), KV.get(dailyScoreKey), KV.put(scoreUpdateTokenKey, uuid, { expirationTtl: 60 * 60 })]);
	const data = {
		user: result[0],
		dailyScore: parseInt(result[1]) || 0,
		dailyScoreLimit: DAILY_LIMIT,
		token: uuid,
		remainTimeToNextDay: remainTimeToNextDay(),
	};
	return res.success(data);
}

async function bind(request, env, user) {
	const { DATABASE } = env;
	let stmt = DATABASE.prepare('SELECT * FROM user WHERE tg_id = ? LIMIT 1').bind(user.id);
	let result = await stmt.first();
	if (result.wallet) {
		return res.error('已绑定');
	}
	const { wallet } = await request.json();
	stmt = DATABASE.prepare('UPDATE user SET score = ? WHERE tg_id = ?').bind(wallet, user.id);
	result = await stmt.run();
	console.log('[user][bind] result %O', result);
	return res.success();
}
export default { info, bind };
