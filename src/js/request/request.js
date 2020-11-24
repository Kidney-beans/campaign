const { default: Axios } = require('axios')
let request = require('axios')

let baseURL = "http://localhost:8099"

export function get(requestUrl,params){
    return axios({
        method:'get',
        baseURL:baseURL,
        url: requestUrl,
        params
    })
}


export function post(requestUrl,data){
    return axios({
        method:'post',
        baseURL:baseURL,
        url: requestUrl,
        data
    })
}