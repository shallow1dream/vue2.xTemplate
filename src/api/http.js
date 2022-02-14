import axions from "axios"

const wrapInstance=(http) => {
    //请求拦截
    http.interceptors.request.use((req) => {
        if(req.method=='get'){
            //把data放在params上
            req.params={...req.data}
        }
        return req
    })
    //响应拦截
    http.interceptors.response.use((res) => {
        const {data:{code,status,message,entry},status:httpCode}=res
        if( httpCode===200){
            if(code===10001){ //未登录
                return Promise.reject()
            }else{
                if(status){
                    return Promise.resolve(entry)
                }
                else{
                    return Promise.reject(message)
                }
            }
        }else{
            return Promise.reject()
        }
    })
    return http
}

const axiosInstance=wrapInstance(axions.create({
    baseURL:"http://localhost:8080/front/",
    timeout:3000,
    withCredentials:true,
}))
const http=({
    url,
    method="get",
    data={}
}) => {
    return new Promise((resolve,reject) => {
        axiosInstance({
            url,
            method,
            data
        }).then(resolve).catch(reject)
    })
}
export default http