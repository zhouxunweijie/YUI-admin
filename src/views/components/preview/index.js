import { createApp } from "vue";

import Index from './index.vue';


export default function Preview(option) {
  const dom = document.createDocumentFragment();
  const app = createApp(Index, option);

  app.mount(dom)

  document.body.appendChild(dom)

  return {
    el: dom
  }
}