import axios from 'axios'
import qs from 'qs'
import Config from './config.js'

import notification from 'antd/lib/notification'
import 'antd/lib/notification/style'

// const projectName = `/TaiYuan_KaoGu/ty/`

axios.defaults.baseURL = Config.target;

axios.defaults.transformRequest = [data => {
    return qs.stringify(data)
}];
notification.config({
    placement: 'topRight',
    top: 60,
    duration: 5,
});
axios.defaults.timeout = 20000;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8';

axios.interceptors.request.use(  
    config => {  
        if(config.method==='post'){  
            config.data = {  
                ...config.data,  
                token: Config.localItem(Config.localKey.userToken),  
            }  
        }else if(config.method==='get'){  
            config.params = {  
                token: Config.localItem(Config.localKey.userToken),
                ...config.params  
            }  
        }  
        return config  
    },function(error){  
        return Promise.reject(error)  
    }  
) 

export const getData = (url, param) => {
    return (
        axios.get(`${url}`)
    )
}

/*export const postData = (url, param) => {
    return (
        axios.post(`${url}`, param).then((res)=>{
            return res.data
        }).catch((error)=>{
            // 失败回调 失败alert 失败
            alert(`失败了,${error}`);
            console.log(error);
        })
    )
}*/
export const postData = (url, param) => {
     return (
        axios.post(`${url}`, param)
     )
}

export const allData = (arr) =>{
    return (
        axios.all(arr)
    )
}

export const spreadCallBack = (func) => {
      return(  
        axios.spread(func) 
    )
}

