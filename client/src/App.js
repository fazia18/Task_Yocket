import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StartPage from './components/StartPage';
import CitySelection from './components/CitySelection';
import VehicleSelection from './components/VehicleSelection';

function App() {
  const [cities, setCities] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [result, setResult] = useState('');
  const [copData, setCopData] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [captureDisabled, setCaptureDisabled] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const citiesResponse = await axios.get(process.env.REACT_APP_API_URL_CITIES);
      const vehiclesResponse = await axios.get(process.env.REACT_APP_API_URL_VEHICLES);
      setCities(citiesResponse.data);
      setVehicles(vehiclesResponse.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const allCopsSelected = copData.length === 3 && copData.every(cop => cop.city && cop.vehicle);
    setCaptureDisabled(!allCopsSelected);
  }, [copData]);

  const handleStartGame = () => {
    setGameStarted(true);
  };
  const handleRestartGame = () => {
    setGameStarted(false);
    setResult('');
    setCopData([]);
  };

  const handleCapture = async () => {
    const selectedCities = copData.map(cop => cop.city);
    const selectedVehicles = copData.map(cop => cop.vehicle);

    const data = {
      cop1City: selectedCities[0],
      cop1Vehicle: selectedVehicles[0],
      cop2City: selectedCities[1],
      cop2Vehicle: selectedVehicles[1],
      cop3City: selectedCities[2],
      cop3Vehicle: selectedVehicles[2]
    };

    const response = await axios.post(process.env.REACT_APP_API_URL_CAPTURE, data);
    setResult(response.data.capturedBy);
  };

  const handleCitySelect = (copIndex, selectedCity) => {
    setCopData(prevState => {
      const newData = [...prevState];
      if (!newData[copIndex - 1]) {
        newData[copIndex - 1] = {};
      }
      newData[copIndex - 1].city = selectedCity;
      return newData;
    });
  };

  const handleVehicleSelect = (copIndex, selectedVehicle) => {
    setCopData(prevState => {
      const newData = [...prevState];
      if (!newData[copIndex - 1]) {
        newData[copIndex - 1] = {};
      }
      newData[copIndex - 1].vehicle = selectedVehicle;
      return newData;
    });
  };

  return (
    <div className="App" style={{ backgroundColor: "lightgray", width: "100%", height: "100%", marginTop: "40px", padding: "20px" }}>
      <h1 style={{ color: "#673147", textAlign: "center", marginTop: "20px" }}>Catch the Criminal</h1>
      {!gameStarted && <StartPage onStartGame={handleStartGame} />}
      {gameStarted && cities.length > 0 && vehicles.length > 0 && (
        <div>
          {[1, 2, 3].map(copIndex => (
            <div key={copIndex}>
              <h2 style={{ textAlign: "center" }}>Select City for Cop {copIndex}</h2>
              <CitySelection
                cities={cities}
                copIndex={copIndex}
                handleCitySelect={handleCitySelect}
              />
              <VehicleSelection
                vehicles={vehicles}
                copIndex={copIndex}
                handleVehicleSelect={handleVehicleSelect}
              />
            </div>
          ))}
          <br />

          <button
            onClick={handleCapture}
            className='btn'
            style={{
              padding: '10px 0',
              margin: '10px auto',
              width: "300px",
              fontSize: "20px",
              display: "block",
              textAlign: "center",
              marginBottom: "20px",
              backgroundColor: captureDisabled ? "gray" : "#7393B3",
            }}
            disabled={captureDisabled}
          >
            Capture
          </button>
          {captureDisabled && (
            <p style={{ color: "red", textAlign: "center" }}>Please select city and vehicle for all three cops</p>
          )}

        </div>
      )}
      {result && (
        <div>
          <h2 style={{ textAlign: "center" }}>Result</h2>
          <p style={{ textAlign: "center", fontSize: "20px", color: "#880808" }}>{result} captured the Criminal</p>
          <div style={{ textAlign: "center" }}>
            <button onClick={handleRestartGame} className='btn' style={{
              marginTop: "20px", padding: '10px 0',
              margin: '10px auto',
              width: "300px",
              fontSize: "20px",
              display: "block",
              textAlign: "center",
              marginBottom: "20px",
            }}>Restart Game</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
