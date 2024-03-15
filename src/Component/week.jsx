// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Clouds from '../weather image/clouds.png';
import Clearsky from '../weather image/clear-sky.png';
import Rain from '../weather image/light-rain.png';
import Snow from '../weather image/winter.png';

function Week(props) {
  // const [weatherData, setWeatherData] = useState([]);
   const {city} = props ;

  // useEffect(() => {
  //   setWeatherData(props.weatherData);
  //   console.log(props,weatherData)
    //  }, [props,weatherData]);

  
  const setImageConditionally = (weatherCondition) => {
    if (weatherCondition === 'Clouds') {
      return <img src={Clouds} alt="Clouds" className='con-img' />;
    } else if (weatherCondition === 'Snow'){
      return <img src={Snow} alt="Clouds" className='con-img' />;
    } else if (weatherCondition === 'Rain') {
      return <img src={Rain} alt="Rain" className='con-img' />;
    } else {
      return <img src={Clearsky} alt="Clear Sky"  className='con-img' />;
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const apiKey = '54715c7b1828ece7e80cb8e9605406cb';
  //     const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${props.weatherData}&appid=${apiKey}`;
  //     const response = await axios.get(apiUrl);
  //     setWeatherData(response.data.list);
  //     setCity(props.city);
  //   } catch (error) {
  //     console.error('Error fetching weather data:', error.message);
  //   }
  // };
           console.log(city, "hello abhi")
  return (
    <div className="main">
      <div className="part1">
        <div className="Citys">
        {city && city.length > 0 && (
          <>
            {city
              .filter((data, i, self) => {
                const currentDate = new Date(data.dt * 1000).toLocaleDateString();
                return i === self.findIndex((d) => new Date(d.dt * 1000).toLocaleDateString() === currentDate);
              })
              .slice(0, 6)
              .map((data, i) => (
                <div key={i}>
                
                  {setImageConditionally(data.weather[0].main)}   
                  <p className="weather">{data.weather[0].main}</p>
                  <p className="DAy">{new Date(data.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}</p>
                  <p className="cls1">{Math.round(data.main.temp - 273.15)}°C</p>
                </div>
              ))}
          </>
        )}
         </div>
      </div>
    </div>
  );
}

export default Week;
