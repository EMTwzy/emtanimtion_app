//获取当前星期数
export const getToday=()=>{
	let nowDay=new Date().getDay();
	//如果当前是星期日(星期日是0)
	if(nowDay-1<0)
		nowDay=6;
	else 
		nowDay--;
	return nowDay;
};

//是否是今天更新的内容
export const IsToday=(vodAddtime:string)=>{
	let time=new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' 00:00:00');
	//需要再除以1000获取毫秒时间戳，很奇怪的是time是早上8点的时间戳
	let toDay=time.getTime()/1000-28800;
	//再加86400获取到明天的时间戳 1710345600
	let nextDay=toDay+86400;
	let addtime=parseInt(vodAddtime);
	if(addtime>=toDay&&addtime<=nextDay)
	return true;
	else 
	return false;
};

//现在的时间戳
export const nowTime=()=>{
	let time=new Date();
	console.log("现在时间为",Math.floor(time.getTime()/1000));
	return Math.floor(time.getTime()/1000);
}

//时间戳转换为具体日期
export const changeDate=(time:number)=>{
	let date=new Date(time*1000);
	let year=date.getFullYear();
	let month=date.getMonth()+1;
	let day=date.getDate();
	return year+'-'+month+'-'+day;
}