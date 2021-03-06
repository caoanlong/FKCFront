/* 1位数前面加0转两位数 */
function oneToTwoNum (num) {
	let number = 0
	if (num < 10) {
		number = '' + 0 + num
	} else {
		number = num
	}
	return number
}
function getStyle(obj,attr){
	if (obj.currentStyle) {
		return obj.currentStyle[attr]
	} else{
		return getComputedStyle(obj,false)[attr]
	}
}

export default function install (Vue, option) {
	// Vue.prototype.__WEBSERVERURL__ = 'http://127.0.0.1:3000'
	// Vue.prototype.__WEBIMGSERVERURL__ = 'http://127.0.0.1:4000'
	Vue.prototype.__WEBSERVERURL__ = 'http://39.108.245.177:3000'
	Vue.prototype.__WEBIMGSERVERURL__ = 'http://39.108.245.177:4000'
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
	Vue.prototype.getTimeNum2 = function () {
		let date = new Date()
		let time = date.getFullYear() + '-' + oneToTwoNum(date.getMonth()+1) + '-' + oneToTwoNum(date.getDate()) + ' ' + oneToTwoNum(date.getHours()) + ':' + oneToTwoNum(date.getMinutes()) + ':' + oneToTwoNum(date.getSeconds())
		return time
	}
	// 转时间戳
	Vue.prototype.getdatefromtimestamp = function (input, bool) {
		let now = new Date(Number(input))
		let year = now.getFullYear()
		let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
		let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
		let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
		let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
		let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
		if (bool) {
			return year + "-" + month + "-" + date + "-"
		}else {
			return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
		}
	}
	// 判断是否为微信浏览器
	Vue.prototype.isWeixin = function () {
		let u = navigator.userAgent.toLowerCase() 
		if(u.match(/MicroMessenger/i) == "micromessenger") {  
			return true
		} else {  
			return false
		}
	}
	// 获取地址栏参数
	Vue.prototype.getQueryString = function (name) {
		let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
		let r = window.location.search.substr(1).match(reg)
		if(r!=null) {
			return unescape(r[2])
		}
		return null
	}

	Vue.prototype.getWeixinConfig = function (url, callback, bool) {
		let URL = this.__WEBSERVERURL__ + '/weixin/config'
		let params = {
			url: url
		}
		Vue.http.post(URL, params).then(res => {
			let timestamp = res.body.data.timestamp
			let nonceStr = res.body.data.noncestr
			let signature = res.body.data.signature
			wx.config({
				// debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: 'wxe0fd26ab323ce46d', // 必填，公众号的唯一标识
				timestamp: timestamp, // 必填，生成签名的时间戳
				nonceStr: nonceStr, // 必填，生成签名的随机串
				signature: signature,// 必填，签名，见附录1
				jsApiList: [
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ'
				] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			})
			wx.ready(function(){
				if (bool) {
					callback()
				}
			})
			wx.error(function(res){
				console.log(res)
			})
			if (!bool) {
				callback()
			}
		})
	}
	// 运动框架
	Vue.prototype.startMove = function (obj, json, fnEnd) {
		clearInterval(obj.timer)
		obj.timer = setInterval(function(){
			//假设所有的值都已经到了
			var bStop = true
			for(var attr in json){
				var curStyle
				if (attr == 'opacity') {
					curStyle = Math.round(parseFloat(getStyle(obj,attr))*100)
				} else{
					curStyle = parseInt(getStyle(obj,attr))
				}
				var speed = (json[attr] - curStyle)/5
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
				if (curStyle != json[attr]) {
					bStop=false
				};
				if (attr == 'opacity') {
					obj.filter = 'alpha(opacity:' + (curStyle+speed)+')'
					obj.style[attr] = (curStyle+speed)/100
				} else{
					obj.style[attr] = curStyle+speed + 'px'
				};
			}
			if (bStop) {
				clearInterval(obj.timer)
				if (fnEnd) {
					fnEnd()
				}
			}
		}, 30)
	}
}