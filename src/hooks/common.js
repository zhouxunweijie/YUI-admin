import { useBaseStore } from '@/store/base';
import { useCommonStore } from '@/store/common';
import router from '@/router';
import { useRoute } from 'vue-router';
import pinia from '@/store';
import { reactive, onActivated, onDeactivated, onMounted } from 'vue';
import mitt from '@/config/mitt';

export const init = () => {
  let base = useBaseStore(pinia);
  let common = useCommonStore(pinia);
  let route = useRoute();
  return {
    base,
    common,
    route,
    router,
  };
};

/**
 * 对KeepAlive缓存的页面进行滚动条记录
 */
export const initScroll = () => {
  // let route = useRoute();
  // 当前组件设置为缓存时保存滚动条信息
  // if(route.meta.keepAlive) {


    let offset = reactive({
      left: 0,
      top: 0
    })
    
    onMounted(() => {
      mitt.emit('scrollChange', offset)
    })

    onActivated(() => {
      mitt.emit('scrollChange', offset)
    })
  
    onDeactivated(() => {
      mitt.emit('getOffset', (obj) => {
        offset.left = obj.left;
        offset.top = obj.top;
      })
    })
  // }
}