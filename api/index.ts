import { http } from '../utils/http.ts';
import {itemI} from '../interface/itemInterface/itemInterface';

//根据指定id获取视频数据
export const selectVideoById = async (vId : number) => {
	try {
		const res = await http("/selectVideoById", "get", { vid: vId });
		console.log("进行了selectVideoById请求");
		return res; // 返回请求结果  
	} catch (error) {
		console.error("API 请求错误:", error);
		throw error; // 抛出错误以便调用者可以捕获  
	}
};

//获取今日数据
export const today = async (day : number):itemI => {
	try {
		let res:itemI = await http("/weekNew", "get", { day });
		return res;
	} catch (err) {
		throw err;
	}
}

//验证图片是否可以访问
export const picUtils = async (vpic : string) => {
	await http("/picUtils", "get", { vpic })
		//如果请求过来的数据是存在的那么直接返回访问数据，否则就返回空
		.then(res => {
			return res ? vpic : '';
		})
		.catch(error => {
			console.log("请求失败 ", error);
		})
}

//获取随机数据
export const randomVideo=async ():itemI =>{
	try{
		const res:itemI=await http("/randomVideo","get");
		return res;
	}catch(error){
		throw error;
	}
}

//根据名称获取模糊数据
export const selectVideoByName=async (name:string):itemI=>{
	try{
		const res:itemI=await http("/selectVideoByName","get",{name});
		return res;
	}catch(error){
		throw error;
	}
}
