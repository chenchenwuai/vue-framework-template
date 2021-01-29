import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import { downloadServerFile } from '@/utils/index'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

const loadingOptions = {
  text: '退出中',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.8)'
}

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    } else {
      if (config.url !== 'users/actions/login' && config.url !== 'users/actions/logout') {
        MessageBox.confirm('登录状态失效，请重新登录', '账号退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
          showClose: false,
          showCancelButton: false,
          closeOnClickModal: false,
          closeOnHashChange: false,
          closeOnPressEscape: false
        }).then(() => {
          Loading.service(loadingOptions)
          store.dispatch('LogOut').then(() => {
            location.reload()
          }).catch(e => {
            location.reload()
          })
        }).catch(() => {
          Loading.service(loadingOptions)
          store.dispatch('LogOut').then(() => {
            location.reload()
          }).catch(e => {
            location.reload()
          })
        })
        return Promise.reject({ code: 401, message: '登录状态失效，请重新登录' })
      }
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log('RESPONSE: ' + response.request.responseURL, response)
    const status = response.status
    if (status < 200 || status > 300) {
      Message.error({
        message: response.message,
        type: 'error',
        duration: 5 * 1000,
        showClose: true
      })
      return Promise.reject('error')
    } else {
      if (response.data instanceof Blob) {
        try {
          if (response.headers['content-type'].indexOf('application/json') !== -1) {
            return new Promise((resolve, reject) => {
              const reader = new FileReader()
              reader.readAsText(response.data, 'utf-8')
              reader.onload = function(e) {
                try {
                  const message = JSON.parse(e.target.result)
                  reject(message)
                } catch (e) {
                  reject(e.target.result)
                }
              }
            })
          } else {
            downloadServerFile(response.data, response.headers)
            return Promise.resolve()
          }
        } catch (error) {
          return Promise.reject(error)
        }
      } else {
        const code = response.data ? response.data.code : 400
        if (code === 401) {
          if (response.request.responseURL.indexOf('api/users/actions/login') === -1) {
            removeToken()
            const message = response.data.message || '您的账号在另一处登录，您已被登出，点击确定跳转到登录页面!'
            MessageBox.confirm(message, '账号退出提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true,
              showClose: false,
              showCancelButton: false,
              closeOnClickModal: false,
              closeOnHashChange: false,
              closeOnPressEscape: false
            }).then(() => {
              Loading.service(loadingOptions)
              store.dispatch('LogOut').then(() => {
                location.reload()
              }).catch(e => {
                location.reload()
              })
            }).catch(() => {
              Loading.service(loadingOptions)
              store.dispatch('LogOut').then(() => {
                location.reload()
              }).catch(e => {
                location.reload()
              })
            })
          }
          return Promise.reject(response.data)
        }
        if (code < 200 || code > 300) {
          if (code === 500) {
            Message.error({
              message: '系统错误:' + response.data.message,
              type: 'error',
              duration: 5 * 1000,
              showClose: true
            })
          } else if (response.data.message !== '') {
            Message.error({
              message: response.data.message,
              type: 'error',
              duration: 5 * 1000,
              showClose: true
            })
          }
          return Promise.reject(response.data)
        } else {
          return response.data.data
        }
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
      showClose: true
    })
    return Promise.reject(error)
  }
)

export default service
