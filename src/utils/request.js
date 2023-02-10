import axios from 'axios';
import router from '@/router';
import { getL } from './storage';
import { ElMessage } from 'element-plus';
// const baseUrl = '/';

const service = axios.create({
  // baseURL: baseUrl,
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 请求前拦截器
service.interceptors.request.use((config) => {
  console.log(config, 'config');
  // 不是登录界面每次请求需要加上token验证用户信息
  if (config.url !== '/login') {
    // 登录成功
    let token = getL('token');
    if (token) {
      // 如果token存在，说明不需要登录
      config.headers['auth_token'] = token;
    } else {
      // 未登录或登录信息删除
      ElMessage({
        message: '获取登录信息失败，请重新登录',
        type: 'warning',
        onClose: () => {
          router.push({ path: '/login' });
        },
      });
    }
  }

  return config;
});

// 请求后拦截器
service.interceptors.response.use((response) => {
  return response.data;
});

export default service;
