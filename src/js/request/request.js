import store from 'store/index.js'
let axios = require('axios')

let baseURL = "http://localhost:8099"

export function get(requestUrl,params,progressCallback){
    return axios({
        method:'get',
        baseURL:baseURL,
        url: requestUrl,
        params,
        onUploadProgress:progressCallback?progressCallback:(()=>{console.log("no bind progress!")})
    })
}

export function post(requestUrl,data,progressCallback){
    return axios({
        method:'post',
        baseURL:baseURL,
        url: requestUrl,
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress:(e)=>{
            progressCallback(e)
        }
    })
}