// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Mock data for demonstration
let controlInfo = {
    pow: "0",
    mode: "2",
    stemp: "24",
    f_rate: "8",
    f_dir: "0",
    protect_fg: "0"
};

let sensorInfo = {
    htemp: "22",
    other_st: "4",
    err: "00"
};

// Endpoint to get control info
app.get('/aircon/get_control_info', (req, res) => {
    res.json({ param: controlInfo });
});

// Endpoint to set control info
app.post('/aircon/set_control_info', (req, res) => {
    const { pow, stemp } = req.body;
    if (pow !== undefined) controlInfo.pow = pow;
    if (stemp !== undefined) controlInfo.stemp = stemp;
    res.json({ success: true, param: controlInfo });
});

// Endpoint to get sensor info
app.get('/aircon/get_sensor_info', (req, res) => {
    res.json({ param: sensorInfo });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});