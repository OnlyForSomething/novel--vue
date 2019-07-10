<template>
<div>
  <div>
      <Navlist/>
  </div>
  {{type}}
  {{data[0].novelName}}
</div>
</template>

<script>
import Navlist from './navlist'

export default {
  name: 'types',
  data () {
    return {
      type: this.$route.params.type, // 获取路由的参数type的值
      data: {}
    }
  },
  created () {
    this.$axios.get('api/novel/' + this.type)
      .then(res => {
        this.data = res.data
        console.log(res.data[0].author)
      })
      .catch(error => {
        console.log(error)
      })
    //
  },
  components: {
    Navlist
  }
}
</script>

<style scoped>

</style>
