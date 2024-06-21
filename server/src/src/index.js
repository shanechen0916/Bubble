// src/templates/populated-worker/src/index.js
// import renderHtml from "./renderHtml.js";
import auth from "./auth.js";
import res from './util/res';
import userHandler from './user.js';
import scoreHandler from './score.js';

var src_default = {
  async fetch(request, env) {
		console.log('[index] fetch entrance');
		if (request.method === 'OPTIONS') {
			return new Response('OK', {
				headers: {
					'Access-Control-Allow-Origin': 'https://www.bit123.finance',
					'Access-Control-Allow-Methods': 'POST',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}
		if (request.method !== 'POST') {
			return res.methodNotAllowed();
		}
		if (request.headers.get('content-type') !== 'application/json') {
			return res.forbidden();
		}
		const user = await auth(request.clone(), env);
		if (!user) {
			return res.unauthorized();
		}
		const url = new URL(request.url);
		const path = url.pathname;
		console.log('[index] fetch entrance, path: %s', path);
		switch (path) {
			case '/user/info':
				return userHandler.info(request, env, user);
			case '/user/bind':
				return userHandler.bind(request, env, user);
			case '/score/add':
				return scoreHandler.add(request, env, user);
			default:
				return res.success("hello world");
				// const { DATABASE } = env;
				// const stmt = DATABASE.prepare("SELECT * FROM comments LIMIT 3");
				// const { results } = await stmt.all();
				// return new Response(
				// 	renderHtml(JSON.stringify(results, null, 2)),
				// 	{
				// 		headers: {
				// 			"content-type": "text/html"
				// 		}
				// 	}
				// );
		}
  }
};
export {
  src_default as default
};
