/**
 * 工具函数
 */

/**
 * 验证密码
 * return   true/false
 */
export function pwdReg(value) {
    // 正则
    const reg = /^[A-Za-z0-9]+$/;
    return reg.test( value )
}
