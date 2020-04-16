
export interface commonFetch{
    method:'GET' | 'POST' | 'PUT' | 'DELETE',
    url:string,
    param:any
}
export enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE
}