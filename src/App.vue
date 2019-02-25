<template>
  <div id="app">
    <h2>Demo lock angle</h2>
    <h4 class="mb-5">Hold SHIFT to lock angle 45, 90, 135, 180... degree when drawing canvas</h4>
    <div class="container">
      <div class="row">
        <div class="col-9">
          <draw-canvas :isLockAngle="isLockAngle || isLockChecked" />
        </div>
        <div class="col-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Settings</h5>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" v-model="isLockChecked">
                <label class="form-check-label" for="defaultCheck1">
                  Lock Angle
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    isLockAngle: false,
    isLockChecked: false
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
