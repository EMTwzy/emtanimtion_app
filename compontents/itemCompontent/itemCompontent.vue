<template>
	<view class="item">
		<image :src="data.obj.vodPic!=''?data.obj.vodPic:defaultImage" @click="trunTo(data.obj.vodId)"></image>
		<uni-badge size="small" :text="todayIs?'new':''" absolute="leftTop" type="primary">
			<view class="vodName">{{data.obj.vodName}}</view>
		</uni-badge>
	</view>
</template>

<script setup lang="ts">
	import { defineProps, ref } from 'vue';
	import itemI from '../../interface/itemInterface/itemInterface';
	import { picUtils } from '../../api/index.ts';
	import { IsToday } from '../../utils/time';
	import {onLoad} from '@dcloudio/uni-app';

	//使用iteminterface来对接收的数据进行限制
	const data : itemI = defineProps<{
		obj : itemI;
	}>();
	//定义默认图片为load加载图
	const defaultImage = ref("../../static/load.jpg");
	//验证图片是否可以访问 可以访问就会返回该数值 不可访问就直接返回空
	data.vodPic = picUtils(data.vodPic);

	//是否是今日更新的番剧
	const todayIs = ref<boolean>(IsToday(data.obj.vodAddtime));

	function trunTo(vodId) {
		console.log("番剧项目这边指定的id",vodId);
		uni.navigateTo({
			url:'/pages/play/play?vodId='+vodId
		})
	}
	
	//一加载就向list传数据
	onLoad(()=>{
		
	})
</script>

<style lang="less" scoped>
	.item {
		display: flex;
		flex-direction: column; //垂直
		align-items: center;
		justify-content: space-between;
		width: 150rpx;
		height: 210rpx;
		border: 1rpx solid #ccc;
		box-sizing: border-box;

		image {
			flex: 1;
			/* 占据大部分空间 */
			width: 100%;
			height: 180rpx;
			/* 高度自动，保持图片比例 */
			object-fit: cover;
			/* 确保图片填满整个容器 */
		}

		.vodName {
			width: 150rpx;
			height: 20px;
			overflow: auto;
			/* 防止文本换行 */
			font-size: 15rpx;
			text-align: center;
			/* 文字居中 */
			margin-top: 10rpx;
			/* 稍微与图片隔开一些 */
		}
	}
</style>