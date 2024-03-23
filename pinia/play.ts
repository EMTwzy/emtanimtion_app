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
		videoInfo:''
	}),
	getters:{

	},
	actions:{
		initInformation(isLogin){
			if(isLogin==''){
				this.selectEpisode=this.episodeList[0];
				this.selectVideo=this.videoList[0];
				console.log("当前是",this.selectVideo);
			}else{
				//登录了的话
			}
		},
		//选择观看的集数
		selectWatch(options){
				if(options=='上一集'){
				console.log("当前选择项位于第",options,"\n",this.episodeList.indeOf(this.selectVideo));
				}
				else{
					console.log("下一集",options);
				}
		}
	}
	
})