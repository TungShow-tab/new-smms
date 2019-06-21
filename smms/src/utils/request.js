/**
 * axios发送请求函数封装
 * 2019-06-19 by 夏公子
 */

// 引入axios
import axios from 'axios'
// 引入qs
import qs from 'qs';
// 引入本地存储封装
import local from '@/utils/local'
// 设置请求默认服务器地址
axios.defaults.baseURL = 'http://172.16.12.238:5555'

// 请求拦截器
axios.interceptors.request.use(config => {
    // 获取token
    let token = local.get('token')

    // 给头部携带token
    config.headers.authorization = `Bearer ${token}` 
    return config
})

export default {
    get(url, params={}) {
       return new Promise((resolve, reject) => {
            axios.get(url, { 
                params
            })
                .then(response => {
                    resolve(response.data)   // 成功
                })
                .catch(err => {
                    reject(err)   // 失败
                })
       })
    },
    post(url, params={}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify( params ))
                .then(response => {
                    resolve(response.data)   // 成功
                })
                .catch(err => {
                    reject(err)   // 失败
                })
        })
    }
}

