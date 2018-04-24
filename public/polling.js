// Add logic to this script to poll server every second for updated pixels.
let now = Date.now();
let interval = 2000;
let errors = 0;
let updates = [];

function newCommands (row, col, new_color) {
    let arr = [row, col, new_color]
    updates.push(arr)
    console.log("it ran newCommands")
}

function fetchUpdates() {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            updates
        })
    }
    fetch("/updates", postOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data.clientUpdates)
            let runCommand = false;
            let newRow = 0;
            let newCol = 0;
            let newColor = "";

            bitmap.setColor(10, 12, "red", runCommand)
            updates = data.reset
        })

        // .catch(function(error) {
        //     errors++
        //     if (errors == 2) {
        //         clearInterval(exicutionTimer)
        //     }
        //   });
}
var exicutionTimer = setInterval(fetchUpdates, interval);

