<template>
	<view class="list">
		<!-- 列表内容 -->
		<itemCompontent v-for="item in items" :key="item.vodId" :obj="item" class="item"></itemCompontent>
		<!-- 页数控制器 -->
		<view class="pageController">
			<view class="prePage" @click="pageTo('prePage')">
				上一页
			</view>
			<view class="pageNum">
				{{pageNum}}/{{totalNum}}
			</view>
			<view class="nextPage" @click="pageTo('nextPage')">
				下一页
			</view>
			<view class="runPage">
				<input type="number" v-model="runPage"/>
				<button @click="pageTo('runPage')">GO</button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, computed, watch } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { useAllStore } from '../../../pinia/all';
	//导入接口  视频数据总额、根据条件所查数据总额、
	import { selectVideo, selectVideoNum, totalVideo } from '../../../api/index';
	//导入itemI
	import { itemI } from '../../../interface/itemInterface';
	import itemCompontent from '../../itemCompontent/itemCompontent.vue';


	//当前页数、总页数、指定跳转页数
	const pageNum = ref<number>(1);
	const totalNum = ref<number>();
	const runPage = ref<number>();

	//获取pinia那边传来的数据
	const useAll = useAllStore();
	const publishyear = ref(computed(() => useAll.publishyearSelected));        //获取指定年份数据
	const publishare = ref(computed(() => useAll.publishareSelected));		//获取指定地区
	const lang = ref(computed(() => useAll.langSelected));		//获取指定语种
	const letter = ref(computed(() => useAll.letterSelected));		//获取指定字母
	const options = reactive([
		publishyear,
		lang,
		publishare,
		letter,
		pageNum
	]);

	//初始化展示数据 根据条件
	const items : itemI = ref<Array<string | any>>([]);
	async function initItems() {
		let res:itemI = await selectVideo(lang.value, publishyear.value, publishare.value, letter.value, pageNum.value);
		items.value = res;
	}
	//根据指定条件获取数据总额
	async function initTotalNum() {
		let res:number = await selectVideoNum(lang.value, publishyear.value, publishare.value, letter.value);
		totalNum.value = res%20==0?res/20:Math.ceil(res/20);    //一页20条
	}
	//批量注册watch
	function createWatch(item) {
		watch(item, () => {
			initItems();
			initTotalNum();
		})
	}
	//展示弹窗消息
	function showToast(content) {
		uni.showToast({
			title: content,
			duration: 1500,
			icon:'none',
			//image:'../../../static/toast.jpg'
		})
	}

	//页面上下跳转pageTo
	function pageTo(model) {
		switch (model) {
			case 'prePage':
				if (pageNum.value - 1 == 0)
					showToast("前面是地狱啊");
				else
					pageNum.value--;
				break;
			case 'nextPage':
				if (pageNum.value + 1 > totalNum.value)
					showToast("空气墙似乎是存在的");
				else
					pageNum.value++;
				break;
			case 'runPage':
			console.log("runPage is ",runPage.value);
				if (runPage.value < 1 || runPage.value > totalNum.value)
					showToast("异世界可不是这么好去的");
				else
					pageNum.value = runPage.value;
				runPage.value = null;
				break;
		}
	}

	onLoad(() => {
		initItems();     //初始化展示数据  根据条件
		initTotalNum();  //初始化数据总额  根据条件
		for (let i = 0; i < options.length; i++)
			createWatch(options[i]);
	})
</script>

<style lang="less" scoped>
	.list {
		height: 1200rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-around;
		padding: 15rpx;

		//页数控制器
		.pageController {
			display: flex;
			flex-direction: row;
			align-items: center;
			//页数
			.pageNum,.nextPage{
				margin-left: 20rpx;
			}
			.prePage,.nextPage{
				border:2rpx solid rgba(198, 98, 255, 0.5);;
				padding: 3rpx;
			}
			.runPage {
				display: flex;
				flex-direction: row;
				align-items: center;
				// 输入框
				input {
					width: 60rpx;
					padding: 5rpx;
					border: 1rpx solid #ccc;
					margin-left: 10rpx;
				}
				button{
					margin-left: 10rpx;
					height: 60rpx;
					font-size: 26rpx;
				}
			}
		}
	}
</style>