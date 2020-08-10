import request from '@/api/request.js'

// #ifdef  H5
const base_url='/doc'
// url: '/doc/user/login',
// #endif
// #ifdef  MP-WEIXIN || MP-ALIPAY
const base_url='http://localhost:3000'
// url: 'http://localhost:3000/user/login',
// #endif

export function goodList(){
	return request({
		url: base_url + '/index',
		method: 'GET',
		header:{
			"content-type":"application/json"
		},
	})
}

export function login(data){
	return request({
		url: base_url + '/user/login',
		method:'POST',
		data,
		header:{
			"content-type":"application/x-www-form-urlencoded"
		},
	})
}

export function register(data){
	return request({
		url: base_url + '/user/reg',
		method:'POST',
		data,
		header:{
			"content-type":"application/x-www-form-urlencoded"
		},
	})
}