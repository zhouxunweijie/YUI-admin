<template>
  <pre class="txt_Group" v-text="txt"></pre>
</template>

<script setup>
import { ref } from 'vue';
let props = defineProps({
  url: {
    type: String,
    default: '',
  },
});
let txt = ref('');
let getData = async () => {
  txt.value = await (await fetch(props.url)).text();
  console.log(txt);
};
getData();
</script>
<style scoped lang="scss">
.txt_Group {
  height: 100%;
  overflow: auto;
}
</style>
