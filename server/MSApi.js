const axios = require('axios')


class MSApi {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  analyzeFace(file) {
    return new Promise((resolve, reject) => {
      axios.post('https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
        {
          url: "http://52.170.24.238:8080" + file
        },
        {
          headers: {
            "Ocp-Apim-Subscription-Key": this.apiKey
          }
        }
      ).then((res) => {
        // console.log(res)
        resolve(res.data)
      })
    })
  }
}

module.exports = MSApi
