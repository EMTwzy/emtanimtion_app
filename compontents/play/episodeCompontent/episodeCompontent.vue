<template>
	<view class="episode">
		<!-- 集数控制区 -->
		<view class="episodeTop">
			<uni-row>
				<uni-col :span="7" class="preEpisode" @click="episodeRun('上一集')">
					上一集
				</uni-col>
				<uni-col :span="10" class="nowEpisode">
					正在播放:{{selectEpisode}}
				</uni-col>
				<uni-col :span="7" class="nextEpisode" @click="episodeRun('下一集')">
					下一集
				</uni-col>
			</uni-row>
		</view>

		<!-- 集数列表 -->
		<swiper class="episodeList swiper" display-multiple-items="5" :current="index" :autoplay="false"  :circular="false">
			<swiper-item v-for="item in episodeList" :key="item" class="episodeOne" 
			:class="{selected:selectEpisode==item}"
			@click="select(item)">
				{{item}}
			</swiper-item>
		</swiper>
	</view>

</template>

<script setup lang="ts">
	import { computed } from 'vue';

	import { usePlayStore } from '../../../pinia/play';

	const playStore = usePlayStore();


	const episodeList = computed(() => playStore.episodeList);  //集数组
	const selectEpisode = computed(() => playStore.selectEpisode);  //选择的集数
	const index=computed(()=>playStore.episodeList.indexOf(playStore.selectEpisode));

	//集数控制器
	function episodeRun(options) {
		playStore.selectWatch(options);
	}
	
	function select(item){
		playStore.select(item);
	}
</script>

<style lang="less" scoped>
	.episode {
		width: 100%;
		height: 60rpx;
		.episodeTop {
			text-align: center;
			margin-top: 10rpx;
		}

		// 集数列表
		.episodeList {
			margin-top: 10rpx;
			height: 50rpx;
			padding: 10rpx;
			border: 1rpx solid #ccc;
			.episodeOne {
				width: 20%;
				text-align: center;
			}
			.selected{
				color:#6a99ff;
			}
		}
	}
</style>