/*
 * @Description: 封装cookie
 * @Author: astar
 * @Date: 2021-07-01 13:53:07
 * @LastEditTime: 2021-07-01 14:37:18
 * @LastEditors: astar
 */
/**
* 获取cookie数组
* @author astar
* @date 2021-07-01 14:22
*/
function getCookies () {
  let cookies = document.cookie
  let arr = cookies.split('; ')
  return arr.map(item => {
    let [name, value] = item.split('=')
    return {
      name: decodeURIComponent(name),
      value: decodeURIComponent(value)
    }
  })
}

/**
* 根据name获取cookie
* @author astar
* @date 2021-07-01 14:37
*/
function getCookie (name) {
  let cookies = getCookies()
  return cookies.find(item => item.name === name) || null
}
/**
* 设置cookie， day <=0 删除cookie
* @author astar
* @date 2021-07-01 14:22
*/
function setCookie (name, value, day) {
  let expireDate = new Date()
  expireDate.setDate(expireDate.getDate() + day)
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expireDate.toGMTString()}`
}