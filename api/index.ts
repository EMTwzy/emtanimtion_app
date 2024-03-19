import { http } from '../utils/http.ts';
import {itemI} from '../interface/itemInterface/itemInterface';

/**********************************公共***********************************************/

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

//根据名称获取模糊数据
export const selectVideoByName=async (name:string):itemI=>{
	try{
		const res:itemI=await http("/selectVideoByName","get",{name});
		return res;
	}catch(error){
		throw error;
	}
}

//根据指定id获取视频数据
export const selectVideoById = async (vId : number):itemI => {
	try {
		const res = await http("/selectVideoById", "get", { vid: vId });
		return res; 
	} catch (error) {
		throw error;   
	}
};
/**********************************首页 index***********************************************/
//获取今日数据
export const today = async (day : number):itemI => {
	try {
		let res:itemI = await http("/weekNew", "get", { day });
		return res;
	} catch (err) {
		throw err;
	}
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

/**********************************分类大全 all***********************************************/

// //获取所有视频的总数
// export const totalVideo=async ():Promise<number>=>{
// 	try{
// 		const res:number=await http("/totalVideo","get");
// 		return res;
// 	}catch(error){
// 		throw error;
// 	}
// }
//获取指定条件的总额
export const selectVideoNum=async(lang:string,publishyear:number|string,publishare:string,letter:string):Promise<number>=>{
	try{
		const res:number=await http("/selectVideoNum","get",{
			lang,
			publishyear,
			publishare,
			letter
		});
		return res;
	}catch(error){
		throw error;
	}
}
//分页 获取指定条件的数据
export const selectVideo=async(lang:string,publishyear:number|string,publishare:string,letter:string,pageNum:number):itemI=>{
	try{
		const res:itemI=await http("/selectVideo","get",{
			lang,
			publishyear,
			publishare,
			letter,
			pageNum
		});
		return res;
	}catch(error){
		throw error;
	}
}
