<template>
	<view class="loginRegister">
		<!-- 登录 -->
		<view class="login_item" v-if="isLogin">
			<uni-forms :modelValue="loginData">
				<uni-forms-item label="账号" required name="name">
					<uni-easyinput v-model="loginData.userName" placeholder="用户名/账号名" />
				</uni-forms-item>
				<uni-forms-item label="密码" required name="password">
					<uni-easyinput type="password" v-model="loginData.password" />
				</uni-forms-item>
				<button type="primary" @click="login">登录</button>
				<button type="primary" @click="registerClick">注册</button>
			</uni-forms>
			<!-- emmm忘记了 -->
			<view class="forget" @click="forget">
				我忘记密码了
			</view>
		</view>

		<!-- 注册 -->

		<uni-forms class="register_item" :modelValue="registerData" v-if="!isLogin">
			<uni-forms-item label="账号" required name="name">
				<uni-easyinput v-model="registerData.name" placeholder="用户名/账号名" />
			</uni-forms-item>
			<uni-forms-item label="密码" required name="password">
				<uni-easyinput type="password" v-model="registerData.password" placeholder="请输入密码,不得少于6位" />
			</uni-forms-item>
			<uni-forms-item label="再次输入密码" required name="again">
				<uni-easyinput type="password" v-model="registerData.again" />
			</uni-forms-item>
			<button type="primary" @click="onRegister">注册</button>
		</uni-forms>


	</view>
</template>

<script setup lang="ts">
	import { ref, reactive } from 'vue';
	import { onLoad, onShow } from '@dcloudio/uni-app';
	// 导入登录api  修改用户信息 查看当前用户名是否已存在 注册用户
	import { loginUser, changeUser, selectUserName ,register} from '../../api/index';
	// 导入userInterface
	import userI from '../../interface/userInterface';
	//时间
	import { nowTime } from '../../utils/time';

	//接收登录信息
	const loginData = reactive({
		userName: '',
		password: ''
	});

	// 是否登录
	const isLogin = ref(true);

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
				let res=device.deviceType + '-' + device.appVersionCode + '-' + device.ua;
				change.loginDevice = res;
				registerUser.loginDevice=res;
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
				registerUser.loginIp=res.data.ip;
				console.log("登录地址", res.data.ip);
			}
		})
	}


	// 登录
	let user : userI = ref();
	async function login() {
		if (loginData.userName == '')
			uni.showToast({
				title: "没有输入账号",
				icon: 'none'
			});
		else if (loginData.password == '')
			uni.showToast({
				title: "没有输入密码",
				icon: 'none'
			})
		else {
			let res : userI = await loginUser(loginData.userName, loginData.password);
			if (res.userId == '' || res.userId == undefined) {
				uni.showToast({              //特殊状况
					title: "登录失败，请检查网络或联系管理员emt1731041348@outlook.com",
					icon: 'none',
					duration: 3000
				});
			} else if(res.loginPass==0){         //ban了
				uni.showToast({
					title:"登录失败，请联系管理员emt1731041348@outlook.com",
					icon:'none',
					duration:3000
				})
			}else {                     //通
				change.userId = res.userId;
				changeUser(change);
				uni.setStorageSync('userId', res.userId);
				uni.setStorageSync('userName', res.userName);
				uni.setStorageSync('userPassword', res.userPassword);
				uni.setStorageSync('loginTime', now);
				uni.setStorageSync('loginDevice', res.loginDevice);
				uni.setStorageSync('loginPass', res.loginPass);
				uni.showLoading({
					title: "登录成功!"
				})
				setTimeout(() => {
					uni.hideLoading();
					uni.reLaunch({
						url: '../index/index'
					})
				}, 1000)
			}

		}
	}

	/***************注册*********************/
	//接收数据
	const registerData = reactive({
		name: '',
		password: '',
		again: ''
	})
	//注册信息
	let registerUser={
		userName:registerData.name,
		userPassword:registerData.password,
		loginTime:nowTime(),
		loginIp:'',
		loginDevice:'',
	}
	//注册
	function registerClick() {
		isLogin.value = false;
		console.log("点击了注册");
	}
	//确认注册
	async function onRegister() {
		let res = await selectUserName(registerData.name);
		//已存在该用户
		if (res) {
			uni.showToast({
				title: "当前用户名已存在！",
				icon: 'none'
			});
			registerData.name = '';
		}
		else{
			if(registerData.name=='')       //名字为空
			uni.showToast({
				title:"none",
				icon:"none"
			});
			
			if(registerData.password.length<6)      //密码不得小于6位
			uni.showToast({
				title:"密码长度不得小于6位！",
				icon:"none"
			})
			else if(registerData.password!=registerData.again){    //两次密码需一致
				uni.showToast({
					title:"两次密码不一致！",
					icon:"none"
				});
				registerData.again='';        //重置again的数据值
			}
			else{        //以上都通过
				registerUser.loginTime=nowTime();
				registerUser.userName=registerData.name;
				registerUser.userPassword=registerData.password;
				let res=register(registerUser);
				if(res)
				uni.showToast({
					title:"注册成功",
					icon:"none",
					duration:1000,
					success() {   //注册成功后进入登录板块 填充数据 登录
						isLogin.value=true;
						loginData.userName=registerUser.userName;
						loginData.password=registerUser.userPassword;
						console.log("看看到底有没有传过去",registerUser);
						login();  //登录
					}
				})
			}
		}
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
	});
</script>

<style lang="less" scoped>
	.loginRegister {
		width: 100vw;
		height: 100vh;
		background-image: url('../../static/user/login.jpg');
		background-size: 100%;
		background-repeat: no-repeat;

		// 登录组件
		.login_item {
			width: 80%;
			font-size: 35rpx;
			padding: 25rpx;
			position: absolute;
			margin-top: calc(60%);
			background-color: rgba(74, 75, 85, 0.5);
			color: rgba(255, 70, 237, 0.8);
			left: 10%;

			::v-deep .uni-forms-item__label {
				color: rgba(255, 70, 237, 0.8);
				font-size: 35rpx;
			}

			button {
				width: 30%;
				float: left;
				margin-left: 60rpx;
			}

			// 忘记密码
			.forget {
				font-size: 20rpx;
				position: absolute;
				top: 65vh;
				left: 65vw;
				color: rgba(255, 70, 237, 0.8);
			}
		}

		// 注册
		.register_item {
			width: 80%;
			position: absolute;
			top: calc(30%);
			padding: 30rpx;
			left: 10%;
			background-color: rgba(74, 75, 85, 0.5);

			::v-deep .uni-forms-item__label {
				color: rgba(255, 70, 237, 0.8);
				font-size: 25rpx;
			}

			button {
				width: 80%;
				margin-top: 50rpx;
			}
		}
	}
</style>