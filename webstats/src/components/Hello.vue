<template>
<div class="hello container d-flex flex-column align-items-center mt-5">
  <h1>Title</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

  <h3 class="mt-3">Average stats</h3>
  <div class="chartwrapper">
    <StatsChart :rawChartData="chartData" />
  </div>
  <h3 class="mt-3">Last 3 entries</h3>
  <EmotionsHist/>
</div>
</template>

<script>
import StatsChart from './StatsChart'
import EmotionsHist from './EmotionsHist'
export default {
  name: 'hello',
  components: {
    StatsChart,
    EmotionsHist
  },
  data() {
    return {
      chartData: {
        Anger: 0,
        Contempt: 0,
        Disgust: 0,
        Fear: 0,
        Happiness: 0,
        Neutral: 0,
        Sadness: 0,
        Surprise: 0
      }
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
      this.$http.get('http://52.170.24.238:8080/stats')
      .then((res) => {
        // console.log(res)
        delete res.body[0]._id
        this.chartData = res.body[0]
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
}
.chartwrapper {
  width: 50%;
}
</style>
