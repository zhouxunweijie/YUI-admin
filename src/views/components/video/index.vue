<template>
  <FullScreen :isClickModel="false" ref="fullScreen">
    <div class="videoGroup">
      <div
        class="videoTitle"
        v-if="examples.isReady"
        :class="{ show: videoMousemoveStatus }"
      >
        测试
      </div>
      <video
        ref="video"
        class="video"
        :autoplay="examples.autoplay"
        :muted="examples.muted"
        :poster="examples.poster"
        :preload="examples.preload"
        :src="examples.src"
        @canplay="oncanplay"
        @ended="onended"
        @loadeddata="onloadeddata"
        @playing="onplaying"
        @timeupdate="ontimeupdate"
        @error="onerror"
        @mousemove="videoMousemove"
        @click="playChange"
      ></video>
      <div
        class="videoUtils flex"
        :class="{ show: videoMousemoveStatus }"
        @mouseover="videoUtilsMouseover"
        @mouseout="videoUtilsMouseout"
        v-if="examples.isReady"
      >
        <div class="left flex" @click="playChange">
          <img src="./icon/bofang.png" v-if="!examples.playStatus" />
          <img src="./icon/zanting.png" v-if="examples.playStatus" />
        </div>
        <div class="center flex">
          <span>{{ formatTime(examples.playSchedule) }}</span>
          <div class="sliderGroup">
            <el-slider
              v-model="examples.playSchedule"
              :max="examples.totalLength"
              size="small"
              :format-tooltip="formatTime"
              @change="sliderChange"
              @mousedown="sliderMousedown"
            />
          </div>
          <span>{{ formatTime(examples.totalLength) }}</span>
        </div>
        <div class="right flex">
          <!-- 音量 -->
          <el-popover
            trigger="hover"
            placement="top"
            :width="40"
            :show-arrow="false"
            popper-class="sliderBg"
          >
            <el-slider
              v-model="examples.volume"
              vertical
              height="80px"
              size="small"
            />
            <template #reference>
              <span class="flex" @click.stop="volumeChange">
                <img src="./icon/yl.png" v-if="!examples.muted" />
                <img src="./icon/yl1.png" v-if="examples.muted" />
              </span>
            </template>
          </el-popover>

          <!-- <img src="./icon/shezhi.png" /> -->
          <span class="multiple">
            <p>倍速</p>
            <ul>
              <li
                v-for="el in playbackRate"
                :class="{ active: el == examples.playbackRate }"
                @click="setPlaybackRate(el)"
              >
                {{ el }}
              </li>
            </ul>
          </span>
          <img
            src="./icon/bianda.png"
            v-if="!examples.isFull"
            @click="openFullScreen"
          />
          <img
            src="./icon/suoxiao.png"
            v-if="examples.isFull"
            @click="closeFullScreen"
          />
        </div>
      </div>

      <!-- 重新播放按钮 -->
      <img src="./icon/reset.png" class="reset" v-if="isReset" @click="reset" />

      <!-- 加载错误 -->
      <p class="error" v-if="isError">视频加载错误,请稍后重试...</p>
    </div>
  </FullScreen>
</template>

<script setup>
import { ref, reactive, onMounted, watchEffect } from 'vue';
import { formatTime } from '@/utils';
import { ElLoading, ElSlider, ElPopover } from 'element-plus';
import FullScreen from '@/views/components/FullScreen/index.vue';
let video = ref();
let fullScreen = ref();
let loadingInstance = null; // loading实例
let downSlider = false; // 记录当前是否在拖动进度条(解决长时间拖动自动设置进度条覆盖当前位置的bug)
let volumeDefault = ref(80); // 记录静音时的音量和默认音量
let videoMousemoveStatus = ref(false); // 工具栏是否显示
let playbackRate = [2.0, 1.5, 1.0, 0.75, 0.5];
let isReset = ref(false); // 是否显示重新播放按钮
let isError = ref(false); // 是否显示错误信息

// 当前播放状态
const examples = reactive({
  width: '320',
  height: '240',
  autoplay: false, // 加载完成是否自动播放
  muted: false, // 播放时是否静音
  playbackRate: 1.0, //播放速度
  poster: '', // 视频加载时显示的封面
  preload: 'auto', // 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性
  src: '', // 播放地址
  pauseTime: 0, // 暂停时间 这里用秒表示
  playStatus: false, // 当前播放状态
  playSchedule: 0, // 当前播放进度 单位秒
  totalLength: 0, // 视频总长度 这里用秒表示
  name: '', // 视频名称
  volume: 80, // 音量 0-100表示
  isFull: false, // 是否全屏
  isReady: false, // 视频已经加载完毕
});

// 初始化视频
let init = async (obj) => {
  // 初始化值
  for (let key in obj) {
    examples[key] = obj[key];
  }

  volumeDefault.value = examples.volume; // 设置默认音量
  openLoading();
};

// 当鼠标划入视频区域打开工具栏
let timer = null;
let setTimer = () => {
  timer = window.setTimeout(() => {
    videoMousemoveStatus.value = false;
  }, 3000);
};
let videoMousemove = (event) => {
  videoMousemoveStatus.value = true;
  window.clearTimeout(timer);
  setTimer();
};

// 鼠标移入工具栏
let videoUtilsMouseover = () => {
  window.clearTimeout(timer);
};
// 鼠标移出工具栏
let videoUtilsMouseout = () => {
  setTimer();
};

onMounted(() => {
  // 监听全局键盘事件
  document.onkeyup = (event) => {
    videoMousemoveStatus.value = true;
    window.clearTimeout(timer);
    if (examples.isReady) {
      switch (event.keyCode) {
        case 32: // 空格事件
          playChange();
          break;
        case 37: // <-- 左箭头事件
          video.value.currentTime = video.value.currentTime - 5;
          break;
        case 39: // --> 右箭头事件
          video.value.currentTime = video.value.currentTime + 5;
          break;
      }
    }

    setTimer();
  };

  // 监听音量变化
  watchEffect(() => {
    video.value.volume = examples.volume / 100;
  });
});
// 重新播放
let reset = () => {
  isReset.value = false;
  video.value.play();
};

// 设置播放速度
let setPlaybackRate = (data) => {
  examples.playbackRate = data;
  video.value.playbackRate = data;
};

// 打开全屏
let openFullScreen = () => {
  examples.isFull = true;
  fullScreen.value.open();
};

// 关闭全屏
let closeFullScreen = () => {
  examples.isFull = false;
  fullScreen.value.close();
};

// 改变当前播放状态
let playChange = () => {
  isReset.value = false; // 视频播放完可以点击空格重新播放，需要关闭重播按钮
  examples.playStatus = !examples.playStatus;
  if (examples.playStatus) {
    video.value.play();
  } else {
    video.value.pause();
  }
};

// 通过拖拽改变视频播放位置
let sliderChange = (value) => {
  downSlider = false;
  video.value.currentTime = value;
};

// 点击音量设置静音或打开声音
let volumeChange = () => {
  examples.muted = !examples.muted;
  if (!examples.muted) {
    examples.volume = volumeDefault.value;
  } else {
    examples.volume = 0;
  }
};

// 进度条按下事件
let sliderMousedown = (event) => {
  downSlider = true;
};

// 当媒介能够开始播放但可能因缓冲而需要停止时运行脚本
let oncanplay = (event) => {
  examples.totalLength = Math.round(event.target.duration);
  examples.isReady = true;
  loadingInstance.close();
  console.log('当媒介能够开始播放但可能因缓冲而需要停止时运行脚本');
};

// 当媒介已抵达结尾时运行脚本
let onended = () => {
  console.log('当媒介已抵达结尾时运行脚本');
  examples.playStatus = false;
  isReset.value = true; // 显示重新播放按钮
};
// 当加载媒介数据时运行脚本
let onloadeddata = () => {
  isError.value = false;
  console.log('当加载媒介数据时运行脚本');
};

// 	当媒介数据已开始播放时运行脚本
let onplaying = () => {
  // if (!examples.playStatus) {
  //   examples.playStatus = true;
  // }
  console.log('	当媒介数据已开始播放时运行脚本');
};
// 当媒介改变其播放位置时运行脚本
let ontimeupdate = (event) => {
  // 拖动进度条时禁止设置进度条
  if (!downSlider) {
    examples.playSchedule = Math.floor(event.target.currentTime);
  }

  console.log('当媒介改变其播放位置时运行脚本');
};
// 当发生错误时运行脚本
let onerror = () => {
  if (examples.src) {
    // 判断当前是否已经传入url
    loadingInstance.close();
    isError.value = true;
  }
  console.log('当发生错误时运行脚本');
};

let openLoading = () => {
  loadingInstance = ElLoading.service({
    target: video.value.parentNode,
    background: '#000',
    text: '视频加载中...',
  });
};

// 暴露给外面的方法及属性
defineExpose({
  init,
  examples,
  video,
});
</script>

<style lang="scss">
.sliderBg {
  // 覆盖全局elementplus的slider组件样式
  padding: 5px !important;
  min-width: 0px !important;
  background-color: rgba($color: #fff, $alpha: 0.1) !important;
  border: none !important;
  .el-slider__runway {
    margin: 0 12px !important;
  }
  .el-slider {
    --el-slider-button-size: 16px;
  }
}

.videoGroup .el-slider {
  --el-slider-button-size: 16px;
}
</style>

<style scoped lang="scss">
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.videoGroup {
  // aspect-ratio: 16/9;
  background-color: black;
  color: #c4c4c4;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;

  .videoTitle {
    position: absolute;
    top: -38px;
    left: 0;
    width: 100%;
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    padding: 0 10px;
    background-color: rgba($color: #000, $alpha: 0.6);
    text-align: center;
    z-index: 1;
    transition: transform 0.3s;
    opacity: 0;

    &.show {
      transform: translateY(38px);
      opacity: 1;
    }
  }
  .video {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .videoUtils {
    position: absolute;
    bottom: -38px;
    left: 0;
    width: 100%;
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    padding: 0 10px;
    background-color: rgba($color: #000, $alpha: 0.6);
    text-align: center;
    transition: transform 0.3s;
    user-select: none;
    opacity: 0;
    &.show {
      transform: translateY(-38px);
      opacity: 1;
    }

    .multiple {
      cursor: pointer;
      font-size: 12px;
      position: relative;
      p {
        margin: 0;
      }
      &:hover ul {
        display: block;
      }
      ul {
        display: none;
        position: absolute;
        bottom: 38px;
        right: 50%;
        z-index: 100;
        font-size: 14px;
        background-color: rgba($color: #000, $alpha: 0.6);
        list-style: none;
        margin: 0;
        padding: 0;
        line-height: 24px;
        border-radius: 3px;
        transform: translateX(50%);
        li {
          padding: 0 10px;
          &:hover {
            background-color: rgba($color: #fff, $alpha: 0.3);
          }
          &.active {
            background-color: rgba($color: #fff, $alpha: 0.3);
          }
        }
      }
    }

    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .left {
      width: 30px;
    }

    .center {
      width: calc(100% - 30px - 90px);
      height: 100%;
      padding: 0 10px;
      font-size: 14px;

      .sliderGroup {
        flex: 1;
        margin: 0 15px;
      }
    }

    .right {
      width: 90px;
    }
  }

  .reset {
    position: absolute;
    width: 40px;
    height: 40px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  .error {
    background-color: rgb(0 0 0 / 50%);
    border-radius: 5px;
    padding: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    font-size: 14px;
    color: #fff;
  }
}
</style>
