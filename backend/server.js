const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { cities, vehicles } = require('./data');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/cities', (req, res) => {
    res.json(cities);
});

app.get('/vehicles', (req, res) => {
    res.json(vehicles);
});

// Capture endpoint
app.post('/capture', (req, res) => {
    const { cop1City, cop1Vehicle, cop2City, cop2Vehicle, cop3City, cop3Vehicle } = req.body;

    // Function to handle capture logic
    const handleCaptureLogic = () => {
        let capturedBy = '';

        const fugitiveLocation = cities[Math.floor(Math.random() * cities.length)].name;

        // Retrieve cop data dynamically
        const cop1Distance = cities.find(city => city.name === cop1City).distance;
        const cop2Distance = cities.find(city => city.name === cop2City).distance;
        const cop3Distance = cities.find(city => city.name === cop3City).distance;

        // Retrieve cop vehicle range dynamically
        const cop1VehicleData = vehicles.find(vehicle => vehicle.kind === cop1Vehicle);
        const cop2VehicleData = vehicles.find(vehicle => vehicle.kind === cop2Vehicle);
        const cop3VehicleData = vehicles.find(vehicle => vehicle.kind === cop3Vehicle);

        const cop1VehicleRange = cop1VehicleData ? cop1VehicleData.range : 0;
        const cop2VehicleRange = cop2VehicleData ? cop2VehicleData.range : 0;
        const cop3VehicleRange = cop3VehicleData ? cop3VehicleData.range : 0;

        // Condition: Check if each cop is in their respective city and has sufficient vehicle range
        if (cop1City === fugitiveLocation && cop1VehicleRange >= cop1Distance &&
            cop2City === fugitiveLocation && cop2VehicleRange >= cop2Distance &&
            cop3City === fugitiveLocation && cop3VehicleRange >= cop3Distance) {
            capturedBy = 'Cop 1, Cop 2, and Cop 3';
        }

        else if (cop1City === fugitiveLocation && cop1VehicleRange >= cop1Distance &&
            cop2City === fugitiveLocation && cop2VehicleRange >= cop2Distance) {
            capturedBy = 'Cop 1 and Cop 2';
        }
        else if (cop1City === fugitiveLocation && cop1VehicleRange >= cop1Distance &&
            cop3City === fugitiveLocation && cop3VehicleRange >= cop3Distance) {
            capturedBy = 'Cop 1 and Cop 3';
        }
        else if (cop2City === fugitiveLocation && cop2VehicleRange >= cop2Distance &&
            cop3City === fugitiveLocation && cop3VehicleRange >= cop3Distance) {
            capturedBy = 'Cop 2 and Cop 3';
        }
        else if (cop1City === fugitiveLocation && cop1VehicleRange >= cop1Distance) {
            capturedBy = 'Cop 1';
        }
        else if (cop2City === fugitiveLocation && cop2VehicleRange >= cop2Distance) {
            capturedBy = 'Cop 2';
        }
        else if (cop3City === fugitiveLocation && cop3VehicleRange >= cop3Distance) {
            capturedBy = 'Cop 3';
        }

        else {
            capturedBy = 'Criminal not captured';
        }

        res.json({ capturedBy });
    };

    handleCaptureLogic();
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
