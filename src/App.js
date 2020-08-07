import React, { useEffect, useState } from 'react';

import { fetchAlert } from './api/fetchAlert';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [alert, setAlert] = useState();
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
        const data = await fetchAlert(query);

        setAlert(data);
        
        setQuery('');
      }
    }
  }

  return (
    <div className="main-container">
      <input type="text" className="search" placeholder="Search alert" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search}/>
      {alert && (
        <div className="city">
          <h2 className="city-name">
            <span>{alert.slug}</span>
          </h2>
          <div className="info">
            <img className="city-icon" src={alert.images.downsized.url} width="200" alt={alert.slug}  />
            <p>created by {alert.username}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;