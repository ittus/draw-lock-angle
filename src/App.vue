<template>
  <div id="app">
    <h2>Demo lock angle</h2>
    <p>Hold SHIFT to lock angle 45, 90, 135, 180... degree when drawing canvas</p>
    <div class="container">
      <div class="row">
        <div class="col-8 col-lg-9">
          <draw-canvas
            :isLockAngle="isLockAngle || isLockChecked"
            :boundary="boundary" ref="drawCanvas"
            :isSimpleMode="isSimpleMode"/>
        </div>
        <div class="col-4 col-lg-3">
          <div class="card" style="height: 600px;">
            <div class="card-body text-left">
              <h5 class="card-title">Settings</h5>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" v-model="isLockChecked">
                <label class="form-check-label" for="defaultCheck1">
                  Lock Angle
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" v-model="isSimpleMode">
                <label class="form-check-label" for="defaultCheck1">
                  Simple Mode (only 90 degree)
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" v-model="isSettingBoundary">
                <label class="form-check-label" for="defaultCheck1">
                  Set Boundary
                </label>
              </div>
              <button type="button" class="btn btn-outline-primary mt-3 btn-block" @click="onReset">Reset</button>
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
    isLockChecked: false,
    isSettingBoundary: false,
    isSimpleMode: false
  }),
  computed: {
    boundary () {
      if (this.isSettingBoundary) {
        return {
          minX: 100,
          minY: 100,
          maxY: 500,
          maxX: 500
        }
      }
      return null
    }
  },
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
    },
    onReset () {
      this.isLockAngle = false
      this.isLockChecked = false
      this.isSettingBoundary = false
      this.isSimpleMode = false
      if (this.$refs.drawCanvas) {
        this.$refs.drawCanvas.reset()
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
