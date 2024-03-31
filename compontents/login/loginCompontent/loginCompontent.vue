<template>
	<view class="login_item">
		<!-- 账号 -->
		<uni-row class="row">
			<uni-col :span="2">&nbsp;</uni-col>
			<uni-col :span="6">
				账号：
			</uni-col>
			<uni-col :span="13">
				<input type="text" v-model="userName" placeholder="用户名/账号名" />
			</uni-col>
			<uni-col :span="3">&nbsp;</uni-col>
		</uni-row>
		<!-- 密码 -->
		<uni-row class="row">
			<uni-col :span="2">&nbsp;</uni-col>
			<uni-col :span="6">
				密码：
			</uni-col>
			<uni-col :span="13">
				<input type="safe-password" v-model="password" />
			</uni-col>
			<uni-col :span="3">&nbsp;</uni-col>
		</uni-row>
		<!-- 按钮 -->
		<uni-row class="row">
			<uni-col :span="7">&nbsp;</uni-col>
		
			<uni-col :span="5">
				<button type="primary" @click="login">登录</button>
			</uni-col>
			<uni-col :span="2">&nbsp;</uni-col>
			<uni-col :span="5">
				<button type="primary" @click="register">注册</button>
			</uni-col>
		
			<uni-col :span="2">&nbsp;</uni-col>
			<uni-col :span="3">&nbsp;</uni-col>
		</uni-row>
		<!-- emmm忘记了 -->
		<view class="forget" @click="forget">
			我忘记密码了
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	// 导入登录api  修改用户信息
	import { loginUser, changeUser } from '../../../api/index';
	// 导入userInterface
	import userI from '../../../interface/userInterface';
	//时间
	import { nowTime } from '../../../utils/time';
	
	const userName = ref<string>('');
	const password = ref<string>('');
	let now = nowTime();
	//成功登录前要更新用户信息
	const change = reactive({
		userId: '',
		loginTime: now,
		loginDevice: '',
		loginIp: ''
	});
	
	//获取设备信息
	async function getDevice() {
		uni.getSystemInfo({
			success: (device) => {
				change.loginDevice = device.deviceType + '-' + device.appVersionCode + '-' + device.ua;
				//console.log(device.deviceType, device.appVersion, device.brand, device.deviceBrand, device.ua);
			}
		})
	}
	//获取ip信息
	async function getIp() {
		uni.request({
			url: 'https://api.ipify.org?format=json',
			success: res => {
				change.loginIp = res.data.ip;
				console.log("登录地址", res.data.ip);
			}
		})
	}
	
	
	// 登录
	let user : userI = ref();
	async function login() {
		if (userName.value == '')
			uni.showToast({
				title: "没有输入账号",
				icon: 'none'
			});
		else if (password.value == '')
			uni.showToast({
				title: "没有输入密码",
				icon: 'none'
			})
		else {
			let res : userI = await loginUser(userName.value, password.value);
			if (res.userId == '' || res.userId == undefined) {
				uni.showToast({
					title: "登录失败，请检查网络或联系管理员emt1731041348@outlook.com",
					icon: 'none',
					duration: 3000
				});
			} else {
				change.userId = res.userId;
				changeUser(change);
				uni.setStorageSync('userId', res.userId);
				uni.setStorageSync('userName', res.userName);
				uni.setStorageSync('userPassword', res.userPassword);
				uni.setStorageSync('loginTime', now);
				uni.setStorageSync('loginDevice', res.loginDevice);
				uni.setStorageSync('loginPass', res.loginPass);
				uni.showLoading({
					title:"登录成功!"
				})
				setTimeout(()=>{
					uni.hideLoading();
					uni.reLaunch({
						url:'../index/index'
					})
				},1000)
			}
	
		}
	}
	
	//注册
	function register() {
		console.log("点击了注册");
	}
	
	//忘记密码了
	function forget() {
		uni.showToast({
			title: "暂不支持找回",
			icon: 'none',
		})
	}
	
	onLoad(() => {
		getDevice();
		getIp();
	})
</script>

<style lang="less" scoped>
	
	// 登录组件
	.login_item {
		width: 100%;
		font-size: 40rpx;
		font-weight: bold;
		padding: 10rpx;
		position: absolute;
		margin-top: calc(60%);
		color: rgb(246, 114, 255);
	
		// 输入框
		input {
			border: 1rpx solid #ccc;
			width: 100%;
			padding: 10rpx;
		}
	
		// 行
		.row {
			margin-top: 50rpx;
		}
	
		// 忘记密码
		.forget {
			font-size: 20rpx;
			position: absolute;
			top: 60vh;
			left: 80vw;
		}
	}
</style>
