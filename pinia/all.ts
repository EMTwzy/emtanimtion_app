//处理all界面的内容
import {defineStore} from 'pinia';

export const useAll=defineStore('all',{
	state:()=>({
		lang:[],
		letter:[],
		publishare:[],
		publishyear:[],
	}),
	getters:{
		//获取语种
		getLang:(state):Array<string>=>{
			let arr=['日语','中文','其他'];
			for(let i=0;i<arr.length;i++)
			state.lang.push(arr[i]);
			return state.lang;
		},
		//获取字母
		getLetter:(state):Array<string>=>{
			let arr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
			for(let i=0;i<arr.length;i++)
			state.letter.push(arr[i]);
			return state.letter;
		},
		//获取地区
		getPublishare:(state):Array<string>=>{
			let arr=['日韩','中国','欧美'];
			for(let i=0;i<arr.length;i++)
			state.publishare.push(arr[i]);
			return state.publishare;
		},
		//获取年份
		getPublishyear:(state):Array<string>=>{
			let year=new Date().getFullYear();
			for(let i=0;i<8;i++)
			state.publishyear.push(year-i);
			state.publishyear.push('更早以前');
			return state.publishyear;
		}
	}
})