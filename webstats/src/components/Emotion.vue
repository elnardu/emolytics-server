<template lang="html">
<div class="card">
  <div>
    <img class="card-img-top" :src="`http://52.170.24.238:8080/images/${emotionData.id}`"  ref="image">
    <!-- <canvas class="card-img-top" ref="canvas"></canvas> -->
  </div>
  <div class="card-body">
    <!-- <h4 class="card-title">Added at {{emotionData.created_at}}</h4> -->
    <ul>
      <li v-for="(val, key) in emotionData.scores">
        <b>{{key}}</b>: {{val}}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  props: ['emotionData'],
  mounted() {
    // var image = this.$refs.image,
    // canvas = this.$refs.canvas,
    // ctx = canvas.getContext('2d')
    // let d = this.emotionData.faceRectangle

    // ctx.drawImage(image, 0, 0)
    // setTimeout(() => {
      // ctx.drawImage(image, 0, 0, image.offsetWidth, image.offsetHeight, 0, 0, canvas.offsetWidth, canvas.offsetHeight)
    // }, 3000)
    // ctx.drawImage(image, d.left, d.top, d.width, d.height, 0, 0, canvas.offsetWidth, canvas.offsetHeight)
  }
}
</script>

<style lang="css" scoped>
.card {
  margin: 1em;
  /*width: 20em;*/
}
</style>
