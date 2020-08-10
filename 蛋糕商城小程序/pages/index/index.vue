<template>
	<view class="content">
		<view class="tabheader">
			<image src="../../static/timg.jpg"></image>
		</view>
		<view class="fill">
			
		</view>
		
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in banners" :key="index">
				<view class="swiper-item uni-bg-red">
					<image :src="item.ImgUrl" />
				</view>
			</swiper-item>
		</swiper>
		
		<view class="jieshao">
			<view>◇新客慢298元赠送切块蛋糕</view>
			<view>◇满100包邮</view>
			<view>◇全程冷链配送</view>
		</view>
		
		<view class="uni-flex uni-row ico">
			<view class="flex-item" v-for="(item,index) in icons" :key="index">
				<image :src="item.ImgUrl" mode=""></image>
				{{item.name}}
			</view>
		</view>
		<view class="good">
			<view class="list" v-for="(item,index) in goods" :key="index">
				<view class="cover" @click="toDetail(index)">
					<image :src="item.ImgUrl" mode=""></image>
				</view>
				<view class="text">
					<text class="name">
						{{item.Name}}
					</text>
					<text class="price">
						{{item.Price}}
					</text>
					<text class="size">
						元/{{item.Size}}个（1.0镑）
					</text>
					<view class="cart" @click="add(item)"></view>
				</view>
				<view class="des">
					{{item.title}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banners:[],
				goods:[],
				icons:[]
			}
		},
		onShow() {

			// #ifdef  H5
			uni.request({
			    url: '/doc/index',
				method: 'GET',
				header:{
					"content-type":"json"
				},
			    success: (res) => {
					this.banners=res.data.banners;
					this.goods=res.data.goods;
					this.icons=res.data.icons;
					this.$store.state.goods=this.goods;
			    }
			});
			// #endif
			// #ifdef  MP-WEIXIN || MP-ALIPAY
			uni.request({
			    url: 'http://localhost:3000/index',
				method: 'GET',
				header:{
					"content-type":"json"
				},
			    success: (res) => {
					this.banners=res.data.banners;
					this.goods=res.data.goods;
					this.icons=res.data.icons;
					this.$store.state.goods=this.goods;
			    }
			});
			// #endif
		},
		methods: {
			toDetail(index){
				uni.navigateTo({
					url:"../detail/detail?index="+index
				})
			},
			add(item){
				// console.log(item);//商品的信息
				try{
					const userInfo=uni.getStorageSync('userInfo');
					if(userInfo){
						this.$store.commit("add",item);//Vuex调用同步方法，并把item数据传过去
					}else{
						uni.showModal({
							title: '提示',
							content: '请先登录',
							showCancel:false,
							success: ()=>{
								uni.switchTab({
									url: '../user/user'
								});
							}
						})
					}
				}catch(e){
					//TODO handle the exception
				}
				
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
		.tabheader{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 96rpx;
			text-align: center;
			background: #FFFFFF;
			box-shadow: 0 4px 4px 0 #888888;
			border-radius: 4px;
			z-index: 1111;
			image{
				width: 60rpx;
				height: 60rpx;
				transform: translateY(30%);
			}
		}
		//#ifdef  MP-WEIXIN || MP-ALIPAY
		.fill{
			width: 100%;
			height: 48*2rpx;
		}
		//#endif
		.swiper{
			width: 100%;
			image{
				width: 100%;
			}
		}
		.jieshao{
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			margin: 2px 0;
			font-size: 80%;
			color: #efac4e;
			width: 100%;
		}
		.ico{
			text-align: center;
			margin: 0 0 16rpx 0;
			image{
				height: 100rpx;
				width: 100rpx;
				display: block;
				padding: 0 40rpx;
			}
		}
		.good{
			border-top: 3px solid #eeeeee;
			width: 90%;
			margin-top: 10rpx;
			.list{
				box-shadow: 0 4px 4px 0 #BBB;
				margin: 50rpx 0;
				.cover{
					width: 100%;
					height: 198*2rpx;
					border-radius: 4px;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					padding: 20rpx 0 0 20rpx;
					.name{
						font-weight: bold;
						color: #322418;
						font-size: 15px;
					}
					.price{
						color: #C69C6D;
						margin-left: 10px;
					}
					.size{
						color: #B2B2B2;
						font-size: 10px;
					}
					.cart{
						margin-top: 22rpx;
						margin-right: 10rpx;
						height: 60rpx;
						width: 60rpx;
						float: right;
						border-radius: 50%;
						box-shadow: 0 4px 4px 0 rgba(0,0,0,0.4);
						background:url(https://static.21cake.com/themes/wap/img/new-home-icon.png) no-repeat;
						background-size: 160rpx auto;
						background-position: -86rpx -10rpx;
					}
				}
				.des{
					padding: 0 0 10px 20rpx;
					font-size: 90%;
					color: #442818;;
				}
			}
		 }   
	}

</style>
