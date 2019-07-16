<template>
  <div class="text_group">
     <div class="input_group" :class="{'is-invalid':error}"> <!--根据是否有error动态添加样式-->
        <el-input style="width: 82%"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :name="name"
        :readonly="readonly"
        @input="$emit( 'input',$event)"
        @blur="$emit('inputBlur')"
        @focus="$emit('inputFocus',name)"></el-input>
      <!--输入框后的按钮 根据传入的btnTitle判断是否有此按钮-->
      <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{btnTitle}}</button>
       <!--输入框后的小图标-->
      <i :title="iTitle" v-if="iTitle" :class="iClass" @click="$emit('iClick')"></i>
    </div>
    <!--错误提醒 根据error是否有值判断是否显示错误提醒-->
    <div v-if="error" class="invalid-feedback">{{error}}</div>
  </div>
</template>

<script>
export default {
  name: 'inputGroup',
  props: { // 父组件给子组件传值
    type: {
      type: String,
      default: 'text'
    },
    value: String,
    name: String,
    placeholder: String,
    readonly: {
      type: Boolean,
      default: false
    },
    btnTitle: String,
    iTitle: String,
    iClass: String,
    disabled: Boolean,
    error: String
  }
}
</script>
<style scoped>
.input_group{
  border: 1px solid #ccc;
  border-radius:4px;
  padding: 5px;
  margin: 10px;
  display: flex;  /* 弹性布局，子元素的float、clear和vertical-align属性将失效*/
  flex-direction: row;  /* 沿水平主轴让元素从左向右排列*/
 justify-content: space-between;  /*在弹性盒对象的<div>元素中的各项周围留有空白*/
}
.input_group button{
  border:none;
  outline: none;
  background: #fff;
  cursor: pointer;
}
.input_group button[disabled]{
  color: #aaa;
}
i{
  margin: 12px 5px;
  cursor: pointer;
}
.is-invalid{
  border: 1px solid red;
}
.invalid-feedback{
  color: red;
  padding-top: 5px;
}
</style>
