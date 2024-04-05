<template>
	<topBarCompontent></topBarCompontent>
	<!-- 搜索界面 -->
	<view class="search" :class="theme=='dark'?'dark':'light'">
		<!-- 头部组件 -->
		<topCompontent class="allTop"></topCompontent>
		
		<!-- 内容组件 -->
		<view class="content allTop">
		<searchCompontent></searchCompontent>
		</view>
		
		<!-- 底部组件 -->
		<footerCompontent class="allTop"></footerCompontent>
	</view>
</template>

<script setup lang="ts">
	import {ref,defineProps,computed} from 'vue';
	//导入头部组件、底部组件、searchCompontent组件
	import topCompontent from '../../compontents/topCompontent/topCompontent.vue';
	import footerCompontent from '../../compontents/footerCompontent/footerCompontent.vue';
	import searchCompontent from '../../compontents/search/searchCompontent/searchCompontent.vue';
	import topBarCompontent from '../../compontents/topCompontent/topBarCompontent.vue';
	import {useSettingStore}  from '../../pinia/setting';
	
	const setting=useSettingStore();
	const theme=computed(()=>setting.theme);
	uni.setTabBarStyle({
		backgroundColor:theme.value=='dark'?'#000000':'#DCDFE6',
		color:theme.value=='dark'?'#ccc':'#000000'
	});
	
</script>

<style lang="less" scoped>
	@import '../../theme/theme.less';
	.search{
		
		.allTop{
			margin-top: 60rpx;
		}
		.content{
			margin-top: 110rpx;
		}
	}

</style>
