<template>
	<view class="content" :class="theme=='dark'?'dark':'light'">
		<!-- 头部导航栏 -->
		<topCompontent></topCompontent>
		<!-- 主要内容区 -->
		<!-- 每周更新内容 -->
		<weekCompontent></weekCompontent>


		<!-- 底部 -->
		<footerCompontent></footerCompontent>
	</view>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	//获取头部模块
	import topCompontent from '../../compontents/topCompontent/topCompontent.vue';
	//获取底部模块
	import footerCompontent from '../../compontents/footerCompontent/footerCompontent.vue';
	//获取番剧模块
	import itemCompontent from '../../compontents/itemCompontent/itemCompontent.vue';
	//获取本周更新模块
	import weekCompontent from '../../compontents/weekCompontent/weekCompontent.vue';
	//获取系统设计参数
	import { useSettingStore } from '../../pinia/setting';
	
	
	//全局主题样式
	const set = useSettingStore();
	const theme = computed(() => set.theme);
	
</script>

<style lang="less" scoped>
	@import '../../theme/theme.less';

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		// // 每周更新内容
		// .week{
		// 	width: 86%;
		// 	margin-top: 110rpx;
		// 	z-index: 2;
		// 	border: 1rpx solid #ccc;
		// 	padding: 5rpx;
		// 	//日期列表
		// 	.days{
		// 		// 具体的日期
		// 		.day{
		// 			font-size: 32rpx;
		// 			text-align: center;
		// 			// border: 1rpx solid #ccc;
		// 			// padding: 15rpx;					
		// 		}
		// 		//被选中的日期
		// 		.daySelected{
		// 			// border: none;
		// 			color: slateblue;
		// 		}
		// 	}
		// 	// 指定星期数更新的内容
		// 	.weekContent{
		// 		margin-top: 10rpx;
		// 		width: 100%;
		// 		display: flex;
		// 		justify-items: center;
		// 		align-content: center;
		// 		flex-direction: row;
		// 		flex-wrap: wrap;
		// 		.itemContent{
		// 			margin: 5rpx;
		// 		}
		// 	}
		// 	//没有内容
		// 	.noItems{
		// 		margin: 0 auto;
		// 		text-align: center;
		// 	}
		// }
	}

</style>