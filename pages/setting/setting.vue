<template>
	<view class="setting">
		<uni-collapse>
		<!-- 设置主题 -->
			<uni-collapse-item title="设置主题" :open="false" class="selectTheme">
				<radio-group name="" @change="selectTheme">
					<label>
						<radio value="light" :checked="theme=='light'" style="transform:scale(0.7)" /><text>白昼</text>
					</label>
					<label>
						<radio value="dark" :checked="theme=='dark'" style="transform:scale(0.7)" /><text>黑夜</text>
					</label>
				</radio-group>
			</uni-collapse-item>
		<!-- 制作人有话说 -->
			<uni-collapse-item title="制作人有话说"  @click="showDialog" :open="false"  :showArrow='false'>
			</uni-collapse-item>
		<!-- 获取最新版本 -->
			<uni-collapse-item title="获取最新版本"  @click="getApp" :open="false"  :showArrow='false'>
			</uni-collapse-item>
		<!-- 获取最新版本 -->
				<uni-collapse-item title="退出登录"  @click="unlogin" :open="false"  :showArrow='false'>
				</uni-collapse-item>
			
			
		</uni-collapse>

	</view>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { useSettingStore } from '../../pinia/setting';
	import app from '../../version';

	const useSetting = useSettingStore();
	const theme = computed(() => useSetting.theme);
	
	// 选择主题
	function selectTheme(e) {
		console.log("选择的主题", e.detail.value);
		useSetting.changeTheme(e.detail.value);
		uni.showToast({
			title:"已经更换主题了",
			icon:"none"
		})
	};
	
	//出现弹窗
	function showDialog(){
		uni.showModal({
			showCancel:false,
			title:"emilia maji tenshi",
			content:`\t我是本软件的制作人，本人学艺不精，若有关于本软件的一些建议，可以向“emt1731041348@outlook.com”发送。\n\t本人需要强调，本软件所有资源来源于网络，本软件绝不盈利，如果你对本软件提供的服务有所质疑，也请向如上邮箱发送你的想法。\n\t如有冒犯，十分抱歉。`
		})
	};
	
	//获取最新版本
	function getApp(){
		uni.showModal({
			showCancel:false,
			title:"获取最新版本",
			content:'当前版本'+app.version+`\t最新版本为`+''
		})
		console.log(app.version);
	};
	
	//退出登录
	function unlogin(){
		uni.showModal({
			title:"退出登录",
			content:"确认退出登录吗？",
			success:res=>{
				if(res.confirm){
					uni.showToast({
						title:"退出了！",
						icon:"none",
						duration:1500,
						success() {
							uni.removeStorageSync('userId');
							uni.removeStorageSync("userName");
							uni.removeStorageSync("loginTime");
							uni.removeStorageSync("loginIp");
							uni.removeStorageSync("loginDevice");
							console.log("看看删了没",uni.getStorageSync("userId"));
						}
					})
				}
			}
		})
	}
</script>

<style lang="less" scoped>
	
	.setting {
		width: 100%;
		height: 100vh;
		overflow-y: auto;
		// 主题选择
		.selectTheme {
			radio {
				font-size: 30rpx;
				margin-left: 30rpx;
			}
		}
		
		
	}
</style>