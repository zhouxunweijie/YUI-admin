export const token = '123456789123456789';

export const userData = {
  username: '测试账号',
  userId: '987654321',
  id: 1,
  icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202010%2F13%2F20201013234041_31496.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668154498&t=3bf94ef792962e023c7858e1b2af2cd6',
};

// name 属性必须配置并且不能重复，这是用于menu的唯一性和keep-alive的缓存,本项目的跳转也都是由name跳转的
// 为何不用path跳转？？？？  原因还是element-plus的menu组件之前可以用path当index，我这里就是不行，只能用name
let routeList = [
  {
    path: '/baseHome',
    name: 'baseHome',
    title: '首页',
    isFixed: true, // 是否固定显示
    keepAlive: false, // 是否缓存 (默认不缓存)
    component: 'baseHome/index',
    icon: 'i-shenghuo',
    type: '1',
  },
  {
    title: '通用组件',
    icon: 'i-zhishi',
    children: [
      {
        path: '/FullScreen',
        name: 'FullScreen',
        title: '全屏组件',
        keepAlive: true,
        component: 'components/FullScreen/dome',
        icon: 'i-st_storage_port',
        type: '1',
      },
      {
        path: '/video',
        name: 'video',
        title: '视频播放器',
        component: 'components/video/dome',
        icon: 'i-st_storage_port',
        type: '1',
      },
    ],
  },
  {
    title: '公共方法',
    icon: 'i-zhishi',
    children: [
      {
        path: '/storage',
        name: 'storage',
        title: 'storage',
        component: 'utils/storage/index',
        icon: 'i-st_storage_port',
        type: '1',
      },
      {
        path: '/validate',
        name: 'validate',
        title: '校验方法',
        keepAlive: true, // 是否缓存 (默认不缓存)
        component: 'utils/validate/index',
        icon: 'i--xiaoyanguize',
        type: '1',
      },
      {
        path: '/crypto',
        name: 'crypto',
        title: '加密方法',
        component: 'utils/crypto/index',
        icon: 'i--xiaoyanguize',
        type: '1',
      },
    ],
  },
  {
    title: '配置文件',
    icon: 'i-yewubiaodanpeizhi',
    children: [
      {
        path: '/eslint',
        name: 'eslint',
        title: 'eslint',
        component: 'configurationFile/eslint/index',
        icon: 'i-eslint',
        type: '1',
      },
      {
        path: '/prettierrc',
        name: 'prettierrc',
        title: 'prettierrc',
        component: 'configurationFile/prettierrc/index',
        icon: 'i-prettier',
        type: '1',
      },
    ],
  },
  {
    path: 'https://www.baidu.com',
    name: 'baidu',
    title: '百度',
    icon: 'i-baidu',
    type: '2',
  },
  {
    path: '/test',
    name: 'test',
    title: '在新的窗口打开子路由',
    component: 'test/index',
    icon: 'i-caidan',
    type: '3',
  },
  {
    path: '/test',
    name: 'test',
    isTip: true,
    title: '这是一个非常非常非常非常非常非常非常非常长的菜单名',
    component: 'test/index',
    icon: 'i-caidan',
    type: '1',
  },
];

// 给菜单添加id
const _mapArr = (arr, index) => {
  arr.forEach((element, i) => {
    element.id = '' + index + i;
    if(element.children && element.children.length > 0) {
      element.children = _mapArr(element.children, i)
    }
  });
  return arr
}
export const routes = _mapArr(routeList, 0)