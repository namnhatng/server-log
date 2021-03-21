const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

app.use(express.static('public'))
app.use(express.json())

app.get('/timestamp', (req, res) => {
  res.json({timestamp: Date.now()})
})

app.post('/logs', (req, res) => {
  dateNow = Date.now()
  let log = {
    timestamp: dateNow,
    level: req.body.level,
    message: req.body.message
  }
  fs.writeFileSync(`logs/${dateNow}.json`, JSON.stringify(log))
})

app.get('/logs', (req, res) => {
  let limit = req.query.limit
  let files = fs.readdirSync('logs')
  let listLog = []
  for (i = files.length - 1; i >= Math.max(files.length - limit, 0); i--) {
    rawData = fs.readFileSync(`logs/${files[i]}`)
    let log = JSON.parse(rawData)
    listLog.push(log)
  }
  res.json({logs: listLog})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})