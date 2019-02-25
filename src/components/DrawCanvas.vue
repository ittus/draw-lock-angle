<template>
  <div>
    <v-stage :config="configKonva"
      @mousemove="onMouseMove"
      @click="onClick">
      <v-layer>
        <v-circle v-for="(circle, index) in circles" :key="index" :config="circle" />
        <v-line :config="lineConfig"/>
      </v-layer>
   </v-stage>
  </div>
</template>
<script>
export default {
  name: "DrawCanvas",
  data: () => ({
    configKonva: {
       width: 800,
       height: 600
    },
    points: [],
    ghostPoint: null
  }),
  computed: {
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
        radius: 5,
        stroke: 'black',
        strokeWidth: 2
      }))
    }
  },
  methods: {
    onMouseMove (event) {
      this.ghostPoint = { x: event.evt.offsetX, y: event.evt.offsetY }
    },
    onClick (event) {
      const newPoints = {x: event.evt.offsetX, y: event.evt.offsetY}
      this.points = this.points.concat([newPoints])
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
