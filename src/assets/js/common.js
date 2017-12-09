function oneToTwoNum (num) {
	let number = 0
	if (num < 10) {
		number = '' + 0 + num
	} else {
		number = num
	}
	return number
}
export default function install (Vue, option) {
	// Vue.prototype.__WEBSERVERURL__ = 'http://127.0.0.1:3000'
	Vue.prototype.__WEBSERVERURL__ = 'http://39.108.245.177:3000'
	// Vue.prototype.__WEBIMGSERVERURL__ = 'http://39.108.245.177:8100'
	Vue.prototype.getVerCode = function (num) {
		let result = ''
		for (let i = 0; i < num; i++) {
			let ran = Math.floor(Math.random()*10)
			result += ran
		};
		return result
	}
	Vue.prototype.getTimeNum = function () {
		let date = new Date()
		let time = '' + date.getFullYear() + oneToTwoNum(date.getMonth()+1) + oneToTwoNum(date.getDate()) + oneToTwoNum(date.getHours()) + oneToTwoNum(date.getMinutes()) + oneToTwoNum(date.getSeconds())
		return time
	}
	Vue.prototype.getdatefromtimestamp = function (input, bool) {
		let now = new Date(Number(input))
		let year = now.getFullYear()
		let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
		let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
		let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
		let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
		let second = now.getSeconds()
		if (bool) {
			return year + "-" + month + "-" + date + "-"
		}else {
			return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
		}
	}
}