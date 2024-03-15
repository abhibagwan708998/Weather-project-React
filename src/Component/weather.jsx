import React, { useEffect, useState } from 'react';
import Week from '../Component/week'
import axios from 'axios';
import logo from '../image/drop.png';
import logo1 from '../image/trend.png';
import logo2 from '../image/wind.png';
import logo3 from '../image/west.png';
import logo4 from '../image/location.png';
// import sun from '../weather image/sun (1).png'
import Clouds from '../weather image/clouds.png';
import Clearsky from '../weather image/clear-sky.png';
import Rain from '../weather image/light-rain.png';
import Snow from '../weather image/winter.png';

function Design() {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState(''); 
  const [currentDate , setCurrentDate] = useState('');

  useEffect(() => {
    setImageConditionally();
  }, [weatherData]);

  const setImageConditionally = () => {
    if (weatherData.length > 0) {
      const weatherCondition = weatherData[0].weather[0].main;
      if (weatherCondition === 'Clouds') {
        return <img src={Clouds} alt="Clouds" className='con-img1' />;
      } else if (weatherCondition === 'Snow') {
        return <img src={Snow} alt="Snow" className='con-img1' />;
      } else if (weatherCondition === 'Rain') {
        return <img src={Rain} alt="Rain" className='con-img1' />;
      } else {
        return <img src={Clearsky} alt="Clear Sky" className='con-img1' />;
      }
    }
  };

  const fetchData = async () => {
    try {
      const apiKey = '54715c7b1828ece7e80cb8e9605406cb';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      const response = await axios.get(apiUrl);
      setWeatherData(response.data.list);
      // console.log(weatherData)
      setCurrentDate(new Date().toLocaleDateString(undefined , { weekday: 'long'}));
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [city]);

    
    const handleClick = (e) => {
      setCity(e.target.value);
  };
  
  // const handleCity = () => {
  //   handleClick()
  // }

  return (
    <div className="main">
      <div className="header">
        <p className="a" style={{ color: 'white' }}>
          NEWS
        </p>
        <p className="ab"> { currentDate } </p>
      </div>
      <div className="part">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={handleClick}
            // onClick={(e)=> handleSearch(e.target.value)}
           
          />
          
          <button type='button' className='btn' onClick={fetchData}
          >Search</button>
        </div>
        <div className="City">
          <img src={logo4} alt="location" style={{ height: '20px' }} />
          <p>{city}</p>
        </div>
       
        <p className="DAy"> { currentDate } </p>
        {weatherData.length > 0 && (
          <>
            <div className='sun'>
            {setImageConditionally()}
            <p className="weather">{weatherData[0].weather[0].main}</p> </div>
            <p className="cls"> {Math.round(weatherData[0].main.temp - 273.15)}°C</p>
            <div className='min-max'>
              <p> Max Temp. {weatherData[0].main.temp_max} </p>
              <p> Min Temp. {weatherData[0].main.temp_min }</p>
            </div>
            <div className="Weather1">
              <div>
                <img src={logo} alt="humidity" style={{ height: '20px' }} />
                <p> {weatherData[0].main.humidity}% </p>
              </div>
              <div>
                <img src={logo2} alt="wind" style={{ height: '20px' }} />
                <p>  {weatherData[0].wind.speed} m/s </p>
              </div>
              <div>
                <img src={logo3} alt="deg" style={{ height: '20px' }} />
                <p> {weatherData[0].wind.deg}° </p>
              </div>
              <div>
                <img src={logo1} alt="hpa" style={{ height: '20px' }} />
                <p> {weatherData[0].main.pressure} hPa </p>
              </div>
            </div>
          </>
        )}
      </div>
      <Week  city={weatherData} />
    </div>
  );
}

export default Design;
