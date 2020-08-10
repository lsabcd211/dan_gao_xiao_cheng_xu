export default ({url,data, method='GET',header})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url,
			data,
			method,
			header,
			success(res) {
				console.log(res)
				let {success, data, code,message} = res.data;
				resolve(res.data)
			}
		})
	})
}