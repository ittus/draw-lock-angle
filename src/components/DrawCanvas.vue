<template>
  <div>
    <v-stage :config="configKonva"
      @mousemove="onMouseMove"
      @click="onClick">
      <v-layer>
        <v-rect :config="rectConfig" />
      </v-layer>
      <v-layer>
        <v-circle v-for="(circle, index) in circles" :key="index" :config="circle" />
        <v-line :config="lineConfig"/>
      </v-layer>
   </v-stage>
 </div>
</template>
<script>
import { calculatePosition } from '../libs/helper'
export default {
  name: "DrawCanvas",
  props: {
    'isLockAngle': {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    points: [],
    ghostPoint: null,
    width: 0,
    height: 600
  }),
  computed: {
    configKonva () {
      return {
        width: this.width,
        height: this.height
      }
    },
    rectConfig() {
      return {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        stroke: '#939393',
        strokeWidth: 4
      }
    },
    lineConfig () {
      let coordinates = this.points.reduce((a, c) => {
        a = a.concat([c.x, c.y])
        return a
      }, [])
      if (this.ghostPoint) {
        coordinates = coordinates.concat([this.ghostPoint.x, this.ghostPoint.y])
      }
      return {
        points: coordinates,
        stroke: 'black'
      }
    },
    circles () {
      return this.points.map(point => ({
        x: point.x,
        y: point.y,
        radius: 3,
        stroke: 'black',
        strokeWidth: 2
      }))
    }
  },
  mounted() {
    window.addEventListener('resize', this.setSize)
  },
  created() {
    this.$nextTick(() => {
      this.setSize()
    })
    window.removeEventListener('resize', this.setSize)
  },
  methods: {
    onMouseMove (event) {
      let newPoint = { x: event.evt.offsetX, y: event.evt.offsetY }
      if (this.isLockAngle && this.points.length) {
        newPoint = calculatePosition (newPoint, this.points[this.points.length - 1])
      }
      this.ghostPoint = newPoint
    },
    onClick () {
      if (this.ghostPoint) {
        this.points = this.points.concat([this.ghostPoint])
      }
    },
    setSize () {
      if (this.$el) {
        this.width = this.$el.clientWidth
      }
    }

  }
}
</script>
<style lang="scss" scoped>
</style>
