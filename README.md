# my-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader)

问题集：
--------------------- ---------------------
2019-7-10
Error in event handler for "input": "TypeError: Cannot read property 'value' of undefined"
将el-input作为一个components组件时 父组件使用该子组件时 el-input无法输入值
解决：将子组件(inputGroup)中该输入事件的  @input="$emit( 'input',$event.target.value)"改为 @input="$emit( 'input',$event)"
但是：why？(没弄清原理)
--------------------- ---------------------
2019-7-11
父组件中多次使用子组件(在resetPassword中新密码输入和再次输入使用了inputGroup作为输入框 两者都监听了聚焦事件)
想要实现的是 在提示有错误时 在鼠标聚焦到当前输入框时 错误提示暂时消失 (如 输入新密码 的input框下提示有错误 只有在鼠标点击输入新密码 的input框 该提示暂时消失
但实际效果是 点击聚焦 再次输入密码 input框时 输入密码框的提示也会消失 反之亦然)
  <InputGroup  placeholder="输入新密码 @focus="clearErrors"/>
  <InputGroup  placeholder="再次输入新密码 @focus="clearErrors"/>
 clearErrors: function () {
        this.errors = {}
    }
问题所在 没有判断当前聚焦的是那个元素
解决：给事件传递一个判断当前元素的参数
 子组件：@focus="$emit('inputFocus',name)
  props: { // 父组件给子组件传值
     name: String,
   },
父组件：<InputGroup  placeholder="输入新密码 @inputFocus="clearErrors"/>
        <InputGroup  placeholder="再次输入新密码 @inputFocuss="clearErrors"/>
clearErrors: function (name) {
        if (name === 'password' && this.errors.password) { // 当前聚焦为password输入框且当前输入框输入有误
           this.errors.password = ''
         } else if (name === 'repassword' && this.errors.repassword) {
            this.errors.repassword = ''
         }
   }
--------------------- ---------------------
2019-7-16
1.Method "showPassword" has already been defined as a prop
2.Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "showPassword"
3.在触发改密和注册页面点击事件@iClick="showPassword"时   都会报错 Invalid prop: type check failed for prop "showPassword". Expected Boolean, got Function 明明是触发一个事件触发一个
函数方法，怎么就Expected Boolean了呢？
解决：将方法名showPassword修改为其它名字就ok了
原因：类似Java的保留关键字？(在方法抽取时，只有showPassword报错 改为viewPassword后以上3个错误都没了)
--------------------- ---------------------
2019-8-11
在<router-link>中加入了点击事件 <router-link @click='xxx'>该点击事件无响应
解决：在<router-link>中再包裹一层DOM元素 如<router-link><span @click='xxx'></span></router-link>
      或者在事件后加上.native <router-link @click.native='xxx'>
--------------------- ---------------------
2019-8-20
加密时发现每次加密后的结果不一致
原因：aes 加密 使用的key iv 需是16进制的byte[] 而在传入 aes_key aes_iv时是直接传入的字符串
解决：将参数转码 获取需要的字节码  let key = CryptoJS.enc.Utf8.parse(aes_key)
                                   let iv = CryptoJS.enc.Utf8.parse(aes_iv)
最先直接定义key iv时 是转过码的 后来从后台获取后就直接将字符串传入函数没做转码处理
