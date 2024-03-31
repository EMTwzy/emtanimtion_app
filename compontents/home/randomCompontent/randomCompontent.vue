<template>
	<view class="random">
		<!-- 标题 -->
		<uni-row class="demo-uni-row random_title">
			<uni-col :span="5">
				<text>随机推荐</text>
			</uni-col>
			<uni-col :span="14">
				&nbsp;
			</uni-col>
			<uni-col :span="5">
				<text>&nbsp;</text>
			</uni-col>
		</uni-row>
		<!-- 内容 -->
		<view class="random_content">
			<itemCompontent v-for="item in items" :key="item.vodId" :obj="item" class="items"></itemCompontent>
		</view>
	</view>
</template>

<script setup lang="ts">
	// 导入模块组件
	import itemCompontent from '../../itemCompontent/itemCompontent.vue';
	// 导入随机推荐接口
	import { randomVideo } from '../../../api/index';
	//导入interface
	import { itemI } from '../../../interface/itemInterface/itemInterface';
	// 导入ref
	import { ref } from 'vue';
	//导入onLoad
	import { onLoad } from '@dcloudio/uni-app';

	const items=ref<Array<string|any>>([]);
	async function getRandom() {
		let random = await randomVideo();
		items.value=random;
		console.log("随机", random);
	}
	onLoad(() => {
		getRandom();
	})
</script>

<style lang="less" scoped>
	.random {
		border: 1rpx solid #ccc;
		width: 86%;
		padding: 5rpx;
		margin: 0 auto;
		// 标题栏
		.random_title {
			text-align: center;
			font-style: initial;
		}

		// 随机内容
		.random_content {
			margin-top: 10rpx;
			width: 100%;
			display: flex;
			justify-items: center;
			align-content: center;
			flex-direction: row;
			flex-wrap: wrap;
			.items{
				margin: 5rpx;
			}
		}
	}
</style>