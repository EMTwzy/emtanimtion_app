import {defineStore} from 'pinia';

export const useApiStore=defineStore('api',{
	state:()=>({
		
	}),
	actions:{
		turnTo(vodId:number){
			console.log("跳转至id",vodId);
		}
	},
	getters:{
		
	}
})