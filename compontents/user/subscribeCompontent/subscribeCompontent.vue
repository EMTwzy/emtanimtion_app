<template>
	<view class="subscribes">
		<uni-row  @click="trunTo">
			<uni-col :span="5">
				<image :src="items.vodPic!=''?items.vodPic:defaultImage" class="pic"></image>
			</uni-col>
			<uni-col :span="10" class="text">
				{{items.vodName}}
			</uni-col>
			<uni-col :span="9" class="text">
				上次更新:{{items.vodAddtime}}
			</uni-col>
		</uni-row>
	</view>
</template>

<script setup lang="ts">
	import {defineProps,ref} from 'vue';
	import {onLoad} from '@dcloudio/uni-app';
	
	import hisI from '../../../interface/historyInterface';
	import itemI from '../../../interface/itemInterface';
	//根据id获取番剧信息
	import {selectVideoById,picUtils} from '../../../api/index';
	//获取时间处理
	import {changeDate} from '../../../utils/time';
	
	const data:hisI=defineProps<{
		obj:hisI
	}>();
	
	//根据id获取番剧信息
	const items:itemI=ref([]);
	async function getVideoInfo(vid){
		let res= await selectVideoById(vid);
		res.vodAddtime=changeDate(res.vodAddtime);
		items.value=res;
	}
	//定义默认图片为load加载图
	const defaultImage = ref("../../../static/load.jpg");
	//验证图片是否可以访问 可以访问就会返回该数值 不可访问就直接返回空
	items.vodPic = picUtils(items.vodPic);	
	
	
	/*******跳转播放*******/
	function trunTo(){
		//需要使用的是items.value.vodId，定义的时候items是一个对象，对象里再套一对象
		//console.log("sub这边的vodId到底有没有",items.value.vodId);
		uni.navigateTo({
			url:'/pages/play/play?vodId='+items.value.vodId
		})
	}
	
	
	onLoad(()=>{
		getVideoInfo(data.obj.userSubId);      //根据id获取番剧信息
	})
</script>

<style lang="less" scoped>
	.subscribes{
		border-top: 1rpx solid #ccc;
		border-bottom: 1rpx solid #ccc;
		padding: 10rpx;
		height: 80rpx;
		font-size: 20rpx;
		.pic{
			width: 60rpx;
			height: 80rpx;
			// width: 150rpx;
			// height: 190rpx;
		}
		.text{
			text-align: center;
			margin-top: 20rpx;
			overflow-x: auto;
		}
	}
</style>
