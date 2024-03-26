//user
import {defineStore} from 'pinia';

export const useUserStore=defineStore('user',{
	state:()=>({
		userId:0,
		userName:'',
		userInformation:{}
	}),
	getters:{
		getUserId:(state)=>{}
	}
})