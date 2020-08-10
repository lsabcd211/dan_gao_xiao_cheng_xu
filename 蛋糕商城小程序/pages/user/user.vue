<template>
	<view class="content">
		<view class="uni-form" v-if="active===1">
			<view>用户登录</view>
			<view class="inp">
				<text>账号：</text>
				<input type="text" v-model="usrname" placeholder="请输入账号" />
			</view>
			<view class="inp">
				<text>密码：</text>
				<input type="text" v-model="usrpwd" placeholder="请输入密码" />
			</view>
			<view class="btn">
				<button size="mini" type="default" @click="login()">登录</button>
				<button size="mini" type="default" @click="active=3">注册</button>
			</view>
		</view>
		
		<view class="usr" v-if="active===2">
			<view class="top">
				<image class="img" src="https://static.21cake.com//upload/images/dda23404c8cba348580acd684114ade3.png" mode=""></image>
				<view>
					{{userInfo.nickname}}
				</view>
				<view>
					{{userInfo.phone}}
				</view>
			</view>
			<button size="mini" type="default" @click="exit()">注销</button>
		</view>
		
		<view class="uni-form" v-if="active===3">
			<view>用户注册</view>
			<view class="inp">
				<text>账号：</text>
				<input type="text" v-model="usrname" placeholder="请输入账号" />
			</view>
			<view class="inp">
				<text>密码：</text>
				<input type="text" v-model="usrpwd" placeholder="请输入密码" />
			</view>
			<view class="inp">
				<text>昵称：</text>
				<input type="text" v-model="usrnickname" placeholder="请输入昵称" />
			</view>
			<view class="btn">
				<button size="mini" type="default" @click="reg()">注册</button>
				<button size="mini" type="default" @click="active=1">返回</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 1,
				phone:"",
				pwd:"",
				nickname:"",
				userInfo:{
					phone:"",
					pwd:""
				}
			}
		},
		onLoad() {

		},
		onShow() {
			uni.getStorage({
			    key:'userInfo',
			    success: (res)=> {
			         this.userInfo=res.data;
					 this.active=2;
			    }
			});
		},
		methods: {
			reg(){
				var dataTemp={
					phone:this.usrname,
					pwd:this.usrpwd,
					nickname:this.usrnickname
				}
				uni.request({
					// #ifdef  H5
					url: '/doc/user/reg',
					// #endif
					// #ifdef  MP-WEIXIN || MP-ALIPAY
					url: 'http://localhost:3000/user/reg',
					// #endif
					method:'POST',
					header:{
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data:dataTemp,
				    success: (res) => {
						if(res.data.code==="10001"){
							uni.showModal({
							    title: '提示',
							    content: res.data.msg,
								showCancel:false
							});
						}else {
							uni.showModal({
							    title: '提示',
							    content: res.data.msg,
								showCancel:false,
							    success: ()=>{
									this.active=1;
							    }
							});
						}
				    }
				});
			},
			login(){
				var dataTemp={
					phone:this.usrname,
					pwd:this.usrpwd
				}
				uni.request({
					// #ifdef  H5
					url: '/doc/user/login',
					// #endif
					// #ifdef  MP-WEIXIN || MP-ALIPAY
					url: 'http://localhost:3000/user/login',
					// #endif
				    data: dataTemp,
				    method:'POST',
					header:{
						'content-type': 'application/x-www-form-urlencoded', 
					},
				    success: (res) => {
						if(res.data.code==="10001" || res.data.code==="10002"){
							uni.showModal({
							    title: '提示',
							    content: res.data.msg,
								showCancel:false
							});
						}else {
							uni.showModal({
							    title: '提示',
							    content: res.data.msg,
								showCancel:false,
							    success: ()=>{
									this.active=2;
									this.userInfo=res.data.info;
									// console.log(res.data.info);
									uni.setStorage({
										key:'userInfo',
										data:res.data.info
									})
							    }
							});
						}
				        // console.log(res.data);
				    }
				});
			},
			exit(){
				uni.clearStorage();
				this.active=1;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.uni-form{
			color: gray;
			font-size: 120%;
			width: 100%;
			padding-left: 50rpx;
			.inp{
				margin: 10px 0;
				display: flex;
				flex-direction: row;
				width: 60%;
				height: 50rpx;
				input{
					border-bottom: 2px solid #808080;
				}
			}
			.btn{
				margin: 1rpx 0 0 10rpx;
				.mini {
					border-radius: 4px;
					width: 180rpx;
				}
			}
		}
		.usr{
			height: 222rpx;
			width: 100%;
			.top{
				border: 2px solid #DD524D;
				text-align: center;
				.img{
					border: 1px solid #9a3935;
					border-radius: 50%;
					height: 100rpx;
					width: 100rpx;
				}
			}
		}
	}

</style>
