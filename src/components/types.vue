<template>
<div>
  <div v-if="err">{{err}}</div>
  <div v-if="!err">
    {{type}}
    {{data[0].novelName}}</div>
</div>
</template>

<script>

export default {
  name: 'types',
  data () {
    return {
      type: this.$route.params.type, // 获取路由的参数type的值
      data: {},
      err: ''
    }
  },
  created () {
    this.$axios.get('api/novel/' + this.type)
      .then(res => {
        if (res.data === '') {
          this.err = '抱歉！没有搜索到任何 [' + this.type + '] 类型的小说'
          console.log(this.err)
        } else {
          this.data = res.data
          console.log(res.data[0].author)
        }
      })
      .catch(error => {
        console.log(error)
      })
    //
  },
  components: {
  }
}
</script>

<style scoped>

</style>
