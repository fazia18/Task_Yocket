import React from 'react';
import './styles.css';

function CitySelection({ cities, copIndex, handleCitySelect }) {
    const handleChange = e => {
        handleCitySelect(copIndex, e.target.value);
    };

    return (
        <div>
            <div className="city-container">
                {cities.map(city => (
                    <div key={city.name} className="city-item">
                        <img src={city.img} alt={city.name} className="city-image" />
                        <p className="city-name">{city.name}</p>
                        <input
                            type="radio"
                            name={`cop${copIndex}City`}
                            value={city.name}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CitySelection;






