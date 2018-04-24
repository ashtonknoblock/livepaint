// Add logic to this script to poll server every second for updated pixels.
let now = Date.now();
let interval = 2000;
let errors = 0;
let clientUpdates = [];

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
            clientUpdates
        })
    }

    fetch("/updates", postOptions)
        .then(response => response.json())
        .then(data => {

            let runCommand = false;
            let newRow = 0;
            let newCol = 0;
            let newColor = "";
            for(let i = 0; i < data.updates.length; i++){
                newRow = data.updates[i][0];
                newCol = data.updates[i][1];
                newColor = data.updates[i][2];
                // console.log("row:", newRow, "col", newCol, "color", newColor);
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