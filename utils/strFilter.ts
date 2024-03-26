// 处理字符串

export const strFilter=(content:string)=>{
	// 替换 HTML 实体和去除标签
	          var decodedString = content
	            .replace(/&lt;\/?(p|br)&gt;/g, '')  // 同时匹配 <p>, </p>, <br>, 和 </br>  
	            .replace(/&lt;/g, '')
	            .replace(/&gt;/g, '')
				.replace(/#/g,'')
	            .replace(/&amp;nbsp;/g, ' ')
	            // 替换 <br> 标签的变体为空字符串  
	            .replace(/<br\s*\/?>/gi, '')
	            // 去除 <p> 和 </p> 标签  
	            .replace(/<\/?p>/g, '');
	      // 去除行首和行尾的空格，合并多余的空格
	      decodedString = decodedString.trim().replace(/\s+/g, ' ');
		  console.log("处理后的结果为：",decodedString.trim());
	      return decodedString.trim();
}