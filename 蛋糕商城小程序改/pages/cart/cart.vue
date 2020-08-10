<template>
	<view class="content">
		<view style="background: #F8F8F8;width: 100%;text-align: center;">
			<text>
				.满100元配送
			</text>
		</view>
		
		<scroll-view class="scroll" scroll-y="true" :style="{height:navHeight+'px'}">
			<view class="cart-goods" v-for="(item,index) in cartList" :key="index">
				<view class="store">
					<view style="text-align: center;flex: 1;height: 48rpx;"><image style="width: 80%;height: 80%;border-radius: 4px;" src="../../static/tianmao-.png" mode=""></image></view>
					<view style="font-size: 110%;font-weight: 600;height: 66rpx;line-height: 66rpx;flex: 9;">天猫超市 <text style="color: #d6d6d6;margin-left: 12rpx;"> > </text></view>
				</view>
				<view class="wrap" :style="{'background-color':(item.flag==true ? '#f8f8f8' : '#fff')}">
					<checkbox-group style="display: flex;flex: 1;" @change="changeitem(item)">
						<label class="checkbox">
							<checkbox style="overflow: hidden;border: 0;transform: translate(-2%,-10%)" value="item" color="#FF4200" :checked="item.flag"/>
						</label>
						<view style="display: flex;flex: 9;">
							<view class="left">
								<image :src="item.ImgUrl"/>
							</view>
							<view class="right">
								<view class="title">{{item.details[0].Ename}}</view>
								<view class="name">{{item.Name}}</view>
								<view style="display: flex;flex-direction: row;flex-wrap: wrap-reverse;justify-content: space-between;margin-top: 10rpx;">
									<view class="price">￥{{item.Price}}/{{item.Size}}g</view>
									<view class="btn">
										<view @click="calculate(true,index)" style="border-right: 1px solid #d8d8d8;">+</view>
										{{item.num}}
										<view @click="calculate(false,index)" style="border-left: 1px solid #d8d8d8;">-</view>
									</view>
								</view>
							</view>
						</view>
						

					</checkbox-group>
					
					
				</view>
			</view>
		</scroll-view>
		
		<view class="btm-bar">
			<view class="allSelect">
				<checkbox-group @change="allchange">
					<label class="checkbox">
						<checkbox :checked="allchecked" style="overflow: hidden;border: 0;transform: translate(-2%,-10%)" color="#FF4200" />
					</label>
				</checkbox-group>

				全选
			</view>
			<view class="price">
				<view style="font-size: 88%;color: #ff0000;line-height: 88rpx;">￥{{allPrice}}</view>合计：
			</view>
			<view class="count">
				结算
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pH:0, //窗口高度
				navHeight:0, //元素的所需高度
				cartList:[],//商品列表
				allPrice:0.00,//总价
				checked:false,//单选框选中属性
				allchecked:false
			}
		},
		onLoad() {

		},
		onReady() {
			let that=this;
				uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
					success(res) { //成功回调函数
						that._data.pH=res.windowHeight //windoHeight为窗口高度，主要使用的是这个
						let titleH=uni.createSelectorQuery().select(".scroll"); //想要获取高度的元素名（class/id）
						titleH.boundingClientRect(data=>{
							let pH=that._data.pH; 
							that._data.navHeight=pH-data.top  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
						}).exec()
					}
				})
		
		},
		onShow() {
			console.log(this.cartList);
			this.countAllPrice();//计算总价
			
			//购物车页面获取登录状态数据
			try{
				let userInfo=uni.getStorageSync('userInfo');
				console.log(userInfo);
				if(userInfo){
						this.cartList=this.$store.state.cartList;
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
			
		
			
		},
		methods: {
			// add(index){
			// 	this.cartList[index].num++;
			// 	this.$set(this.cartList,index,this.cartList[index]);
			// },
			// sub(index){
			// 	this.cartList[index].num--;
			// 	this.$set(this.cartList,index,this.cartList[index]);
			// 	if(this.cartList[index].num<=0){
			// 		this.cartList.splice(index,1);
			// 	}
			// }
			//商品数量增减
			calculate(bool,index){
				if(bool){
					this.cartList[index].num++;
				}else {
					this.cartList[index].num--;
				}
				if(this.cartList[index].num<=0){
					this.cartList.splice(index,1);
				}else {
					this.$set(this.cartList,index,this.cartList[index]);
				}
				this.countAllPrice();
			},
			//总价
			countAllPrice(){
				let allPrice=0;
				this.cartList.map((item)=>{
					if(item.flag)
					allPrice+=item.num*item.Price
				})
				this.allPrice=allPrice.toFixed(2);
			},
			//单选
			changeitem(item){
				// console.log(item);
				item.flag=!item.flag;
				if(item.flag){
					let test =this.cartList.every(item=>{
						return item.flag===true
					})
					if(test){
						this.allchecked = true
					} else {
						this.allchecked = false
					}
				}else{
					this.allchecked = false
				}
				this.countAllPrice();
			},
			allchange() {
				this.allchecked = !this.allchecked
				// 如果 allcheckked 为真  全选被选中时，那么设置每一项都被选中
				if(this.allchecked) {
					this.cartList.map(item => {
						item.flag = true
					})
				}else {
					this.cartList.map(item => {
						item.flag = false
					})
				}
				this.countAllPrice();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #F8F8F8;
		.scroll{
			margin-bottom: 88rpx;
			.cart-goods{
				background: #fff;
				box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
				border-radius: 8px;
				width: 94%;
				margin: 20rpx auto;
			}
			.store{
				display: flex;
				align-items: center;
			}
			.wrap{
				display: flex;
				.checkbox{
					width: 26rpx;
					height: 44rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 1px solid #d8d8d8;
					transform: scale(0.75);
					margin-top: 64rpx;
				}
				.left{
					flex: 1;
					height: 205rpx;
					width: 180rpx;
					image{
						width: 100%;
						height: 184rpx;
						border-radius: 4px;
					}
				}
				.right{
					flex: 2;
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					margin-bottom: 14rpx;
					margin-right: 12rpx;
					.title{
						font-size: 110%;
						color: black;
					}
					.price{
						color: #FF4200;
						font-size: 30rpx;
					}
					.btn{
						color: #818181;
						border: 1px solid #d8d8d8;
						border-radius: 6px;
						width: 172rpx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						transform: scale(0.95,0.85);

						view{
							display: inline-block;
							height: 50rpx;
							width: 58rpx;
							// border-radius: 50%;
							text-align: center;
							// border-right:thick double #ff0000;
							margin: 0 2px;
						}
						
					}
				}
			}
		}
		// #ifdef  H5 || APP-PLUS
		.btm-bar{
			position: fixed;
			bottom: 100rpx;
			z-index: 10000;
			width: 100%;
			height: 88rpx;
			border: 1px solid #d8d8d8;
			display: flex;
			text-align: center;
			background: #fff;
			.allSelect{
				display: flex;
				flex: 2;
			    left:30rpx;
				align-items: center;
				color: #818181;
				checkbox-group{
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 1px solid #d8d8d8;
					transform: scale(0.75);
				}
			}
			
			.price{
				flex: 5;
				text-align: right;
				font-size: 14px;
				font-weight: bold;
				line-height: 88rpx;
				// padding-right: 20rpx;
				display: flex;
				flex-direction: row-reverse;
			}
			.count{
				flex: 3;
				line-height: 88rpx;
				background: #ff0000;
				color: #fff;
				border-radius: 30px;
				transform: scale(0.8,0.8);
				font-size: 122%;
			}
		}
		// #endif
		// #ifdef  MP-WEIXIN || MP-ALIPAY || APP-PLUS
		.btm-bar{
			position: fixed;
			bottom: 0;
			z-index: 10000;
			width: 100%;
			height: 88rpx;
			border: 1px solid #d8d8d8;
			display: flex;
			text-align: center;
			background: #fff;
			.allSelect{
				flex: 2;
			    left:30rpx;
				align-items: center;
				color: #818181;
				display: flex;
				checkbox-group{
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 1px solid #d8d8d8;
					transform: scale(0.75);
				}
			}
			.price{
				flex: 5;
				text-align: right;
				font-size: 14px;
				font-weight: bold;
				line-height: 88rpx;
				// padding-right: 20rpx;
				display: flex;
				flex-direction: row-reverse;
			}
			.count{
				flex: 3;
				line-height: 88rpx;
				background: #ff0000;
				color: #fff;
				border-radius: 30px;
				transform: scale(0.8,0.8);
				font-size: 122%;
			}
		}
		// #endif
		
	}

</style>
