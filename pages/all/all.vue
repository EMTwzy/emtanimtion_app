<template>
	<view class="all" :class="theme=='dark'?'dark':'light'">
		<!-- 头部 -->
		<topCompontent></topCompontent>
		<!-- 内容区 -->
		<!-- tags -->
		<tagsCompontent class="alltop"></tagsCompontent>
		<!-- list -->
		<listCompontent class="alltop"></listCompontent>
		<!-- 底部 -->
		<footerCompontent></footerCompontent>
	</view>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { onShow } from '@dcloudio/uni-app';
	// 导入头部和底部组件
	import topCompontent from '../../compontents/topCompontent/topCompontent.vue';
	import footerCompontent from '../../compontents/footerCompontent/footerCompontent.vue';
	//导入tags模块、list模块
	import tagsCompontent from '../../compontents/all/tagsCompontent/tagsCompontent.vue';
	import listCompontent from '../../compontents/all/listCompontent/listCompontent.vue';
	//导入setting
	import { useSettingStore } from '../../pinia/setting';

	//获取主题
	const setting = useSettingStore();
	const theme = computed(() => setting.theme);
	uni.setTabBarStyle({
		backgroundColor: theme.value == 'dark' ? '#000000' : '#DCDFE6',
		color: theme.value == 'dark' ? '#ccc' : '#000000'
	});


	onShow(() => {
		uni.setTabBarStyle({
			backgroundColor: theme.value == 'dark' ? '#000000' : '#DCDFE6',
			color: theme.value == 'dark' ? '#ccc' : '#000000'
		});
	})
</script>

<style lang="less" scoped>
	@import '../../theme/theme.less';

	@alltop: 110rpx;

	.all {

		.alltop {
			margin-top: @alltop;
			border: 1rpx solid #ccc;
		}
	}
</style>