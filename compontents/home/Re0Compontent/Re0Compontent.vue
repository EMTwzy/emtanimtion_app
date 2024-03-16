<template>
	<view class="reTheme">
		<!-- 标题 -->
		<view class="theme_title">
			Re:ゼロから始める異世界生活
		</view>
		<!-- 内容 -->
		<view class="theme_content">
			<itemCompontent v-for="item in items" :key="item.vodId" class="items" :obj="item"></itemCompontent>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {ref} from 'vue';
	import itemCompontent from '../../itemCompontent/itemCompontent.vue';
	// 根据名称获取模糊数据
	import {selectVideoByName} from '../../../api/index';
	import {itemI} from '../../../interface/itemInterface';
	import {onLoad} from '@dcloudio/uni-app';
	
	const items:itemI=ref<Array<string|any>>([]);
	async function getItems(){
		let res:itemI=await selectVideoByName("从零开始的异世界生活");
		items.value=res;
	}
	onLoad(()=>{
		getItems();
	})
	
	
</script>

<style lang="less" scoped>
	.reTheme{
		width: 86%;
		margin: 0 auto;
		border:1rpx solid #ccc;
		padding: 5rpx;
		// 标题
		.theme_title{
			width: 100%;
			color: rgba(198, 98, 255, 0.8);
		}
		// 内容
		.theme_content{
			display: flex;
			flex-wrap: wrap;
			justify-items: center;
			align-items: center;
			.items{
				margin: 5rpx;
			}
		}
	}
</style>
