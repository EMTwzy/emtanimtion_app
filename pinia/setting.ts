import {defineStore} from 'pinia';

//定义一个名为setting的pinia来管理本系统的全局参数
export const useSettingStore = defineStore("setting",{
	//定义参数
	state:()=>({
				theme:'dark'
	}),
	//获取参数
	getters:{
		getTheme(state):string{return state.theme;}
	},
	//方法
	
	actions:{
		changeTheme(theme:string){
			if (theme=='light')
				this.theme='light';
			else 
				this.theme='dark';
		}
	}
	
})