import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { storage } from './utils'
import type { ApiResponse } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

/**
 * API客户端类
 */
class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // 请求拦截器 - 添加Token
    this.client.interceptors.request.use(
      (config) => {
        const token = storage.get<string>('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器 - 统一处理错误
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiResponse>) => {
        // Token过期，清除本地存储并跳转登录
        if (error.response?.status === 401) {
          storage.remove('token')
          storage.remove('user')
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
        }

        // 统一错误格式
        const message = error.response?.data?.message || error.message || '请求失败'
        return Promise.reject(new Error(message))
      }
    )
  }

  /**
   * GET请求
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config)
    return response.data
  }

  /**
   * POST请求
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config)
    return response.data
  }

  /**
   * PUT请求
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config)
    return response.data
  }

  /**
   * DELETE请求
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config)
    return response.data
  }

  /**
   * 上传文件
   */
  async upload<T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    })
    return response.data
  }
}

// 导出单例
export const apiClient = new ApiClient()

// ==================== 认证API ====================

export const authApi = {
  /**
   * 注册
   */
  register: (data: { username: string; email: string; password: string; referralCode?: string }) =>
    apiClient.post('/api/auth/register', data),

  /**
   * 登录
   */
  login: (data: { email: string; password: string }) =>
    apiClient.post('/api/auth/login', data),

  /**
   * 刷新Token
   */
  refreshToken: () =>
    apiClient.post('/api/auth/refresh'),

  /**
   * 登出
   */
  logout: () =>
    apiClient.post('/api/auth/logout'),

  /**
   * 忘记密码
   */
  forgotPassword: (data: { email: string }) =>
    apiClient.post('/api/auth/forgot-password', data),

  /**
   * 重置密码
   */
  resetPassword: (data: { token: string; password: string }) =>
    apiClient.post('/api/auth/reset-password', data),
}

// ==================== 用户API ====================

export const userApi = {
  /**
   * 获取当前用户信息
   */
  getCurrentUser: () =>
    apiClient.get('/api/user/me'),

  /**
   * 更新个人资料
   */
  updateProfile: (data: any) =>
    apiClient.put('/api/user/profile', data),

  /**
   * 修改密码
   */
  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    apiClient.post('/api/user/change-password', data),

  /**
   * 上传头像
   */
  uploadAvatar: (file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)
    return apiClient.upload('/api/user/avatar', formData)
  },

  /**
   * 启用2FA
   */
  enable2FA: () =>
    apiClient.post('/api/user/2fa/enable'),

  /**
   * 验证2FA
   */
  verify2FA: (data: { code: string }) =>
    apiClient.post('/api/user/2fa/verify', data),

  /**
   * 禁用2FA
   */
  disable2FA: (data: { code: string }) =>
    apiClient.post('/api/user/2fa/disable', data),
}

// ==================== KYC API ====================

export const kycApi = {
  /**
   * 获取KYC状态
   */
  getStatus: () =>
    apiClient.get('/api/kyc/status'),

  /**
   * 提交KYC申请
   */
  submit: (data: any) =>
    apiClient.post('/api/kyc/submit', data),

  /**
   * 上传KYC文件
   */
  uploadFile: (file: File, fieldName: string) => {
    const formData = new FormData()
    formData.append(fieldName, file)
    return apiClient.upload('/api/kyc/upload', formData)
  },
}

// ==================== 市场API ====================

export const marketApi = {
  /**
   * 获取资产列表
   */
  getAssets: (params?: { type?: string; search?: string; sort?: string }) =>
    apiClient.get('/api/market/assets', { params }),

  /**
   * 获取资产详情
   */
  getAsset: (code: string) =>
    apiClient.get(`/api/market/assets/${code}`),

  /**
   * 获取K线数据
   */
  getKline: (code: string, interval: string, limit?: number) =>
    apiClient.get(`/api/market/kline/${code}`, { params: { interval, limit } }),

  /**
   * 获取盘口深度
   */
  getOrderBook: (code: string, limit?: number) =>
    apiClient.get(`/api/market/orderbook/${code}`, { params: { limit } }),

  /**
   * 获取最新成交
   */
  getRecentTrades: (code: string, limit?: number) =>
    apiClient.get(`/api/market/trades/${code}`, { params: { limit } }),

  /**
   * 获取24h行情
   */
  getTicker24h: (code?: string) =>
    apiClient.get('/api/market/ticker', { params: { code } }),
}

// ==================== 交易API ====================

export const tradeApi = {
  /**
   * 创建订单
   */
  createOrder: (data: any) =>
    apiClient.post('/api/trade/order', data),

  /**
   * 取消订单
   */
  cancelOrder: (orderId: string) =>
    apiClient.delete(`/api/trade/order/${orderId}`),

  /**
   * 获取订单详情
   */
  getOrder: (orderId: string) =>
    apiClient.get(`/api/trade/order/${orderId}`),

  /**
   * 获取订单列表
   */
  getOrders: (params?: any) =>
    apiClient.get('/api/trade/orders', { params }),

  /**
   * 获取当前委托
   */
  getActiveOrders: (params?: any) =>
    apiClient.get('/api/trade/orders/active', { params }),

  /**
   * 获取历史委托
   */
  getHistoryOrders: (params?: any) =>
    apiClient.get('/api/trade/orders/history', { params }),

  /**
   * 获取成交记录
   */
  getTrades: (params?: any) =>
    apiClient.get('/api/trade/trades', { params }),
}

// ==================== 钱包API ====================

export const walletApi = {
  /**
   * 获取钱包余额
   */
  getBalances: () =>
    apiClient.get('/api/wallet/balances'),

  /**
   * 获取充币地址
   */
  getDepositAddress: (currency: string, network?: string) =>
    apiClient.get('/api/wallet/deposit/address', { params: { currency, network } }),

  /**
   * 获取充币记录
   */
  getDepositHistory: (params?: any) =>
    apiClient.get('/api/wallet/deposit/history', { params }),

  /**
   * 提币
   */
  withdraw: (data: any) =>
    apiClient.post('/api/wallet/withdraw', data),

  /**
   * 获取提币记录
   */
  getWithdrawHistory: (params?: any) =>
    apiClient.get('/api/wallet/withdraw/history', { params }),

  /**
   * 获取资金流水
   */
  getTransactions: (params?: any) =>
    apiClient.get('/api/wallet/transactions', { params }),
}

// ==================== 资产API ====================

export const assetApi = {
  /**
   * 获取持仓列表
   */
  getPositions: () =>
    apiClient.get('/api/assets/positions'),

  /**
   * 获取收益分析
   */
  getProfitAnalysis: (params?: { period?: string }) =>
    apiClient.get('/api/assets/profit', { params }),
}

// ==================== 推荐API ====================

export const referralApi = {
  /**
   * 获取推荐统计
   */
  getStats: () =>
    apiClient.get('/api/referral/stats'),

  /**
   * 获取推荐记录
   */
  getRecords: (params?: any) =>
    apiClient.get('/api/referral/records', { params }),
}

// ==================== 管理员API ====================

export const adminApi = {
  // 用户管理
  users: {
    list: (params?: any) => apiClient.get('/api/admin/users', { params }),
    get: (id: string) => apiClient.get(`/api/admin/users/${id}`),
    update: (id: string, data: any) => apiClient.put(`/api/admin/users/${id}`, data),
    freeze: (id: string) => apiClient.post(`/api/admin/users/${id}/freeze`),
    unfreeze: (id: string) => apiClient.post(`/api/admin/users/${id}/unfreeze`),
    ban: (id: string) => apiClient.post(`/api/admin/users/${id}/ban`),
  },

  // KYC审核
  kyc: {
    list: (params?: any) => apiClient.get('/api/admin/kyc', { params }),
    get: (id: string) => apiClient.get(`/api/admin/kyc/${id}`),
    approve: (id: string) => apiClient.post(`/api/admin/kyc/${id}/approve`),
    reject: (id: string, data: { reason: string }) => apiClient.post(`/api/admin/kyc/${id}/reject`, data),
  },

  // 资产管理
  assets: {
    list: (params?: any) => apiClient.get('/api/admin/assets', { params }),
    get: (id: string) => apiClient.get(`/api/admin/assets/${id}`),
    create: (data: any) => apiClient.post('/api/admin/assets', data),
    update: (id: string, data: any) => apiClient.put(`/api/admin/assets/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/admin/assets/${id}`),
  },

  // 订单管理
  orders: {
    list: (params?: any) => apiClient.get('/api/admin/orders', { params }),
    get: (id: string) => apiClient.get(`/api/admin/orders/${id}`),
    cancel: (id: string) => apiClient.post(`/api/admin/orders/${id}/cancel`),
  },

  // 充提审核
  wallet: {
    depositList: (params?: any) => apiClient.get('/api/admin/wallet/deposits', { params }),
    withdrawList: (params?: any) => apiClient.get('/api/admin/wallet/withdraws', { params }),
    approveWithdraw: (id: string) => apiClient.post(`/api/admin/wallet/withdraws/${id}/approve`),
    rejectWithdraw: (id: string, data: { reason: string }) => apiClient.post(`/api/admin/wallet/withdraws/${id}/reject`, data),
  },

  // 统计
  stats: {
    platform: () => apiClient.get('/api/admin/stats/platform'),
    financial: (params?: any) => apiClient.get('/api/admin/stats/financial', { params }),
  },

  // 配置管理
  config: {
    get: () => apiClient.get('/api/admin/config'),
    update: (data: any) => apiClient.put('/api/admin/config', data),
  },

  // 公告管理
  announcements: {
    list: (params?: any) => apiClient.get('/api/admin/announcements', { params }),
    get: (id: string) => apiClient.get(`/api/admin/announcements/${id}`),
    create: (data: any) => apiClient.post('/api/admin/announcements', data),
    update: (id: string, data: any) => apiClient.put(`/api/admin/announcements/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/admin/announcements/${id}`),
  },
}
