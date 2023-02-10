import { token, userData, routes } from './data/user.js';

export default [
  {
    url: '/login',
    method: 'post',
    response: () => ({
      code: '200',
      msg: '登录成功',
      data: token,
    }),
  },
  {
    url: '/getUser',
    method: 'post',
    response: () => ({
      code: '200',
      msg: '获取成功',
      data: userData,
    }),
  },
  {
    url: '/getRoutes',
    method: 'post',
    response: () => ({
      code: '200',
      msg: '获取成功',
      data: routes,
    }),
  },
];
