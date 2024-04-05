//user
import {defineStore} from 'pinia';

export const useUserStore=defineStore('user',{
	state:()=>({
		userId:0,
		userName:'',
		userInformation:{
			loginTime:0,
			loginIp:'',
			loginDevice:''
		}
	}),
	getters:{
		
	},
	actions:{
		initUserId(){
			let userId=uni.getStorageSync('userId');
			console.log("看看userid",userId);
			this.userId=userId!=null&&userId!=undefined?userId:0;
		},
		initUserName(){
			let userName=uni.getStorageSync("userName");
			this.userName=userName!=null&&userName!=undefined?userName:'';
		},
		initUserInformation(){
			let loginTime=uni.getStorageSync('loginTime');
			let loginIp=uni.getStorageSync('loginIp');
			let loginDevice=uni.getStorageSync('loginDevice');
			this.userInformation.loginTime=loginTime;
			this.userInformation.loginIp=loginIp;
			this.userInformation.loginDevice=loginDevice;
		}
	}
})