<template>
	<view class="allContent">
		<!-- tag标签区 -->
		<view class="tags">
			<!-- 年份 -->
			<uni-row class="row">
				<uni-col :span="6" class="tags_title">按年份查找</uni-col>
				<uni-col :span="18" class="tags_content">
					<view class="tag" v-for="item in publishyear" :key="item">
						{{item}}
					</view>
				</uni-col>
			</uni-row>
			<!-- 语种 -->
			<uni-row class="row">
				<uni-col :span="6" class="tags_title">按语言查找</uni-col>
				<uni-col :span="18" class="tags_content">
					<view class="tag" v-for="item in lang" :key="item">
						{{item}}
					</view>
				</uni-col>
			</uni-row>
			<!-- 地区 -->
			<uni-row class="row">
				<uni-col :span="6" class="tags_title">按地区查找</uni-col>
				<uni-col :span="18" class="tags_content">
					<view class="tag" v-for="item in publishare" :key="item">
						{{item}}
					</view>
				</uni-col>
			</uni-row>
			<!-- 字母 -->
			<uni-row class="row">
				<uni-col :span="6" class="tags_title">按字母查找</uni-col>
				<uni-col :span="18" class="tags_content">
					<view class="tag" v-for="item in letter" :key="item">
						{{item}}
					</view>
				</uni-col>
			</uni-row>

		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	//导入all的静态数据内容
	import { useAll } from '../../../pinia/all';
	const allStore = useAll();

	/****************数据初始化*****************/
	//语种
	const lang = ref<Array<string>>([]);
	lang.value = allStore.getLang;
	//地区
	const publishare = ref<Array<string>>([]);
	publishare.value = allStore.getPublishare;
	//字母
	const letter = ref<Array<string>>([]);
	letter.value = allStore.getLetter;
	//年份
	const publishyear = ref<Array<string>>([]);
	publishyear.value = allStore.getPublishyear;
</script>

<style lang="less" scoped>
	.allContent {

		.tags {
			.row {
				padding: 5rpx;
				// 标题
				.tags_title {
					color: rgba(198, 98, 255, 0.8);
				}

				// 内容
				.tags_content {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;

					.tag {
						margin-left: 15rpx;
					}
				}
			}

		}
	}
</style>