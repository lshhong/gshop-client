/*
包含n个接口请求函数的模块
每个函数的返回值都是promise
 */

import ajax from './ajax'

const BASE_URl = '/api'//开发环境打包
// const BASE_URl = '';//生产环境打包
//
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (geohash)=>ajax(BASE_URl +'/position/' + geohash)

// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqCategorys = ()=>ajax(BASE_URl + '/index_category')

// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = ({latitude,longitude})=>ajax(BASE_URl +'/shops', {latitude,longitude})

// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>


// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqPwdLogin = ({name,pwd,captcha })=>ajax(BASE_URl+'/login_pwd',{name,pwd,captcha},'POST')

// [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqSendCode = (phone)=>ajax(BASE_URl+'/sendcode',{phone})

// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqSmsLogin = ({phone,code})=>ajax(BASE_URl+'/login_sms',{phone,code},'POST')

// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqUser = ()=>ajax(BASE_URl+'/userinfo')

// [10、用户登出](#10用户登出)<br/>
export const reqLogout = ()=>ajax(BASE_URl+'/logout')


export const reqGoods = ()=>ajax('/goods')
export const reqRatings = ()=>ajax('/ratings')
export const reqInfo = ()=>ajax('/info')

