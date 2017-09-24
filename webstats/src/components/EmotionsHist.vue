<template lang="html">
  <div class="emotionshist card-deck">
    <Emotion v-for="e in history" :emotionData="e" :key="e.id"/>
  </div>
</template>

<script>
import Emotion from './Emotion'
export default {
  components: {
    Emotion
  },
  data() {
    return {
      history: []
    }
  },
  mounted() {
    this.updateData()
    setInterval(() => {
      this.updateData()
    }, 10000)
  },
  methods: {
    updateData() {
      this.$http.get('http://52.170.24.238:8080/history')
      .then((res) => {
        // console.log(res)
        this.history = res.body
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
