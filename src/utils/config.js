import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import qs from 'qs'

const service = axios.create({
  baseURL: '', // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.accessToken && store.getters.refreshToken) {
    //   if (getAccessToken()) {
    //     config.headers['Authorization'] = store.getters.accessToken
    //   }
    //   if (getRefreshToken()) {
    //     config.headers['RefreshToken'] = getRefreshToken()
    //   }
    // }
    return config
  },
  error => {
    // do something with request error
    // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    // const res = response.data
    //
    // // if the custom code is not 200, it is judged as an error.
    // if (response.status !== 200) {
    //   Message({
    //     message: res.msg || 'Error',
    //     type: 'error',
    //     duration: 3 * 1000
    //   })
    //   return Promise.reject(new Error(res.msg || 'Error'))
    // } else {
    //   return response
    // }
    return response
  },
  error => {
    // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export function get(url, params) {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    service.post(url, JSON.stringify(params), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function postForm(url, params, arrayFormat) {
  return new Promise((resolve, reject) => {
    service.post(url, qs.stringify(params, arrayFormat))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
