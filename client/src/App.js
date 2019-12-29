import React, {useState, useEffect} from 'react';
import {MapLayer} from './MapLayer.js';
import {CityDetailView} from './CityDetailView.js'; 
import {SubmitForm} from './SubmitForm.js'
import './App.css';

const fetchJSON = async() => {
  const res = await fetch('/getVideoData');
  const body = await res.json();
  if(res.status !== 200) throw Error(body.message)
  return body;
}

function App() {

  const [selectedCity, setSelectedCity] = useState(null);
  const [videoData, setVideoData] = useState({});
  const [totalCities, setTotalCities] = useState([]);
  const desktopSize = 1024;

  useEffect(()=> {
    fetchJSON()
      .then(res => {
        setVideoData(res.cities);
        let citiesArray = Object.keys(res.cities);
        setTotalCities(citiesArray);
      })
      .catch(err => console.log(err))
  },[])

  const onMarkerClick = (e, city) => {
    e.preventDefault();
    if(selectedCity !== city) {
      setSelectedCity(city);
    }
  } 

  const onCityDetailClose = (e) => {
    e.preventDefault();
    setSelectedCity(null)
  }

  return (
    <div className="app">
      <MapLayer className="mapLayer" onMarkerClick={onMarkerClick} videoData={videoData} totalCities={totalCities} />
      <CityDetailView selectedCity={selectedCity} videoData={videoData} onCityDetailClose={onCityDetailClose} desktopSize={desktopSize} />
      <SubmitForm desktopSize={desktopSize}/>
    </div>
  );
}

export default App;


 