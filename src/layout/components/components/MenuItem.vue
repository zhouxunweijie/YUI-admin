<!--  -->
<template>
  <el-sub-menu
    v-if="item.children && item.children.length > 0"
    :index="'' + item.id"
  >
    <template #title>
      <Iconfont :icon="item.icon" type="2" class="m5"></Iconfont>
      <el-tooltip
        effect="dark"
        :content="item.title"
        placement="right"
        v-if="item.isTip"
      >
        <span>{{ item.title }}</span>
      </el-tooltip>
      <span v-else>{{ item.title }}</span>
    </template>
    <menu-item v-for="el in item.children" :key="el.id" :item="el"></menu-item>
  </el-sub-menu>

  <el-menu-item v-else :index="'' + item.id">
    <Iconfont :icon="item.icon" type="2" class="m5"></Iconfont>
    <template #title>
      <el-tooltip
        effect="dark"
        :content="item.title"
        placement="right"
        v-if="item.isTip"
      >
        <span>{{ item.title }}</span>
      </el-tooltip>
      <span v-else>{{ item.title }}</span>
    </template>
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: ['item'],
};
</script>
<style lang="scss" scoped></style>
