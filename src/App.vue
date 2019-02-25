<template>
  <div id="app">
    <draw-canvas />
  </div>
</template>

<script>
import DrawCanvas from './components/DrawCanvas.vue'

export default {
  name: 'app',
  components: {
    DrawCanvas
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
  margin-top: 60px;
}
</style>
