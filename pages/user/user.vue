<template>
	<!-- 用户界面 -->
	<view class="user" :class="theme=='dark'?'dark':'light'">
		<!-- 用户信息模块 -->

		<view class="userInfor">
			<!-- 用户头像 -->
			<uni-row>
				<uni-col :span="7">
					<view class="user_img">
						<image src="../../static/user/default_user.jpg"></image>
					</view>
				</uni-col>
				<uni-col :span="17">
					<!-- 用户信息 -->
					<view class="userInformation">
						<p>
							<text v-if="name==''">用户：先登录喵~</text>
							<text v-else-if="name!=''">用户：{{name}}</text>
							<!--    //////系统////// -->
							<uni-icons type="gear-filled" size="25" style="float:right" @click="setting" />
						</p>
						<p>
							<text v-if="userInformation.loginTime==null">上次登陆时间：先登录喵~</text>
							<text v-else-if="userInformation.loginTime!=''">上次登录时间：{{userInformation.loginTime}}</text>
						</p>
					</view>
				</uni-col>
			</uni-row>
		</view>


		<!-- 选择区域 -->
		<view class="control">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
				activeColor="rgba(198, 98, 255, 0.8)">
			</uni-segmented-control>
			<view class="content">
				<view v-show="current === 0">
					<view v-if="subInfo.length==0">暂无数据哦</view>
					<subscribeCompontent v-for="item in subInfo" :key="item.userSubId" :obj="item">
					</subscribeCompontent>
				</view>
				<view v-show="current === 1">
					<historyCompontent v-for="item in hisInfo" :key="item" :obj="item"></historyCompontent>
					<view v-if="hisInfo.length==0">暂无数据哦</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { onLoad,onShow } from '@dcloudio/uni-app';
	//导入设置pinia
	import { useSettingStore } from '../../pinia/setting';
	//导入用户pinia
	import { useUserStore } from '../../pinia/user';
	//导入subI hisI
	import subI from '../../interface/subscribeInterface';
	import hisI from '../../interface/historyInterface';
	//获取指定用户的追番记录 历史记录
	import { getSubscribe, getHistory } from '../../api/index';
	//导入历史记录组件 追番记录组件
	import historyCompontent from '../../compontents/user/historyCompontent/historyCompontent.vue';
	import subscribeCompontent from '../../compontents/user/subscribeCompontent/subscribeCompontent.vue';

	//主题
	const useSetting = useSettingStore();
	const theme = computed(() => useSetting.theme);
	uni.setTabBarStyle({
		backgroundColor: theme.value == 'dark' ? '#000000' : '#DCDFE6',
		color: theme.value == 'dark' ? '#ccc' : '#000000'
	});

	//用户信息
	const useUser = useUserStore();
	const name = computed(() => useUser.userName);   //名称
	const userInformation = computed(() => useUser.userInformation);   //用户的其他信息

	//获取追番信息
	const subInfo : subI = ref([]);
	async function getSub(userId) {
		let res : subI = await getSubscribe(userId);
		subInfo.value = res;
	}

	//获取历史记录信息
	const hisInfo : hisI = ref([]);
	async function getHis(userId) {
		let res : hisI = await getHistory(userId);
		hisInfo.value = res;
		console.log("历史信息", hisInfo.value);
	}

	/********选择项*******/
	const items = ref(['追番', '历史记录']);
	const current = ref(0);
	function onClickItem(e) {
		if (current.value != e.currentIndex) {    //切换选项
			current.value = e.currentIndex;
			if (current.value == 0) {
				getSub(useUser.userId);		 //没有登陆那就是空
				console.log("追番信息",subInfo.value);
			} else {
				getHis(useUser.userId);      //没有登陆那就是空
			}
		}
	}
	/*****系统*****/
	function setting() {
		console.log("点击了系统");
	}

	//测试
	onShow(() => {
		if (current.value == 0) {
			getSub(useUser.userId);		 //没有登陆那就是空
		} else {
			getHis(useUser.userId);      //没有登陆那就是空
		}
	})
</script>

<style lang="less" scoped>
	@import '../../theme/theme.less';

	.user {

		// 用户信息
		.userInfor {
			.user_img {
				width: 200rpx;

				image {
					width: 200rpx;
					height: 200rpx;
				}
			}

			.userInformation {
				p {
					margin-top: 20rpx;
				}
			}

		}

		.control {
			
			.content{
				height: 1100rpx;
				overflow-y: auto;
			}
		}
	}
</style>