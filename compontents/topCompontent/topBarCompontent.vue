<template>
	<!-- 空出状态栏来 -->
	<view class="topBar" :style="{ height: statusBarHeight + 'px' }">
		<!-- test -->
	</view>
</template>

<script setup lang="ts">
	import {ref} from 'vue';
	import {onLoad} from '@dcloudio/uni-app';
	
	// 创建响应式状态栏高度变量
	const statusBarHeight = ref(0);  
	onLoad(()=>{
		
		if (plus && plus.navigator) {
		        // 使用 5+ API 获取状态栏高度  
		        const height = plus.navigator.getStatusbarHeight();  
		        statusBarHeight.value = height;  
				console.log("看看高度",statusBarHeight.value);
		    } else {  
		        // 对于非 5+ App 平台，你可能需要设置一个默认值或进行其他处理  
		        statusBarHeight.value = 20; // 比如 '20px'  
		    }  
	})
</script>

<style lang="less">
	.topBar{
		position: fixed;
		top: 0px;
		width: 100%;
		height: 24px;
		background-color: aliceblue;
	}
</style>
