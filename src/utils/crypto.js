import CryptoJS from "crypto-js";
import JSEncrypt from 'jsencrypt';
import { getL } from './storage';

const isLog = true; // 默认打开加密报错提示
// 写死加解密所需要的秘钥(对应localstorage里Key的值)
export const AES_KEY = 'A'; // AES秘钥
export const RSA_E_KEY = 'E' // RSA公钥-加密
export const RSA_D_KEY = 'D' // RSA私钥-解密

// ########################################  不可逆加密  ######################################################

// md5加密(返回32位字符串)
export const MD5_32 = (str) => {
  return str ? CryptoJS.MD5(str).toString() : ''
}

// md5加密(返回16位字符串)
export const MD5_16 = (str) => {
  return str ? CryptoJS.MD5(str).toString().substring(8, 24) : '';
}

// SHA1加密(返回40位字符串)
export const SHA1 = (str) => {
  return str ? CryptoJS.SHA1(str).toString() : '';
}

// SHA256加密(返回64位字符串)
export const SHA256 = (str) => {
  return str ? CryptoJS.SHA256(str).toString() : '';
}

// ########################################  可逆加密  ######################################################


// BASE64加密
export const BASE64_E = (str) => {
  str = JSON.stringify(str);
  return str ? CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str)) : ''
}

// BASE64解密
export const BASE64_D = (str) => {
  try {
    return str ? CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8) : ''
  } catch (e) {
    isLog && console.error('BASE64解密失败' + str)
    return ''
  }
}

// AES加密 对称加密
// 获取秘钥
const _getK = (data) => {
  let KEY = BASE64_D(getL(AES_KEY));
  let Obj = {
    // 十六位十六进制数作为密钥
    SECRET_KEY: CryptoJS.enc.Utf8.parse(SHA256(KEY)),
    // 十六位十六进制数作为钥偏移量密
    SECRET_IV: CryptoJS.enc.Utf8.parse(MD5_32(KEY)),
    flag: true
  }

  if (!KEY) {
    isLog && console.error('AES秘钥为空')
    Obj.flag = false
  }

  if (!data) {
    isLog && console.error('AES内容为空')
    Obj.flag = false
  }

  return Obj
}
/**
* 加密方法
* @param data
* @returns {string}
*/
export const AES_E = (data) => {
  let { SECRET_KEY, SECRET_IV, flag } = _getK(data);
  if (flag) {
    if (typeof data === "object") {
      try {
        data = JSON.stringify(data);
      } catch (error) {
        isLog && console.error("AES加密参数错误:" + data);
      }
    }
    const dataHex = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
      iv: SECRET_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
  }

  return ''
}
/**
* 解密方法
* @param data
* @returns {string}
*/
export const AES_D = (data) => {
  try {
    let { SECRET_KEY, SECRET_IV, flag } = _getK(data);
    if (flag) {
      const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
      const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
      const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
      return decryptedStr.toString();
    }

    return ''
  } catch (e) {
    isLog && console.error('AES解密失败: ' + data);
    return ''
  }

}

// RSA加密 非对称加密
/**
  * 项目初始化的时候需要在后台获取私钥和公钥，
  * 前端向后台发送数据用A公钥加密后传递，后台使用A私钥进行数据解密
  * 后台向前端传递数据时用B公钥加密后传递，前端使用B私钥进行数据解密
  */
// 加密
export const RSA_E = (str) => {
  let publicKey = BASE64_D(getL(RSA_E_KEY));
  if (!publicKey) {
    isLog && console.error('RSA加密公钥为空')
    return ''
  }
  if (!str) {
    isLog && console.error('RSA加密内容为空')
    return ''
  }
  if (typeof str === 'object') {
    str = JSON.stringify(str)
  }
  var encryptor = new JSEncrypt()  // 创建加密对象实例
  encryptor.setPublicKey(publicKey)//设置公钥
  return encryptor.encrypt(str)  // 对内容进行加密
}

// 解密
export const RSA_D = (str) => {
  try {
    let privateKey = BASE64_D(getL(RSA_D_KEY));
    if (!privateKey) {
      isLog && console.error('RSA解密私钥为空')
      return ''
    }
    if (!str) {
      isLog && console.error('RSA解密内容为空')
      return ''
    }
    var decrypt = new JSEncrypt()//创建解密对象实例  
    decrypt.setPrivateKey(privateKey)//设置秘钥
    return decrypt.decrypt(str)//解密之前拿公钥加密的内容
  } catch (e) {
    isLog && console.error('RSA解密失败: ' + str);
    return ''
  }
}

/**
 * ###################################################    start     ###########################################################
 * 获取RSA加密方式公钥和私钥
 * @param func 回调函数
 * @return privateKey 私钥 publicKey 公钥
 */
// 
export function getRsaKeys(func) {
  window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048, //can be 1024, 2048, or 4096
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: "SHA-512" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
    },
    true, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
  ).then(function (key) {
    window.crypto.subtle.exportKey(
      "pkcs8",
      key.privateKey
    ).then(function (keydata1) {
      window.crypto.subtle.exportKey(
        "spki",
        key.publicKey
      ).then(function (keydata2) {
        var privateKey = RSA2text(keydata1, 1);
        var publicKey = RSA2text(keydata2);
        func(privateKey, publicKey);
      }).catch(function (err) {
        console.error(err);
      });
    })
      .catch(function (err) {
        console.error(err);
      });
  })
    .catch(function (err) {
      console.error(err);
    });
}

// 将公钥私钥转换为base64格式
function RSA2text(buffer, isPrivate = 0) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  var base64 = window.btoa(binary);
  var text = "-----BEGIN " + (isPrivate ? "PRIVATE" : "PUBLIC") + " KEY-----\n";
  text += base64.replace(/[^\x00-\xff]/g, "$&\x01").replace(/.{64}\x01?/g, "$&\n");
  text += "\n-----END " + (isPrivate ? "PRIVATE" : "PUBLIC") + " KEY-----";
  return text;
}

// ##############################################       end      #################################################################