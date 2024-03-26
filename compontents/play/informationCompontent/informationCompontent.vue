<template>
	<view class="information">
		<!-- 图片 -->
		<view class="pic">
			<image :src="content.vodPic" ></image>
		</view>
		<!-- 番剧描述/简介 -->
		<view class="description">
			<!-- 追番 -->
			<view class="subscribe">
				<uni-icons :type="sub?'heart-filled':'heart'" @click="subscribe" color="red">追番</uni-icons>
				<!-- <view class="heart" :class="{onSub:sub?true:false}" ></view> -->
			</view>
			<p>{{content.vodName}}</p>
			<p>上次更新：{{content.vodAddtime}}</p>
			<p>上映时间：{{content.vodYear}}</p>
			<view class="content">
				简介：{{content.vodContent}}
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {computed} from 'vue';
	import {onLoad} from '@dcloudio/uni-app';
	//导入 根据id获取番剧信息 获取追番数据 确认追番 取消追番 当前是否有历史记录 添加历史记录
	import {selectVideoById,isSubscribe,addSubscribe,deleteSubscribe,addHistory, selectHistory} from '../../../api/index'
	//导入itemI
	import {itemI} from '../../../interface/itemInterface';
	//导入play、user pinia
	import {usePlayStore} from '../../../pinia/play';
	import {useUserStore} from '../../../pinia/user';
	//导入时间的utils方法
	import {nowTime,changeDate} from '../../../utils/time';
	//导入字符串处理utils
	import {strFilter} from '../../../utils/strFilter';
	
	//获取user
	const userStore=useUserStore();
	
	//获取play
	const playStore=usePlayStore();
	//初始化介绍数据
	const content:itemI=computed(()=>playStore.videoInfo);
	async function getInformation(vid){
		let res:itemI=await selectVideoById(vid);
		res.vodAddtime=changeDate(res.vodAddtime);
		res.vodContent=strFilter(res.vodContent);
		playStore.videoInfo=res;
	}
	
	//初始化追番数据
	const sub=computed(()=>playStore.isSubscribe);
	async function getSubscribe(userId:number,userSubId:number){
		let res:boolean=await isSubscribe(userId,userSubId);
		playStore.isSubscribe=res;
	}
	//取消追番
	async function deleteSub(userId:number,userSubId:number){
		let res=await deleteSubscribe(userId,userSubId);
		if(res){
			uni.showToast({
				title:"再烂都不要弃啊(笑",
				icon:'none',
			})
		}
		
	}
	//添加追番
	async function addSub(userId:number,userSubId:number){
		let res=await addSubscribe(userId,userSubId);
		if(res){
			uni.showToast({
				title:"自己追的番跪着也要看完哦",
				icon:'none',
			})
		}
	}
	
	//当前是否存在历史记录 不存在就添加
	async function isHistory(userId:number,vodPerId:number,vodEpisode:string,vodWatchTime:number){
		let res=await selectHistory(userId,vodPerId,vodEpisode);
		if(!res)
		await addHistory(userId,vodPerId,vodEpisode,vodWatchTime);
	}
	
	//追番
	function subscribe(){
		//测试使用 测试无误	3/25
		//playStore.isSubscribe=!playStore.isSubscribe;
		
		//如果没有登陆
		if(userStore.userId==0){
			uni.showToast({
				title:"先登录再追番哦",
				icon:'none'
			})
		}else{
			if(sub){
				deleteSub(userStore.userId,content.vodId);
				playStore.isSubscribe=false;
			}else{
				addSub(userStore.userId,content.vodId);
				playStore.isSubscribe=true;
			}
		}
		
	}
	
	onLoad((param)=>{
		getInformation(param.vodId);
		//登陆了
		if(userStore.userId!=0){
			getSubscribe(userStore.userId,content.vodId);    //追番的
			isHistory(userStore.userId,content.vodId,playStore.selectEpisode,nowTime());    //历史记录的
		}
	})
	
	
</script>

<style lang="less" scoped>
	
	.information{
		width: 100%;
		height: 400rpx;

		//封面
		.pic{
			width: 25%;
			height: 230rpx;
			float: left;
			//margin-left: 10rpx;
			margin-top: 50rpx;
			image{
			width: 160rpx;
			height: 230rpx;
			}
		}
		// 描述
		.description{
			width: 75%;
			float: left;
			//margin-left: 5rpx;
			margin-top: 10rpx;
			// 追番
			.subscribe{
				float: right;
			}
			p{
				margin-top: 15rpx;
			}
			// 简介
			.content{
				height: 100rpx;
				overflow-y: auto;
			}
		}
	}
</style>
