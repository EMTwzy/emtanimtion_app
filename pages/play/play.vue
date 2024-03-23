<template>
	<view class="play" :class="theme=='dark'?'dark':'light'">
		<!-- 头部组件 -->
		<topCompontent></topCompontent>
		
		<!-- 视频组件 -->
		<videoCompontent></videoCompontent>
		<!-- 集数组件 -->
		<episodeCompontent></episodeCompontent>
		
		<!-- 尾部组件 -->
		<footerCompontent></footerCompontent>
	</view>
</template>

<script setup lang="ts">
	import {computed} from 'vue';
	import {onLoad} from '@dcloudio/uni-app';
	//导入头部、尾部组件
	import topCompontent from '../../compontents/topCompontent/topCompontent.vue';
	import footerCompontent from '../../compontents/footerCompontent/footerCompontent.vue';
	//导入setting 设置主题
	import {useSettingStore} from '../../pinia/setting';
	import {usePlayStore} from '../../pinia/play';
	import {useUserStore} from '../../pinia/user';
	//导入itemI
	import itemI from '../../interface/itemInterface';
	//导入 根据id获取视频信息、播放数据、视频集数
	import {selectVideoById,getPlay,getScore} from '../../api/index';
	//导入视频组件
	import videoCompontent from '../../compontents/play/videoCompontent/videoCompontent.vue';
	import episodeCompontent from '../../compontents/play/episodeCompontent/episodeCompontent.vue';
	
	
	const settingStore=useSettingStore();
	const theme=computed(()=>settingStore.theme);              //主题
	
	const userStore=useUserStore();
	const playStore=usePlayStore();			//播放pinia

	//进行数据初始化
	async function getVideo(vodId:number){
		let res:itemI=await selectVideoById(vodId);		//获取番剧信息
		playStore.videoInfo=res;
		
		let res2=await getPlay(vodId);		//获取播放数据
		playStore.videoList=res2;
		
		let res3=await getScore(vodId);		//获取集数
		playStore.episodeList=res3;
		
		console.log("播放这边接收到的数据为",playStore.videoInfo,"\n播放数据为",playStore.videoList,"\n集数组为",playStore.episodeList);
	}
	
	onLoad((param)=>{
		getVideo(param.vodId).then(()=>{
			playStore.initInformation(userStore.userId);
		});
	})
	
</script>

<style lang="less" scoped>
	//导入主题样式
	@import  '../../theme/theme.less';
	
</style>
