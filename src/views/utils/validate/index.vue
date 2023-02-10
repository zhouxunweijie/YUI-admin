<template>
  <div class="github-markdown-body">
    <pre><div class="flex"><span>是否为链接</span><span>isLink(val)</span></div>
<div class="flex"><span>判断是否为纯数字</span><span>isNumber(val)</span></div>
<div class="flex"><span>判断是否为纯中文</span><span>isCn(val)</span></div>
<div class="flex"><span>开始和结束不能以空格结尾，不能只有空格</span><span>isS(val)</span></div>
<div class="flex"><span>验证是否为json格式 <a href="https://stackoverflow.com/questions/2583472/regex-to-validate-json" target="_blank">https://stackoverflow.com/questions/2583472/regex-to-validate-json</a></span><span>isJson(val)</span></div>
<div class="flex"><span>验证是否为车牌号</span><span>isPlateNumber(val)</span></div>
<div class="flex"><span>手机号</span><span>phone(val)</span></div>
<div class="flex"><span>座机</span><span>tel(val)</span></div>
<div class="flex"><span>email</span><span>email(val)</span></div>
<div class="flex"><span>身份证</span><span>card(val)</span></div>
<div class="flex"><span>密码</span><span>pwd(val)</span></div>
<div class="flex"><span>是否包含中文</span><span>cn(val)</span></div>
<div class="flex"><span>金额(小数后两位,可以为0)</span><span>money(val)</span></div>
<div class="flex"><span>输入是否为空</span><span>empty(val)</span></div>
<div class="flex"><span>对比开始和结束时间</span><span>timeComparison(beginTime, endTime)</span></div>
<div class="flex"><span>当前日期是否在开始和结束时间范围内</span><span>timeComparisonDate(beginTime, endTime, nowTime)</span></div></pre>
    <pre>
使用方法:
    import { isLink } from '@/utils/validate.js';
    </pre>
  </div>
</template>

<script>
export default {
  name: 'validate',
};
</script>

<script setup>
import { ref } from 'vue';
import { initScroll } from '@/hooks/common';
initScroll();
</script>
<style scoped lang="scss">
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
