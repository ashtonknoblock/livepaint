const express = require("express")
const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

const responseData = {
    reset: [],
    clientUpdates: []
}
app.post('/updates', function (req, res) {
    res.statusCode = 200;
    console.log(req.body.updates)
    responseData.updates = req.body.updates
    res.send(responseData)
})

app.listen(port)