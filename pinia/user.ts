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
		getUserId:(state)=>{
			let userId=uni.getStorageSync('userId');
			state.userId=userId!=null&&userId!=undefined?userId:0;
		},
		getUserName:(state)=>{
			let userName=uni.getStorageSync("userName");
			state.userName=userName!=null&&userName!=undefined?userName:'';
		},
		getUserInformation:(state)=>{
			let loginTime=uni.getStorageSync('loginTime');
			let loginIp=uni.getStorageSync('loginIp');
			let loginDevice=uni.getStorageSync('loginDevice');
			state.userInformation.loginTime=loginTime;
			state.userInformation.loginIp=loginIp;
			state.userInformation.loginDevice=loginDevice;
		}
		
	}
})