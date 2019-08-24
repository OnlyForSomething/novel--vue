import CryptoJS from 'crypto-js'
// const CryptoJS = require('crypto-js') // 引用AES源码js
// const key = CryptoJS.enc.Utf8.parse('ZGIyYzlmZTA2OA==')
// const iv = CryptoJS.enc.Utf8.parse('==AO2ATZmlzYyIGZ')
export default {
  install: function (Vue, opt) {
    Vue.mixin({ /*  注入组件选项
               若其他组件中有validateAccount就不会执行本插件中的这个validateAccount，没有才会执行插件中的。
               其实就是同名先执行组件本身中的方法。 插件中的方法和正常写在组件内部methods属性里面的方法使用方式一样，
               注入其实就是和写在内部methods中等同 */
      methods: {
        /* 加密方法
        * key: 密钥
        * iv: 密钥偏移量
        * */
        Encrypt: function (word, aes_key, aes_iv) {
          let key = CryptoJS.enc.Utf8.parse(aes_key) // utf8转码获取十六进制编码byte[]
          let iv = CryptoJS.enc.Utf8.parse(aes_iv)
          // console.log(aes_key === key)
          // console.log(aes_iv === iv)
          // console.log('aes_key:' + aes_key + '   aes_iv:' + aes_iv)
          // console.log('key:' + key + '  iv:' + iv)
          let srcs = CryptoJS.enc.Utf8.parse(word)
          let encrypted = CryptoJS.AES.encrypt(srcs, key,
            {
              iv: iv,
              mode: CryptoJS.mode.CBC, // 加密模式
              padding: CryptoJS.pad.Pkcs7 // 填充方式
            })
          return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
        },
        // 解密方法
        Decrypt: function (word, key, iv) {
          let encryptedHexStr = CryptoJS.enc.Hex.parse(word) // 转为十六进制
          let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)// 密文转为Base64的字符串 只有Base64类型的字符串密文才能对其进行解密
          let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
          let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
          return decryptedStr.toString()
        },
        getEncryptParams: function () {
          this.$axios.get('api/secret')
            .then(res => {
              this.aes_key = res.data[0]
              this.aes_iv = res.data[1]
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    })
  }
}
