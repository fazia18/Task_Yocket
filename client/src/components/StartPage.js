

import React from 'react';
import './styles.css';

const StartPage = ({ onStartGame }) => {
    return (
        <div className="start-page-container">
            <div className="start-page-content">
                <h1>Welcome to the Criminal Capture Game</h1>
                <button onClick={onStartGame} className="start-page-button">Start Game</button>
            </div>
        </div>
    );
};

export default StartPage;
