<template>
	<view class="week">
		<!-- 星期数 -->
		<uni-row class="demo-uni-row days">
			<uni-col :span="3" v-for="item in dayInit" :key="item" push="2"  class="day"
			:class="{'daySelected':item==daySelect}"
			@click="selectDay(item)">
				{{item}}
			</uni-col>
		</uni-row>
		<!-- 内容 -->
		<view class="weekContent" v-if="items.length>0">
			<itemCompontent v-for="item in items" :key="item" :obj="item" class="itemContent"></itemCompontent>
		</view>
		<view class="noItems" v-else-if="items.length<1">
			还没有内容哦
		</view>
	</view>
</template>

<script setup lang="ts">
	import {ref} from 'vue';
	import {today} from '../../../api/index';
	import {onLoad} from '@dcloudio/uni-app';
	import {itemI} from '../../../interface/itemInterface/itemInterface';
	import {getToday} from '../../../utils/time';
	import itemCompontent from '../../itemCompontent/itemCompontent';
	
	//星期数
	const dayInit=['周一','周二','周三','周四','周五','周六','周日'];
	const daySelect=ref<string>('');
	//默认展示今天的数据
	daySelect.value=dayInit[getToday()];
	function selectDay(day:string){
		console.log("selectDay :",day);
		daySelect.value=day;
		//选择完星期数后就展示指定日期数据
		getTodyData();
	}
	
	//保存获取来的数据
	const items:itemI = ref<Array<string|any>>([]);
	//获取今日数据
	async function getTodyData(){ 
		items.value.splice(0, items.value.length);  
		let res=await today(dayInit.indexOf(daySelect.value)+1);
		items.value=res;
	}
	
	onLoad(()=>{
		//一进入当前界面就展示今天的番剧内容
		console.log("weekDay");
		getTodyData();
	})
</script>

<style lang="less" scoped>
	// 每周更新内容
	.week{
		width: 86%;
		margin-top: 110rpx;
		z-index: 2;
		border: 1rpx solid #ccc;
		padding: 5rpx;
		//日期列表
		.days{
			// 具体的日期
			.day{
				font-size: 32rpx;
				text-align: center;
				// border: 1rpx solid #ccc;
				// padding: 15rpx;					
			}
			//被选中的日期
			.daySelected{
				// border: none;
				color: slateblue;
			}
		}
		// 指定星期数更新的内容
		.weekContent{
			margin-top: 10rpx;
			width: 100%;
			display: flex;
			justify-items: center;
			align-content: center;
			flex-direction: row;
			flex-wrap: wrap;
			.itemContent{
				margin: 5rpx;
			}
		}
		//没有内容
		.noItems{
			margin: 0 auto;
			text-align: center;
		}
	}
</style>
