import config from '../config/base';
import Request from './request'

let request = Request.getInstance()
interface parmasConfig {
    url:string,
    data?:any,
    method:'GET' | 'POST' | 'PUT' | 'DELETE'
}

//是否有请求正在刷新token
let isRefreshing:boolean = false
//被挂起的请求的数组
let refreshSubscribers:Array<any> = []
// 将请求push到数组中
const subscribersTokenRefresh:Function = (cb:Function):void =>{
    refreshSubscribers.push(cb)
}
//刷新token后，将数组中的请求重新发起
const onRefershed:Function = (token:string)=>{
    refreshSubscribers.map((cb:Function)=>cb(token))
}

const fetch:Function = (agr:CommonType.requestConfig)=>{
    let {method,url,params} = agr
    const token = wx.getStorageSync('token')
    method = method || 'GET'
    const requestUrl:string = config.baseUrl + url
    let httpDefault:parmasConfig = {
        url:requestUrl,
        data:params,
        method,
    }
    if(token){
        return new Promise((resole,reject)=>{
            wx.request({
                ...httpDefault,
                header: {
                    'content-type': 'application/json',
                    token
                },
                success(res){
                    if(res && res.statusCode == 401){
                        return refreshToken(httpDefault)
                    }else{
                        resole(res.data)
                    }
                },
                fail(err){
                    if(err.response.status == '401'){
                        // window.location.href = '/login'
                        console.log('tokenfail')
                        return refreshToken(httpDefault)
                    }else{
                        console.log('else')
                        reject(err)
                    }
                }
            })
        }).catch((err:any)=>{
            console.log('err')
            console.log(err.response)
            
        })
    }else{
        //token过期，
        return refreshToken(httpDefault)
    }
}

//token 过期操作
const refreshToken:Function = (httpDefault:parmasConfig)=>{
    //请求挂起
    let retry = new Promise((resole)=>{
        const refershFnc = (newToken:string) =>{
            resole(new Promise((resole,reject)=>{
                wx.request({
                    ...httpDefault,
                    header: {
                        'content-type': 'application/json',
                        token:newToken
                    },
                    success(res){
                        console.log('success')
                        resole(res.data)
                    },
                    fail(err){
                        console.log('fail')
                        console.log(err.response)
                        reject(err)
                    }
                })
            })
            .catch((err:any)=>{
                console.log('catch')
                console.log(err.response)
            })
            )
        }
        subscribersTokenRefresh(refershFnc)
    })
    if(!isRefreshing){
        isRefreshing = true;
        return new Promise((resolve)=>{
            request.getAuth()
            .then((res)=>{
                console.log(res,'res')
                if(res && res.token){
                    onRefershed(res.token)
                    isRefreshing = false;
                    wx.setStorageSync('token', res.token)
                    resolve(retry)
                }
                
            })
            .catch(err=>{
                console.log(err)
            })
        })
       
    }else{
        return Promise.resolve(retry)
    }
}
export default fetch