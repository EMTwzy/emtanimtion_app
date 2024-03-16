// 网络请求封装函数  
const baseUrl="https://8.130.75.115:8080";
export const http=(url, method, data, headers = {}) =>{  
  // 在这里处理请求参数、设置请求头等  
  const requestConfig = {  
    url: baseUrl+url,  
    method: method,  
    data: data,  
    header: headers,  
    // ...其他配置  
  };  
  
  // 显示加载提示（如果需要）  
   uni.showLoading();  
  
  return new Promise((resolve, reject) => {  
    uni.request(requestConfig).then(response => {  
      // 在这里统一处理响应数据  
      const { data, statusCode, header } = response;  
      if (statusCode === 200) {  
        // 请求成功，处理数据并返回  
        resolve(data);  
      } else {  
        // 请求失败，处理错误  
        reject(new Error('请求失败了，状态码为 ' + statusCode));  
      }  
      // 隐藏加载提示（如果需要）  
       uni.hideLoading();  
    }).catch(error => {  
      // 网络错误或其他错误  
      reject(error);  
      // 隐藏加载提示（如果需要）  
       uni.hideLoading();  
    });  
  });  
}  