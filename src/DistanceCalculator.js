import React, { useState } from 'react';
import './App.css';

const DistanceCalculator = () => {
  const [distanceMessage, setDistanceMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const calculateDistance = () => {
    setIsLoading(true);
    // Function to calculate distance between two coordinates
    const calculateDistanceInMiles = (lat1, lon1, lat2, lon2) => {
      const R = 3958.8; // Radius of the Earth in miles
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    };

    // Function to convert degrees to radians
    const toRadians = (degrees) => {
      return degrees * (Math.PI / 180);
    };

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        const cambridgeLat = 42.373611; // Latitude of Cambridge, MA
        const cambridgeLon = -71.109733; // Longitude of Cambridge, MA

        const distanceInMiles = calculateDistanceInMiles(
          userLat,
          userLon,
          cambridgeLat,
          cambridgeLon
        );

        let distanceInMilesRounded = Math.round(distanceInMiles);

        if (distanceInMiles < 5) {
          setDistanceMessage("I'm less than 5 miles from you! Come say hi :)");
        }
        else {
          setDistanceMessage(`I'm ${distanceInMilesRounded} miles away from you!`);
        }
        setIsLoading(false);

      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div>
      <p
        style={{ fontSize: '1rem' }}
      >I am based in Cambridge, MA. </p>

      {
        isLoading ? <div>
          <div className="loading-bar-container">
            <div className="loading-bar"></div>
          </div>
          <p style={{ fontSize: '1rem' }}>Calculating my distance to you...</p>
        </div>
          :
          distanceMessage ? <p className="distance-message">{distanceMessage}</p>
            :
            <button className='btn-pretty' onClick={calculateDistance}>
              how far am i from you?
            </button>
      }
    </div >
  );
};

export default DistanceCalculator;
