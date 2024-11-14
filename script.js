document.getElementById('health-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const temperature = document.getElementById('temperature').value;
    const bloodPressure = document.getElementById('blood-pressure').value;
    const heartRate = document.getElementById('heart-rate').value;

    fetch('http://localhost:3000/saveHealthData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            temperature: "98.6",
            bloodPressure: "120/80",
            heartRate: "72"
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));