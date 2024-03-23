//user
import {defineStore} from 'pinia';

export const useUserStore=defineStore('user',{
	state:()=>({
		userId:'',
		userName:'',
		userPassword:'',
	}),
	getters:{
		getUserId:(state)=>{}
	}
})