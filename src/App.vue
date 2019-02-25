<template>
  <div id="app">
    <draw-canvas :isLockAngle="isLockAngle" />
  </div>
</template>

<script>
import DrawCanvas from './components/DrawCanvas.vue'

export default {
  name: 'app',
  components: {
    DrawCanvas
  },
  data: () => ({
    isLockAngle: false
  }),
  mounted() {
    document.addEventListener('keydown', this.handleDocumentKeyDown)
    document.addEventListener('keyup', this.handleDocumentKeyUp)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleDocumentKeyDown)
    document.removeEventListener('keyup', this.handleDocumentKeyUp)
  },
  methods: {
    handleDocumentKeyDown(e) {
      if (e.keyCode === 16) {
        this.isLockAngle = true
      }
    },
    handleDocumentKeyUp (e) {
      if (e.keyCode === 16) {
        this.isLockAngle = false
      }
    }
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
