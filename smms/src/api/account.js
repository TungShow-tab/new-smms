/**
 * 账号管理模块相关的请求
 */

// 引入封装好的 request.js
import req from '@/utils/request'

/* 账号添加 */
export function accountAdd(params) {
    return req.post('/account/accountadd',  params)
}

/* 批量删除 */
export function batchDelete(params) {
    return req.get('/account/batchDelete',  params)
}

/* 编辑 */
export function accountEdit(params) {
    return  req.get('/account/AccountChange',  params)
}

/* 保存编辑 */
export function saveEdit(params) {
    return  req.post('/account/SaveeditAccount', params)
}

/* 单条删除 */
export function accountDel(params) {
    return  req.get('/account/accountdel', params )
}

/* 分页请求 */
export function getDataByPage(params) {
    return  req.get('/account/accountListpage', params)
}

export function getInfo () {
    return  req.get('/account/accountInfor?a=1&b=2')
}






