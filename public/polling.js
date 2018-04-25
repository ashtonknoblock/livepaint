// Add logic to this script to poll server every second for updated pixels.
let interval = 1000;
let errors = 0;
let clientUpdates = [];
let commandCounter = 0;

function newCommands(row, col, new_color) {
    let arr = [row, col, new_color]
    clientUpdates.push(arr)
}

function fetchUpdates() {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clientUpdates,
            commandCounter
        })
    }

    fetch("/updates", postOptions)
        .then(response => response.json())
        .then(data => {
            let runCommand = false;
            // commandCounter keeps track of the last updates that came from the server so
            // we can send back the last updates that the client has seen
            commandCounter = data.updates.length;
            for (let i = 0; i < data.newestData.length; i++) {
                let newRow = data.newestData[i][0];
                let newCol = data.newestData[i][1];
                let newColor = data.newestData[i][2];
                bitmap.setColor(newRow, newCol, newColor, runCommand);
                bitmap.fill(newRow, newCol, newColor)
            }
            clientUpdates = data.reset
        }).catch(function (error) {
            errors++
            if (errors == 2) {
                clearInterval(exicutionTimer)
            }
        });
}
var exicutionTimer = setInterval(fetchUpdates, interval);