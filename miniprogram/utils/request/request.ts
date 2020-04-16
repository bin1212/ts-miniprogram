import {baseUrl} from '../../config/base';
import {commonFetch} from './type'

class Request{
    constructor(){
        console.log(baseUrl,112321)
    }
    fetch(agr:commonFetch){
        let {method,url,param} = agr
        const token = wx.getStorageSync('token')
        console.log(method,url,param)
        return new Promise((resole,reject)=>{
            wx.request({
                url:baseUrl + url,
                data:param,
                method,
                header: {
                    'content-type': 'application/json',
                    token
                },
                success(res){
                    resole(res)
                },
                fail(err){
                    reject(err)
                }
            })
        }).catch((err:any)=>{
            console.log(err)
        })
    }
    getAUth(){
        wx.login({
            success: res => {
              console.log(res.code)
              this.fetch({
                method:'POST',
                url:'api/auth/login',
                param:{
                    code:res.code 
                }
              })
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
            },
          })
    }
}
export default new Request()