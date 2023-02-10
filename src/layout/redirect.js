// 当前页面是为了刷新页面使用
import { h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
  setup() {
    let route = useRoute();
    let router = useRouter();
    const { params, query } = route;
    const { name } = params;
    router.replace({ name, query });
    console.log(router, 'router');
    return () => {
      return h('div', '');
    };
  },
};
