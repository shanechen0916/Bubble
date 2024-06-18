
export const SUCCESS_CODE = 0;
export const SUCCESS_MESSAGE = 'SUCCESS';
export const COMMON_ERROR_CODE = 1;
export const COMMON_ERROR_MESSAGE = 'UNKNOWN ERROR';
export const INVALID_TOKEN_CODE = 2;
export const INVALID_TOKEN_MESSAGE = 'INVALID TOKEN';
export const USER_NOT_FOUND_CODE = 3;
export const USER_NOT_FOUND_MESSAGE = 'USER NOT FOUND';

function send(code, message, data) {
	const body = {
		code,
		message,
		data
	};
	console.log('[res][send] %O', body);
	return new Response(JSON.stringify(body), {
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Access-Control-Allow-Origin': '*',
		}
	})
}

function error() {
	console.log('[res][error] Unknown Error');
	return send(COMMON_ERROR_CODE, COMMON_ERROR_MESSAGE);
}

function unauthorized() {
	console.log('[res][error] Unauthorized');
	return new Response('Unauthorized', { status: 401 });
}

function invalid() {
	console.log('[res][error] Invalid Token');
	return send(INVALID_TOKEN_CODE, INVALID_TOKEN_MESSAGE);
}

function userNotFound() {
	console.log('[res][error] User Not Found');
	return send(USER_NOT_FOUND_CODE, USER_NOT_FOUND_MESSAGE);
}

function methodNotAllowed() {
	console.log('[res][error] Method Not Allowed');
	return new Response('Method Not Allowed', { status: 405 });
}

function forbidden() {
	console.log('[res][error] Forbidden: only accept "Content-type": application/json"');
	return new Response('Forbidden: only accept "Content-type": application/json"', { status: 403 });
}

function success(data) {
	console.log('[res][success] data %O', data);
	return send(SUCCESS_CODE, SUCCESS_MESSAGE, data);
}

export default { error, success, unauthorized, invalid, userNotFound, methodNotAllowed, forbidden }
