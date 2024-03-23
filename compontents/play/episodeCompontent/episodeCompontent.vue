<template>
	<view class="episode">
		<view class="episodeTop">
			<uni-row>
				<uni-col :span="5" class="preEpisode" @click="episodeRun('上一集')">
					上一集
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col :span="14"  class="nowEpisode">
					正在播放:{{selectEpisode}}
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col :span="5" class="nextEpisode" @click="episodeRun('下一集')">
					下一集
				</uni-col>
			</uni-row>
				

		</view>
	</view>
	
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	import { usePlayStore } from '../../../pinia/play';
	import {useUserStore} from '../../../pinia/user';

	const playStore = usePlayStore();


	const episodeList = computed(() => playStore.episodeList);  //集数组
	const selectEpisode = computed(() => playStore.selectEpisode);  //选择的集数
	
	
	
	function episodeRun(options){
		playStore.selectWatch(options);
	}

	
</script>

<style lang="less" scoped>
	.episode {
		width: 100%;
		.episodeTop{
			text-align: center;
		}
	}
</style>