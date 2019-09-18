<template>
  <div id="app">
    <router-view/>
    <div class="copyright" v-if="$route.meta.showCopyright != false">
      <Copyright/>
    </div>
  </div>
</template>

<script>
import Copyright from './components/copyright'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    Copyright
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0;
  padding: 0;
  position:absolute;
  top:0;
  left:0;
  border: none;
  height: 100%;
  width: 100%;
}
a{
  text-decoration: none;
}
.copyright{
  width: 100%;
  float: left;
  margin-top: 25px;
}
</style>
