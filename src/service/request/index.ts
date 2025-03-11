import axios, { AxiosHeaders } from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { HYRequestConfig } from './type'

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class HYRequest {
  instance: AxiosInstance

  constructor(config: HYRequestConfig) {
    // 创建 Axios 实例
    this.instance = axios.create(config)

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 确保 headers 不为 undefined，并设置默认值
        config.headers = config.headers || new AxiosHeaders()
        return config
      },
      (err) => {
        return err
      },
    )

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      },
    )

    // 添加实例拦截器（针对当前实例的拦截器）
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailureFn,
      )
      this.instance.interceptors.response.use(
        config.interceptors.responseSuccessFn,
        config.interceptors.responseFailureFn,
      )
    }
  }

  // 封装请求方法
  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    // 单次请求的成功拦截器
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(
        config as InternalAxiosRequestConfig,
      ) as HYRequestConfig<T>
    }

    // 确保 headers 不为 undefined，并设置默认值
    config.headers = config.headers || new AxiosHeaders()

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截器
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // GET 请求
  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  // POST 请求
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  // DELETE 请求
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  // PATCH 请求
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest

