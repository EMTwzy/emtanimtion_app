<template>
	<view class="historys">
		<uni-row  @longpress="longTap(items)">
			<uni-col :span="5">
				<image :src="items.vodPic!=''?items.vodPic:defaultImage" class="pic"></image>
			</uni-col>
			<uni-col :span="6" class="text">
				{{items.vodName}}
			</uni-col>
			<uni-col :span="5" class="text">
				{{data.obj.vodEpisode}}
			</uni-col>
			<uni-col :span="8" class="text">
				{{data.obj.vodWatchTime}}
			</uni-col>
		</uni-row>
	</view>
	<!-- <uni-popup ref="popup" type="dialog">
		<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
	</uni-popup> -->
</template>

<script setup lang="ts">
	import {defineProps,ref} from 'vue';
	import {onLoad} from '@dcloudio/uni-app';
	
	import hisI from '../../../interface/historyInterface';
	import itemI from '../../../interface/itemInterface';
	//根据id获取番剧信息
	import {selectVideoById,picUtils, deleteHistory} from '../../../api/index';
	//获取时间处理
	import {changeDate} from '../../../utils/time';
	
	const data:hisI=defineProps<{
		obj:hisI
	}>();
	data.obj.vodWatchTime=changeDate(data.obj.vodWatchTime);
	
	//根据id获取番剧信息
	const items:itemI=ref([]);
	async function getVideoInfo(vid){
		let res= await selectVideoById(vid);
		items.value=res;
	}
	//定义默认图片为load加载图
	const defaultImage = ref("../../../static/load.jpg");
	//验证图片是否可以访问 可以访问就会返回该数值 不可访问就直接返回空
	items.vodPic = picUtils(items.vodPic);	
	
	async function delHistory(userId:number,vodPreId:number,vodEpisode:string){
		let res=await deleteHistory(userId,vodPreId,vodEpisode);
		return res;
	}
	/******长按 删除历史记录*****/
	function longTap(e){
		console.log("长按了",e);
		uni.showModal({  
		    title: '是否删除',  
			cancelText:"取消",
			confirmText:"确定",
			confirmColor:"#ce3c39",
		    content: '番剧:'+e.vodName+'\n观看记录:'+data.obj.vodEpisode,  
		    success:res=> {  
		      if (res.confirm) {  
		        let res=delHistory(data.obj.userId,data.obj.vodPreId,data.obj.vodEpisode);
				if(res){
					uni.reLaunch({
						url:'/pages/user/user?current=1'
					})
				}
		      } else if (res.cancel) {  
		        console.log('用户点击取消');  
		      }  
		    }  
		  });  

	}
	
	
	onLoad(()=>{
		getVideoInfo(data.obj.vodPreId);      //根据id获取番剧信息
		//getVideoInfo(2664);      //根据id获取番剧信息
	})
	
</script>

<style lang="less" scoped>
	.historys{
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
