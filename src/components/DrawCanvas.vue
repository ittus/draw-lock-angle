<template>
  <div>
    <v-stage :config="configKonva"
      @mousemove="onMouseMove"
      @click="onClick">
      <v-layer>
        <v-rect :config="rectConfig" />
        <v-rect v-if="boundaryRectConfig" :config="boundaryRectConfig" />
        <v-text :config="textConfig" v-if="!points.length"/>
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
    isLockAngle: {
      type: Boolean,
      default: false
    },
    isSimpleMode: {
      type: Boolean,
      default: false
    },
    boundary: {
      type: Object,
      default: null
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
    textConfig () {
      return {
        x: this.width / 2 - 150,
        y: this.height / 2 - 20,
        text: 'Click to start drawing',
        fontSize: 30,
        fill: 'gray'
      }
    },
    boundaryRectConfig() {
      if (!this.boundary) { return null }
      return {
        x: this.boundary.minX,
        y: this.boundary.minY,
        width: this.boundary.maxX - this.boundary.minX,
        height: this.boundary.maxY - this.boundary.minY,
        stroke: '#939393',
        strokeWidth: 2,
        dash: [33, 10]
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
  watch: {
    boundary: {
      handler () {
        this.points = []
      },
      deep: true,
      immediate: true
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
        newPoint = calculatePosition (newPoint, this.points[this.points.length - 1], {
          boundary: this.boundary,
          isSimple: this.isSimpleMode
        })
      }
      this.ghostPoint = newPoint
    },
    onClick () {
      this.$nextTick(() => {
        if (this.ghostPoint) {
          this.points = this.points.concat([this.ghostPoint])
        }
      })
    },
    setSize () {
      if (this.$el) {
        this.width = this.$el.clientWidth
      }
    },
    reset () {
      this.points = []
      this.ghostPoint = null
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
