import { DAILY_SCORE_KEY_PREFIX, SCORE_UPDATE_TOKEN_KEY_PREFIX, DAILY_LIMIT } from './const';
import res from './util/res';
import { randomUUID } from 'node:crypto';
import { remainTimeToNextDay } from './util/date';

async function add(request, env, user) {
	console.log('[score][add] user %O', user);
	const { DATABASE, KV } = env;
	const { score, token } = await request.json();
	const scoreUpdateTokenKey = SCORE_UPDATE_TOKEN_KEY_PREFIX + '_' + user.id;
	const storedToken = await KV.get(scoreUpdateTokenKey);
	if (storedToken !== token) {
		return res.invalid();
	}
	const stmt = DATABASE.prepare('SELECT * FROM user WHERE tg_id = ? LIMIT 1').bind(user.id);
	const dailyScoreKey = DAILY_SCORE_KEY_PREFIX + '_' + user.id;
	const result = await Promise.all([stmt.first(), KV.get(dailyScoreKey)]);
	if (!result[0]) {
		return res.userNotFound();
	}
	const preScore = result[1] || 0;
	if (score > preScore && score <= DAILY_LIMIT) {
		const nextScore = result[0].score + score - preScore;
		console.log('[score][add] update score %d -> %d', result[0].score, nextScore);
		const update = DATABASE.prepare('UPDATE user SET score = ? WHERE tg_id = ?').bind(nextScore, user.id);
		await Promise.all([
			update.run(),
			KV.put(dailyScoreKey, score, { expirationTtl: remainTimeToNextDay() })
		]);
	}
	const uuid = randomUUID();
	await KV.put(scoreUpdateTokenKey, uuid, { expirationTtl: 60 * 60 })
	return res.success({
		token: uuid
	});
}

export default { add }
