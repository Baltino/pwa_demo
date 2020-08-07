import React, { useEffect, useState } from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  useEffect(() => {
    if(Notification.permission !== "granted") {
      Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
      });
    }
  }, []);
  const search = async (e) => {
    if(e.key === 'Enter') {
      if(query === "triggerme") {
        navigator.serviceWorker.getRegistration().then(function(reg) {
          var options = {
            body: 'Here is an easter egg notification!',
            icon: 'images/logo.png',
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: 1
            }
          };
          reg.showNotification('Easter egg notif', options);
        });
      } else {    
        const data = await fetchWeather(query);

        setWeather(data);
        
        setQuery('');
      }
    }
  }

  return (
    <div className="main-container">
      <input type="text"className="search"placeholder="Search..."value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;