function fetchStatus() {
    fetch('/aircon/get_control_info')
        .then(response => response.json())
        .then(data => {
            document.getElementById('status').innerText = JSON.stringify(data);
        })
        .catch(error => console.error('Error fetching control info:', error));

    fetch('/aircon/get_sensor_info')
        .then(response => response.json())
        .then(data => {
            document.getElementById('roomTemp').innerText = data.param.htemp;
        })
        .catch(error => console.error('Error fetching sensor info:', error));
}

async function controlThermostat() {
    const controlData = { pow: 1, mode: 1, stemp: 25, f_rate: 3, f_dir: 0 };
    await fetch('/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(controlData)
    });
    fetchStatus(); // Refresh status after control
}

// Fetch data on load
window.onload = () => {
    fetchStatus();
    // Add weather fetching logic here using GPS
};