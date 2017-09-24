const express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  path = require('path'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  config = require('./config.json'),
  MSApi = require('./MSApi.js'),
  fs = require('fs'),
  uuid = require('uuid/v1'),
  mongoose = require('mongoose')

mongoose.Promise = global.Promise //tell mongoose to use default promises
mongoose.connect(config.database)
const Emotion = require('./emotionShema')

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

const api = new MSApi(config.azureEmotionApiKey)

io.on('connection', function(socket) {
  console.log('New connection');
  socket.on('echo', (m) => {
    console.log(m)
  })

  socket.on('analyzeFace', (img) => {
    let id = uuid()
    let file = '/images/' + id
    console.log("Image downloaded:", id)
    // console.log(img)
    fs.writeFile(__dirname + file, img, (err) => {
      if (err)
        throw err
      api.analyzeFace(file).then((data) => {
        console.log(data)
        if (data[0] !== undefined) {
          io.to(socket.id).emit('faceData', data[0]['scores'])
        } else {
          io.to(socket.id).emit('noface')
        }

        if (data.length > 0) {
          data.forEach((e) => {
            let emotion = new Emotion({
              ...e,
              id: id
            })
            emotion.save()
          })
        }
      })
    })
  })
})

app.get('/stats', (req, res) => {
  let data = {}
  Emotion.aggregate([
    {
      "$group": {
        "_id": null,
        "Surprise": {
          $avg: "$scores.surprise"
        },
        "Sadness": {
          $avg: "$scores.sadness"
        },
        "Neutral": {
          $avg: "$scores.neutral"
        },
        "Happiness": {
          $avg: "$scores.happiness"
        },
        "Fear": {
          $avg: "$scores.fear"
        },
        "Disgust": {
          $avg: "$scores.disgust"
        },
        "Contempt": {
          $avg: "$scores.contempt"
        },
        "Anger": {
          $avg: "$scores.anger"
        }
      }
    }
  ]).then((result) => {
    res.json(result)
  })
})

app.get('/history', (req, res) => {
  Emotion.find({}).sort({'created_at': -1}).limit(3).then((result) => {
    res.json(result)
  })
})

app.use('/images', express.static('images'))

http.listen(config.port, () => console.log('listening on port ' + config.port))
