<template>
	<view class="allContent">
		<!-- tag标签区 -->
		<view class="tags">
			<!-- 年份 -->
			<uni-row class="row">
				<uni-col :span="6" class="tags_title">按年份查找</uni-col>
				<uni-col :span="18" class="tags_content">
					<view class="tag" v-for="item in publishyear" :key="item" @click="selected(item,'publishyear')"
					:class="{selected:item==publishyearSelected}">
						{{item}}
					</view>
				</uni-col>
			</uni-row>
			<!-- 语种 -->
			<uni-row class="row">
				<uni-col :span="6" class="tags_title">按语言查找</uni-col>
				<uni-col :span="18" class="tags_content">
					<view class="tag" v-for="item in lang" :key="item" @click="selected(item,'lang')"
					:class="{selected:item==langSelected}">
						{{item}}
					</view>
				</uni-col>
			</uni-row>
			<!-- 地区 -->
			<uni-row class="row">
				<uni-col :span="6" class="tags_title">按地区查找</uni-col>
				<uni-col :span="18" class="tags_content">
					<view class="tag" v-for="item in publishare" :key="item" @click="selected(item,'publishare')"
					:class="{selected:item==publishareSelected}">
						{{item}}
					</view>
				</uni-col>
			</uni-row>
			<!-- 字母 -->
			<uni-row class="row">
				<uni-col :span="6" class="tags_title">按字母查找</uni-col>
				<uni-col :span="18" class="tags_content">
					<view class="tag" v-for="item in letter" :key="item" @click="selected(item,'letter')"
					:class="{selected:item==letterSelected}">
						{{item}}
					</view>
				</uni-col>
			</uni-row>
		</view>
		
		
	</view>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';
	//导入all的静态数据内容
	import { useAllStore } from '../../../pinia/all';
	const allStore = useAllStore();

	/****************数据初始化*****************/
	//语种
	const lang = ref<Array<string>>([]);
	lang.value = allStore.getLang;
	var langSelected=ref(computed(()=>allStore.langSelected));
	//地区
	const publishare = ref<Array<string>>([]);
	publishare.value = allStore.getPublishare;
	var publishareSelected=ref(computed(()=>allStore.publishareSelected));
	//字母
	const letter = ref<Array<string>>([]);
	letter.value = allStore.getLetter;
	var letterSelected=ref(computed(()=>allStore.letterSelected));
	//年份
	const publishyear = ref<Array<string>>([]);
	publishyear.value = allStore.getPublishyear;
	var publishyearSelected=ref(computed(()=>allStore.publishyearSelected));
	
	//选择
	function selected(item,tag){
		switch(tag){
			case 'publishyear':
			if(allStore.publishyearSelected!=item)
			allStore.publishyearSelected=item;
			else
			allStore.publishyearSelected='';
			break;
			case 'publishare':
			if(allStore.publishareSelected!=item)
			allStore.publishareSelected=item;
			else
			allStore.publishareSelected='';
			break;
			case 'letter':
			if(allStore.letterSelected!=item)
			allStore.letterSelected=item;
			else
			allStore.letterSelected='';
			break;
			case 'lang':
			if(allStore.langSelected!=item)
			allStore.langSelected=item;
			else
			allStore.langSelected='';
			break;
		}
	}
	
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
					// 选中状态
					.selected{
						color: rgba(198, 98, 255, 0.6);
					}
				}
			}

		}
	}
</style>