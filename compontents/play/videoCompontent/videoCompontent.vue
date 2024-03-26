<template>
	<view class="videoCompontent">
		<video :src="videoPlay" frameborder="0" autoplay :title='selectEpisode' class="video"></video>
	</view>
</template>

<script setup lang="ts">
	import {computed} from 'vue';
	import {onLoad} from '@dcloudio/uni-app';
	import {usePlayStore} from '../../../pinia/play';
	
	const playStore=usePlayStore();
	const videoPlay=computed(()=>playStore.selectVideo);//测试用/'https://v.cdnlz14.com/20231022/30821_dea009bc/index.m3u8';
	const selectEpisode=playStore.selectEpisode;
	
</script>

<style lang="less" scoped>
	.videoCompontent{
		margin-top: 110rpx;
		width: 100%;
		height: 500rpx;
		.video{
			width: 100%;		
			height: 500rpx;
		}
	}
</style>
