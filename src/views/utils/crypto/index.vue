<template>
  <div>
    <div class="github-markdown-body">
      <pre>
AES实现思路: 
    在当前用户登录之后,用当前用户的id当做AES加密的秘钥(秘钥使用SHA256(id)64位字符串,偏移量使用MD5_32(id)32位字符串),
    使用当前用户的信息作为秘钥是为了读取localstorage内容时,当前用户登录的才能够读取到加密的东西,如果不需要做用户区分可以使用浏览器版本等信息做秘钥,或者不加密
    AES这里主要是为了前端进行加密使用
      </pre>
      <pre>
RSA实现思路: 
    在当前用户登录之后,通过接口获取私钥和秘钥,前端公钥A对应后台私钥A,前端私钥B对应后台公钥B,公钥A用于加密,私钥用于解密
      </pre>
      <pre>
使用方法: 
setL(AES_KEY, BASE64_E(base.userinfo.id));

setL(RSA_D_KEY, BASE64_E(privateKey));

setL(RSA_E_KEY, BASE64_E(publicKey));

AES_KEY: 储存在localstorage中AES秘钥的key,设置时需转为base64格式
RSA_D_KEY: 储存在localstorage中RSA私钥的key,设置时需转为base64格式
RSA_E_KEY: 储存在localstorage中RSA公钥的key,设置时需转为base64格式
注: 这三个值可以在crypto.js中设置
      </pre>
      <pre>报错提示可以在crypto文件中修改isLog变量更改 true为显示报错信息</pre>
    </div>

    <el-input v-model="value" type="textarea" clearable></el-input>
    <el-descriptions title="加密方式" :column="1">
      <el-descriptions-item label="MD5_32">{{
        MD5_32(value)
      }}</el-descriptions-item>
      <el-descriptions-item label="MD5_16">{{
        MD5_16(value)
      }}</el-descriptions-item>
      <el-descriptions-item label="SHA1">{{
        SHA1(value)
      }}</el-descriptions-item>
      <el-descriptions-item label="SHA256">{{
        SHA256(value)
      }}</el-descriptions-item>
      <el-descriptions-item label="BASE64_E">{{
        BASE64_E(value)
      }}</el-descriptions-item>
      <el-descriptions-item label="AES_E">{{
        AES_E(value)
      }}</el-descriptions-item>
      <el-descriptions-item label="RSA_E">{{
        RSA_E(value)
      }}</el-descriptions-item>
    </el-descriptions>
    <!-- BASE64_D -->
    <h5 style="margin-bottom: 5px">BASE64_D</h5>
    <el-input v-model="BASE64_D_VALUE" type="textarea" clearable></el-input>
    <el-descriptions :column="1">
      <el-descriptions-item label="解密结果:">{{
        BASE64_D(BASE64_D_VALUE)
      }}</el-descriptions-item>
    </el-descriptions>

    <!-- AES_D -->
    <h5 style="margin-bottom: 5px">AES_D</h5>
    <el-input v-model="AES_D_VALUE" type="textarea" clearable></el-input>
    <el-descriptions :column="1">
      <el-descriptions-item label="解密结果:">{{
        AES_D(AES_D_VALUE)
      }}</el-descriptions-item>
    </el-descriptions>

    <!-- RSA_D -->
    <h5 style="margin-bottom: 5px">RSA_D</h5>
    <el-input
      v-model="RSA_D_VALUE"
      type="textarea"
      clearable
      :rows="8"
    ></el-input>
    <el-descriptions :column="1">
      <el-descriptions-item label="解密结果:">{{
        RSA_D(RSA_D_VALUE)
      }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { setL } from '@/utils/storage';
import {
  MD5_32,
  MD5_16,
  SHA1,
  SHA256,
  BASE64_E,
  BASE64_D,
  AES_E,
  AES_D,
  RSA_E,
  RSA_D,
  AES_KEY,
  RSA_E_KEY,
  RSA_D_KEY,
  getRsaKeys,
} from '@/utils/crypto.js';
import { init, initScroll } from '@/hooks/common';
initScroll();
let { base } = init();
let value = ref('');
let value1 = ref('');
let BASE64_D_VALUE = ref('');
let AES_D_VALUE = ref('');
let RSA_D_VALUE = ref('');

// // 当前赋值应该放在登录
getRsaKeys((privateKey, publicKey) => {
  setL(AES_KEY, BASE64_E(base.userinfo.id));

  setL(RSA_D_KEY, BASE64_E(privateKey));

  setL(RSA_E_KEY, BASE64_E(publicKey));
});
</script>
<style scoped lang="scss"></style>
