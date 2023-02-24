import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import axios from 'axios'; 

function App() {
  const[data, setData] = useState({});
  const[location, setLocation] = useState('');
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=cz&appid=8258f6dfebaeac7102ca2542407b343a`;

  const searchLocation = (event) =>{
    if (event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)  
    })
    setLocation('')
    }
  }

  return (
    <div className="app">
      <Helmet>
        <title>Počasí</title>
      </Helmet>

      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Zadejte město"
        type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p className="bold">{data.weather[0].main}</p> : null}
          </div>
        </div>

      {data.name != undefined &&
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Pocitově</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Vlhkost</p>
          </div>
          <div className="wind">
            {data.main ? <p className="bold">{(data.wind.speed / 3.6).toFixed(2)} m/s</p> : null}
            <p>Rychlost větru</p>
          </div>
        </div>
      }
      </div>
    </div>
  );
}

export default App;
