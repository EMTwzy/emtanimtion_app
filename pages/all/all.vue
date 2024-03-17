<template>
	<view class="all">
		<!-- 头部 -->
		<topCompontent></topCompontent>
		<!-- 内容区 -->
		<tagsCompontent class="alltop"></tagsCompontent>
		<!-- 底部 -->
		<footerCompontent></footerCompontent>
	</view>
</template>

<script setup lang="ts">
	import {ref} from 'vue';
	import {onLoad} from '@dcloudio/uni-app';
	// 导入头部和底部组件
	import topCompontent from '../../compontents/topCompontent/topCompontent.vue';
	import footerCompontent from '../../compontents/footerCompontent/footerCompontent.vue';
	//导入item组件
	import itemCompontent from '../../compontents/itemCompontent/itemCompontent.vue';
	//导入视频总数、指定条件的数据、指定条件的数据总额
	import {totalVideo,selectVideo,selectVideoNum} from '../../api/index';
	//导入interface
	import {itemI} from '../../interface/itemInterface';
	//导入tags模块
	import tagsCompontent from '../../compontents/all/tagsCompontent/tagsCompontent.vue';
	
	//记录数据总量
	const total=ref<number>(0);
	async function getTotalVideo(){
		total.value=await totalVideo();
	}
	onLoad(()=>{
		//页面一加载就获取默认状态下的所有数据总额
		getTotalVideo();
	})
	
</script>

<style lang="less" scoped>
	@alltop:110rpx;
	
	.all{
		
		.alltop{
			margin-top: @alltop;
			border: 1rpx solid #ccc;
		}
	}
</style>
