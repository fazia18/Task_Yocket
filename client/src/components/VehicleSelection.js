import React from 'react';

function VehicleSelection({ vehicles, copIndex, handleVehicleSelect }) {
    const handleChange = e => {
        handleVehicleSelect(copIndex, e.target.value);
    };

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Choose Car for Cop {copIndex} </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {vehicles.map(vehicle => (
                    <div key={vehicle.kind} style={{ margin: '30px', textAlign: 'center', padding: "20px" }}>
                        <img src={vehicle.img} alt={vehicle.name} style={{ width: '200px', height: '200px' }} />
                        <p>{vehicle.kind}</p>
                        <input
                            type="radio"
                            name={`cop${copIndex}Vehicle`}
                            value={vehicle.kind}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VehicleSelection;

