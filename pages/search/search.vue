<template>
	<!-- 搜索界面 -->
	<view class="search" :class="theme=='dark'?'dark':'light'">
		<!-- 头部组件 -->
		<topCompontent></topCompontent>
		
		<!-- 内容组件 -->
		<searchCompontent style="margin-top: 110rpx;"></searchCompontent>
		
		<!-- 底部组件 -->
		<footerCompontent style="margin-top: 55rpx;"></footerCompontent>
	</view>
</template>

<script setup lang="ts">
	import {ref,defineProps,computed} from 'vue';
	//导入头部组件、底部组件、searchCompontent组件
	import topCompontent from '../../compontents/topCompontent/topCompontent.vue';
	import footerCompontent from '../../compontents/footerCompontent/footerCompontent.vue';
	import searchCompontent from '../../compontents/search/searchCompontent/searchCompontent.vue';
	import {useSettingStore}  from '../../pinia/setting';
	
	const setting=useSettingStore();
	const theme=computed(()=>setting.theme);
	
</script>

<style lang="less" scoped>
	@import '../../theme/theme.less';

</style>
