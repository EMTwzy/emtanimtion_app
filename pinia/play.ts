//管理play界面的内容

import {defineStore} from 'pinia';

export const usePlayStore=defineStore('play',{
	state:()=>({
		//当前视频集数组
		episodeList:[],
		//当前视频播放资源数组
		videoList:[],
		
		//当前观看集
		selectEpisode:'',
		//当前播放资源
		selectVideo:'',
		
		//当前视频的信息
		videoInfo:'',
		//是否追番
		isSubscribe:false
	}),
	getters:{

	},
	actions:{
		//初始化数据
		initInformation(isLogin){
			if(isLogin==0){
				this.selectEpisode=this.episodeList[0];
				this.selectVideo=this.videoList[0];
			}else{
				//登录了的话
			}
		},
		//选择观看的集数
		selectWatch(options){
			let index=this.episodeList.indexOf(this.selectEpisode);
			let length=this.episodeList.length;
				if(options=='上一集'){
					if(index==0){
						uni.showToast({
							title:"前面没东西了"
						})
					}else{
							this.selectEpisode=this.episodeList[index-1];
							this.selectVideo=this.videoList[index-1];
					}
				}
				else{
					if(length==index){
						uni.showToast({
							title:"前面没东西了"
						})
					}else{
						this.selectEpisode=this.episodeList[index+1];
						this.selectVideo=this.videoList[index+1];
					}
				}
		},
		//选择集数
		select(item){
			let index=this.episodeList.indexOf(item);
			this.selectEpisode=this.episodeList[index];
			this.selectVideo=this.videoList[index];
		},
	}
	
})