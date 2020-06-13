
// 公用类型申明
declare namespace CommonType{
    interface IConfig {
        /* appid */
        appid:string,
        /* 接口域名 */
        baseUrl:string,
        /* 图片地址 */
        imageUrl:string,
    }
    interface requestConfig {
        method?:'GET' | 'POST' | 'PUT' | 'DELETE' | undefined,
        url:string,
        params?:any
    }
}