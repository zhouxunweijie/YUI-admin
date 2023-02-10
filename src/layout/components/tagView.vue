<!--  -->
<template>
  <div class="tagView_group">
    <div class="tagView_utils">
      <!-- <el-button icon="Back"  size="small"/> -->
      <div class="tagView_scroll">
        <el-scrollbar @wheel.prevent="onmousewheel" ref="scrollContainer">
          <div class="tagView">
            <div
              class="tagView_item"
              :class="{ 'is-active': path === el.name }"
              @click.left="open(el.name)"
              @click.prevent.right="contextmenu($event, el.name)"
              v-for="el in tagViews"
              :key="'' + el.id || el.path"
            >
              {{ el.title }}
              <el-icon v-if="!el.isFixed" @click.stop="closeCurrent(el.name)">
                <Close />
              </el-icon>
            </div>
          </div>
        </el-scrollbar>
      </div>

      <Teleport to="body">
        <ul
          v-if="isShow"
          class="el-dropdown-menu"
          :style="{ left: left + 'px', top: top + 'px' }"
        >
          <li class="el-dropdown-menu__item" @click.stop="refreshFn">刷新</li>
          <li class="el-dropdown-menu__item" @click.stop="closeCurrent(null)">
            关闭当前
          </li>
          <li class="el-dropdown-menu__item" @click.stop="rest">关闭其他</li>
        </ul>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { init } from '@/hooks/common.js';
import { Close } from '@element-plus/icons-vue';
import { refresh } from '@/utils/router.js';
let { base, route, router } = init();

/**
 * 点击切换展示标签
 * */
let path = computed(() => route.name);
let open = (name) => {
  router.push({
    name,
  });
};

/**
 * 滚动滚轮滚动标签栏
 * */
let scrollContainer = ref(); // 滚动组件
let scrollWrap = computed(() => scrollContainer.value.wrap$); // 滚动容器

// 滚轮滚动时
let onmousewheel = ($event, el) => {
  scrollWrap.value.scrollLeft =
    scrollWrap.value.scrollLeft - $event.wheelDelta / 4;
};

/**
 * 点击右键打开操作面板
 * */
let isShow = ref(false);
let left = ref(0);
let top = ref(0);
let activeName = ref('');

let contextmenu = ($event, el) => {
  activeName.value = el;
  isShow.value = true;
  left.value = $event.clientX + 10;
  top.value = $event.clientY + 10;
  return false;
};
// 关闭tagView操作框
let closeContextMenu = (e) => {
  isShow.value = false;
};

onMounted(() => {
  console.log('挂载');
  base.setDefaultTagView();
  document.addEventListener('click', closeContextMenu);
});

onBeforeUnmount(() => {
  document.addEventListener('click', closeContextMenu);
});

// 刷新当前页
let refreshFn = (tag) => {
  refresh(activeName.value);
  isShow.value = false;
};
// 关闭当前页
let closeCurrent = (name) => {
  base.delTagView(name || activeName.value);
  isShow.value = false;
};
// 关闭其他页
let rest = () => {
  let delArr = base.tagViews.filter(
    (item) => item.name !== activeName.value && !item.isFixed,
  );
  delArr.forEach((el) => {
    base.delTagView(el.name);
  });
  isShow.value = false;
};

let tagViews = computed(() => base.tagViews);
</script>
<style lang="scss" scoped>
.tagView_group {
  height: $tagView;
  width: calc(100vw - $asideW);
  border-bottom: 1px solid var(--el-menu-border-color);
  user-select: none;
  transition: all var(--el-transition-duration);

  .tagView_utils {
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tagView_scroll {
      width: 100%;
      overflow: hidden;
      height: 26px;
      display: flex;
      padding-right: 4px;

      ::v-deep(.el-scrollbar__view) {
        height: 100%;
      }

      .tagView {
        height: 100%;
        display: flex;
        align-items: center;

        .tagView_item {
          height: 26px;
          line-height: 25px;
          font-size: 12px;
          margin: 0 2px;
          border: 1px solid #d9d9d9;
          border-radius: 2px;
          padding: 0 10px !important;
          border-color: var(--el-border-color);
          background-color: var(--navbarThemeColor);
          color: var(--el-text-color-primary);
          display: flex;
          align-items: center;
          justify-content: space-between;
          white-space: nowrap;

          .el-icon {
            width: 0px;
            transition: all var(--el-transition-duration)
              cubic-bezier(0.645, 0.045, 0.355, 1);
            cursor: pointer;
          }
          .el-icon:hover {
            margin-left: 5px;
            border-radius: 50%;
            background-color: var(--el-text-color-placeholder);
            color: #fff;
          }
          &:hover {
            color: $systemColor;
            border-color: $systemColor;
          }
          &:hover .el-icon {
            margin-left: 5px;
            width: 12px;
          }

          &.is-active {
            border-color: $systemColor;
            background-color: $systemColor;
            color: #ffffff;

            .el-icon {
              width: 12px;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }

  ::v-deep(.el-tabs) {
    --el-tabs-header-height: 26px;
  }
  ::v-deep(.el-tabs__header) {
    margin: 0;
  }
}

.el-dropdown-menu {
  position: fixed;
  border: 1px solid var(--el-menu-border-color);
  .el-dropdown-menu__item {
    &:hover {
      background-color: var(--el-menu-hover-bg-color);
    }
  }
}
</style>
