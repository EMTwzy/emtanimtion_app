<template>
	<view class="topCompontent">
		<uni-row class="titleBar">
			<uni-col span="7">
				<image src="../../static/emilia.png" mode="aspectFit"></image>
			</uni-col>
			<uni-col span="11"><input placeholder="来找一部好番吧~" bgColor="#EEEEEE" @confirm="search" /></uni-col>
			<uni-col span="6"><text class="titleContent" @click="goHome">EMT动漫</text></uni-col>
		</uni-row>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	// 查询
	function search(e) {
		uni.navigateTo({
			url:'/pages/search/search?name='+e.detail.value
		})
	}
	// 回首页
	function goHome(){
		uni.reLaunch({
			url:'/pages/index/index'
		})
	}
</script>

<style lang="less" scoped>
	.topCompontent {
		// 头部标题栏
		padding: 50rpx 0;
		width: 100%;
		overflow-block: none;
		.titleBar {
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			// 图片
			image {
				width: 200rpx;
				position: relative;
				top: 59rpx;
				overflow: hidden;
				z-index: 1;
			}
			// 标题
			.titleContent {
				font-size: 40rpx;
				color: rgba(170, 85, 255, 0.5);
				font-style: italic;
				font-weight: bold;
				box-shadow: 1rpx rebeccapurple;
			}
			//输入框
			input{
				width: 300rpx;
				padding: 10rpx;
				border: 1rpx solid rgba(170, 85, 255, 0.5);
				border-radius: 10%;
			}
		}
	}
</style>