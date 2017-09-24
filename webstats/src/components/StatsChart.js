import {Radar, mixins} from 'vue-chartjs'
const {reactiveData} = mixins

export default Radar.extend({
  mixins: [reactiveData],
  props: ['rawChartData'],
  data() {
    return {
      options: {}
    }
  },
  mounted() {
    this.updateData()
    // this.renderChart(this.chartData, this.options)
    this.renderChart(this.chartData, null)
  },
  methods: {
    updateData() {
      let labels = [],
        data = []

      Object.keys(this.rawChartData).forEach((e) => {
        labels.push(e)
        data.push(this.rawChartData[e])
      })

      this.chartData = {
        labels: labels,
        datasets: [
          {
            borderColor: "#e74c3c",
            label: "Data",
            data: data
          }
        ]
      }
    }
  },
  watch: {
    rawChartData() {
      this.updateData()
    }
  }
})
