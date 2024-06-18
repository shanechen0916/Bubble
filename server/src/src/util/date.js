export function remainTimeToNextDay() {
	const now = new Date();
	const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
	return nextDay - now;
}

export default { remainTimeToNextDay }
