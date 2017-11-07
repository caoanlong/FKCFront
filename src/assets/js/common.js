export default function install (Vue, option) {
	Vue.prototype.__WEBSERVERURL__ = 'http://127.0.0.1:3000';
	// Vue.prototype.__WEBSERVERURL__ = 'http://39.108.245.177:3000';
	Vue.prototype.__WEBIMGSERVERURL__ = 'http://39.108.245.177:3000';
}