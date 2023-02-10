<template>
  <div class="bg"></div>
  <!-- 登录窗口 -->
  <div class="submitGroup">
    <el-form ref="formRef" :model="submitData" :rules="rules" status-icon>
      <el-form-item prop="username">
        <el-input
          v-model="submitData.username"
          :prefix-icon="User"
          placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="submitData.password"
          :prefix-icon="Lock"
          placeholder="请输入密码"
          :type="isShowPassword ? 'text' : 'password'"
        >
          <template #suffix>
            <el-icon
              @click="isShowPassword = !isShowPassword"
              class="el-input__icon"
            >
              <Hide v-if="!isShowPassword" />
              <View v-if="isShowPassword" />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm(formRef)"
          style="width: 100%"
          round
          :loading="loading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Lock, User, View, Hide } from '@element-plus/icons-vue';
import { login } from '@/api/login.js';
import { init } from '@/hooks/common';
import { setL } from '@/utils/storage';
import { routes } from '@/router';
import { flatten } from '@/utils/router';

let { base, router } = init();
let formRef = ref();
// 表单数据
let submitData = ref({
  username: 'admin',
  password: '123456',
});
// 表单验证规则
let rules = reactive({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 5, max: 20, message: '字数要在5-20之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 5, max: 20, message: '字数要在5-20之间', trigger: 'blur' },
  ],
});
// 是否显示密码
let isShowPassword = ref(false);
// 是否登录中
let loading = ref(false);
// 登录函数
let submitForm = async (formRef) => {
  await formRef.validate((flag) => {
    if (flag) {
      loading.value = true;
      // 登录
      login(submitData.value).then(async (res) => {
        // 储存登录信息
        base.setToken(res.data);
        setL('token', res.data);
        await base.getRoutes();
        router.replace({ path: '/' });
        loading.value = false;
      });
    }
  });
};

onMounted(() => {
  if (router.getRoutes().length > flatten(routes).length) {
    router.removeRoute('layout');
  }
});
</script>
<style lang="scss" scoped>
.bg {
  background-image: url('../../public/img/bg.jpg');
  background-size: 100%;
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(3px);
}
.submitGroup {
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .user_img {
    width: 50px;
    height: 50px;
    margin-bottom: 18px;
  }
  :deep(.el-input__wrapper) {
    overflow: hidden;
    border-radius: 40px;
  }
}
</style>
