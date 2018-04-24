const express = require("express")
const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

const responseData = {
    updates: [],
    reset: []
}

app.post('/updates', function (req, res) {
    res.statusCode = 200;
    req.body.clientUpdates.forEach(element => {
        responseData.updates.push(element)
    });
    res.send(responseData)
})

app.listen(port)