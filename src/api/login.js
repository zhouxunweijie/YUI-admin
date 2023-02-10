import request from '@/utils/request';

// 登录
export const login = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data: data,
  });
};

// 获取用户信息
export const getUser = (data) => {
  return request({
    url: '/getUser',
    method: 'post',
    data: data,
  });
};

// 获取路由信息
export const getRoutes = (data) => {
  return request({
    url: '/getRoutes',
    method: 'post',
    data: data,
  });
};
