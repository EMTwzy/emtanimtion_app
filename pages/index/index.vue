<template>
	<topBarCompontent></topBarCompontent>
	<view class="content" :class="theme=='dark'?'dark':'light'">
		<!-- 头部导航栏 -->
		<topCompontent class="alltop"></topCompontent>
		<!-- 主要内容区 -->
		<!-- 每周更新内容 -->
		<weekCompontent class="alltop"></weekCompontent>
		<!-- 随机推荐 -->
		<randomCompontent class="alltop"></randomCompontent>
		<!-- 从零主题 -->
		<re0Compontent class="alltop"></re0Compontent>
		<!-- 底部 -->
		<footerCompontent class="alltop"></footerCompontent>
		
		<!-- 软件版本更新 -->
		<wrap-version-update id="533159022497861" @check="handleCheck"></wrap-version-update>
		
	</view>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	//版本更新
	import WrapVersionUpdate from '@/uni_modules/wrap-version-update/components/wrap-version-update/wrap-version-update.nvue';
	
	//获取头部模块、标题栏空位、底部模块
	import topCompontent from '../../compontents/topCompontent/topCompontent.vue';
	import footerCompontent from '../../compontents/footerCompontent/footerCompontent.vue';
	import topBarCompontent from '../../compontents/topCompontent/topBarCompontent.vue';
	//获取本周更新模块、随机推荐模块、主题模块
	import weekCompontent from '../../compontents/home/weekCompontent/weekCompontent.vue';
	import randomCompontent from '../../compontents/home/randomCompontent/randomCompontent.vue';
	import re0Compontent from '../../compontents/home/Re0Compontent/Re0Compontent.vue';
	//获取系统设计参数
	import { useSettingStore } from '../../pinia/setting';
	import { onPullDownRefresh ,onLoad,onShow} from '@dcloudio/uni-app';
	
	import { useUserStore } from '../../pinia/user';


	//全局主题样式
	const set = useSettingStore();
	const theme = computed(() => set.theme);
	uni.setTabBarStyle({
		backgroundColor:theme.value=='dark'?'#000000':'#DCDFE6',
		color:theme.value=='dark'?'#ccc':'#000000'
	})
	
	//	调用user pinia 进行数据初始化
	

	onLoad(()=>{
		const useUser=useUserStore();
		useUser.initUserId();
		useUser.initUserName();
		useUser.initUserInformation();
		

	})
	
	//设置底部菜单栏样式
	onShow(()=>{
		uni.setTabBarStyle({
			backgroundColor: theme.value == 'dark' ? '#000000' : '#DCDFE6',
			color: theme.value == 'dark' ? '#ccc' : '#000000'
		});
		
		
	})

	//允许下拉刷新
	onPullDownRefresh(() => {
		//进行下拉刷新0.5s后的重新进入index界面
		setTimeout(() => {
			uni.reLaunch({
				url: '/pages/index/index'
			});
			uni.stopPullDownRefresh(); // 停止下拉刷新动画
		}, 500);
	});
	
	//更新
	function handleCheck(e){
		if(e.needUpdate){
			uni.hideTabBar();
		}
	}
</script>

<style lang="less" scoped>
	@import '../../theme/theme.less';

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.alltop {
			margin-top: 70rpx;
		}
	}
</style>