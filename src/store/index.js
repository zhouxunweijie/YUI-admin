import { createPinia } from 'pinia';
// 引入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia();

// 使用该插件
pinia.use(piniaPluginPersistedstate);
// pinia.use(({ store }) => {
//   store.$subscribe(() => {
//     // 在存储变化的时候执行
//     console.log('$subscribe', store);
//   });
//   store.$onAction(() => {
//     // 在 action 的时候执行
//     console.log('action', store);
//   });
// });

export default pinia;
