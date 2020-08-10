<template>
	<view class="content">
		<view class="swiper-content">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in goods.details[0].swipers" :key="index">
					<view class="swiper-item uni-bg-red">
						<image :src="item" />
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="text">
			<text class="title">
				{{goods.details[0].Ename}}
			</text>
			<view>
				<text class="name">{{goods.Name}}</text>
			</view>
			<text class="price">
				￥{{goods.Price}}
			</text>
			<view class="desc" v-for="(item,index) in goods.details[0].Describe" :key="index">
				{{item}}
			</view>
		</view>
		<view class="imgs" v-for="(item,index) in goods.details[0].ImgUrls" :key="index">
			<image :src="item" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods:[]
			}
		},
		onLoad(e) {
			this.goods=this.$store.state.goods[e.index];
			console.log(this.goods);
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.swiper-content{
			width: 100%;
			image{
				width: 100%;
			}
		}
		.text{
			.title{
				font-size: 21px;
				font-weight: bold;
			}
			.price{
				color: #ffaa00;
				font-size: 18px;
			}
		}
		.imgs{
			width: 100%;
			image{
				width: 100%;
			}
		}
	}

</style>
