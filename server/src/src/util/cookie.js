function set (request, name, value, expireDays) {
	const url = new URL(request.url);
	const domain = url.hostname.split('.').slice(-2).join('.');
	const d = new Date()
	d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000)
	const expires = 'expires=' + d.toUTCString()
	request.headers.set('set-cookie', name + '=' + value + '; ' + expires + '; path=/' + '; domain=' + domain)
}

function get (requeset, name) {
	const cookie = requeset.headers.get('cookie')
	if (!cookie) {
		return null
	}
	const cookieArr = cookie.split(';')
	for (const c of cookieArr) {
		const [key, value] = c.split('=')
		if (key.trim() === name) {
			return value
		}
	}
	return null
}

export default { set, get };
