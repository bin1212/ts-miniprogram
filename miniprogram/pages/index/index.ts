// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

interface Iconfig {
  [key:string]:any
}
Page({
  data: {
   
  },

 async onLoad() {
   let a:Iconfig = {
     'a':123,
     'b':412,
     'asdqw':'qwefad'
   }
   console.log(a)
  },
  getUserInfo(e: any) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
})
