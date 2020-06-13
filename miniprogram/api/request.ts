import config from '../config/base';
// import {commonFetch} from './type'

class Request{
    constructor(){
        // this
    }
    private static _instance: Request;
    fetch(agr:CommonType.requestConfig){
        let {method,url,params} = agr
        const token = wx.getStorageSync('token')
        console.log(method,url,params)
        method = method || 'GET'
        return new Promise((resolve,reject)=>{
            wx.request({
                url:config.baseUrl + url,
                data:params,
                method,
                header: {
                    'content-type': 'application/json',
                    token
                },
                success(res){
                    resolve(res.data)
                },
                fail(err){
                    reject(err)
                }
            })
        }).catch((err:any)=>{
            console.log(err)
        })
    }
    getAuth(){
         // 发送 res.code 到后台换取 openId, sessionKey, unionId 
        return new Promise((resolve)=>{
            wx.login({
                success: res => {
                resolve(this.fetch({
                    method:'POST',
                    url:'/api/auth/login',
                    params:{
                        code:res.code 
                    }
                  }))
                },
              })
        })
        
    }
    public static getInstance(){
        console.log('out')
        if(this._instance == null){
            console.log('in')
            this._instance = new Request()
        }
        return this._instance
    }
}

// const commonRequest = Request.getInstance()

// export {commonRequest}

// export default commonRequest.fetch
export default Request