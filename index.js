const express = require("express")
const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

const responseData = {
    updates: [],
    reset: [],
    newestData: []
}

app.post('/updates', function (req, res) {
    res.statusCode = 200;
    req.body.clientUpdates.forEach(element => {
        responseData.updates.push(element)
    });
    // Take the amount of updates the client has seen and sends back only the newest commands
    let goodCommands = responseData.updates.slice(req.body.commandCounter, responseData.updates.length)
    responseData.newestData = goodCommands
    res.send(responseData)
})

app.listen(port)