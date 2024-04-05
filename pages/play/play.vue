<template>
	<topBarCompontent></topBarCompontent>
	<view class="play" :class="theme=='dark'?'dark':'light'">
		<!-- 头部组件 -->
		<topCompontent></topCompontent>
		
		<!-- 视频组件 -->
		<videoCompontent></videoCompontent>
		<!-- 集数组件 -->
		<episodeCompontent style="margin-top: 30rpx;"></episodeCompontent>
		<!-- 番剧信息组件 -->
		<informationCompontent style="margin-top: 150rpx;"></informationCompontent>
		
		<!-- 尾部组件 -->
		<footerCompontent style="margin-top: 20rpx;"></footerCompontent>
	</view>
</template>

<script setup lang="ts">
	import {computed} from 'vue';
	import {onLoad,onUnload,onBackPress} from '@dcloudio/uni-app';
	//导入头部、尾部组件
	import topCompontent from '../../compontents/topCompontent/topCompontent.vue';
	import footerCompontent from '../../compontents/footerCompontent/footerCompontent.vue';
	import topBarCompontent from '../../compontents/topCompontent/topBarCompontent.vue';
	//导入setting 设置主题
	import {useSettingStore} from '../../pinia/setting';
	import {usePlayStore} from '../../pinia/play';
	import {useUserStore} from '../../pinia/user';
	//导入itemI
	import itemI from '../../interface/itemInterface';
	//导入 根据id获取视频信息、播放数据、视频集数
	import {selectVideoById,getPlay,getScore} from '../../api/index';
	//导入视频组件 集数控制组件 番剧信息组件
	import videoCompontent from '../../compontents/play/videoCompontent/videoCompontent.vue';
	import episodeCompontent from '../../compontents/play/episodeCompontent/episodeCompontent.vue';
	import informationCompontent from '../../compontents/play/informationCompontent/informationCompontent.vue';
	
	
	const settingStore=useSettingStore();
	const theme=computed(()=>settingStore.theme);              //主题
	uni.setTabBarStyle({
		backgroundColor:theme.value=='dark'?'#000000':'#DCDFE6',
		color:theme.value=='dark'?'#ccc':'#000000'
	});
	
	const userStore=useUserStore();
	const playStore=usePlayStore();			//播放pinia

	//进行数据初始化
	async function getVideo(vodId:number){
		let res:itemI=await selectVideoById(vodId);		//获取番剧信息
		playStore.videoInfo=res;
		
		let res2=await getPlay(vodId,1);		//获取播放数据
		playStore.videoList=res2;
		
		let res3=await getScore(vodId,1);		//获取集数
		playStore.episodeList=res3;
		
		console.log("播放这边接收到的数据为",playStore.videoInfo,"\n播放数据为",playStore.videoList,"\n集数组为",playStore.episodeList);
	}
	
	//页面挂载
	onLoad((param)=>{
		getVideo(param.vodId).then(()=>{
			playStore.initInformation(userStore.userId);
		});
	});
	
	//初始化数据，将数据进行格式化操作
	function initPlayStore(){
		playStore.episodeList=[];
		playStore.videoInfo='';
		playStore.videoList=[];
		playStore.selectEpisode='';
		playStore.selectVideo='';
	}
	
	//页面卸载
	onUnload(()=>{
		initPlayStore();
	});
	//页面返回
	onBackPress(()=>{
		initPlayStore();
	});
	
</script>

<style lang="less" scoped>
	//导入主题样式
	@import  '../../theme/theme.less';
	.play{
		margin-top: 80rpx;
	}
</style>
