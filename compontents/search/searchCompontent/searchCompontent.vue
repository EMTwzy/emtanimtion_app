<template>
	<view class="searchList">
		<!-- 结果描述 -->
		<view class="search_des">
			{{name}} 的搜索结果为(共{{total}}条数据):
		</view>
		<view class="search_list">
			<itemCompontent v-for="item in items" :key="item.vodId" :obj="item" class="item"></itemCompontent>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, defineProps } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	// 根据名称获取数据
	import { selectVideoByName } from '../../../api/index';
	//itemI
	import itemI from '../../../interface/itemInterface';
	//导入itemCompontent组件
	import itemCompontent from '../../itemCompontent/itemCompontent.vue';

	//查询数据
	const items : itemI = ref<Array<string | any>>([]);
	const total = ref<number>(0);
	async function getItems() {
		const res = await selectVideoByName(name.value);
		items.value = res;
		total.value=res.length;
		console.log("获取到的数据总额：",total.value);
	}

	const name = ref<string>('');
	onLoad((props) => {
		//接收数据
		name.value = props.name;
		getItems();

	})
</script>

<style lang="less" scoped>
	//列表

	.searchList {
		width: 95%;
		height: 1000rpx;
		margin: 0 auto;
		overflow: auto;
		border:2rpx solid #ccc;
		// 结果描述
		.search_des {
			width: 100%;
			margin-left: 150rpx;
			margin-top: 10rpx;
		}
		//结果
		.search_list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			.item {
				margin: 12rpx;
			}
		}

	}
</style>