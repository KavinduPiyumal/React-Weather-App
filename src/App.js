import React, {useEffect, useState} from "react";
import './App.css';
import axios from 'axios';

function App() {
  const [weather, setweather] = useState(null);
  const [input, setinput] = useState("");
  useEffect(() =>{
    axios
    .get("http://api.weatherapi.com/v1/current.json?key=cc8265e829cd48a2956135338212812&q=Colombo")
    .then((data) =>{
      setweather(data.data);
      console.log(data.data);
    })
    .catch((err) => console.log(err));
  },[]);
  const weatherInput = (e) => {
    setinput(e.target.value); 
    axios
    .get(`http://api.weatherapi.com/v1/current.json?key=cc8265e829cd48a2956135338212812&q=${input}`)
    .then((data) =>{
      setweather(data.data);
    })
  }

  const searchWeather = () =>{
    axios
    .get(`http://api.weatherapi.com/v1/current.json?key=cc8265e829cd48a2956135338212812&q=${input}`)
    .then((data) =>{
      setweather(data.data);
    })
    
  }
  const dateBuilder=(d)=>{
    let months =["January","February","March","April","Maay","June","July","August","September","October","November","December"];
    let days =["Sunday","Monday","Tuesday","Wendesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} , ${date} ${month} ${year}`
  }

  return (
    <div className="warm app">
      {weather && (
           <main>
           <div className="search-box">
                <input className='search-bar' onChange={weatherInput} type="text" placeholder="Search..." onClick={searchWeather}/>
                {/* <button>Search</button> */}
            </div>
            <div className="weather-box">
                <h1>{weather.location.name} <span>, {weather.location.region}</span></h1> 
                <div className="date">{dateBuilder(new Date())}</div>
                <div className="condition">
                  <h3>{weather.current.condition.text}</h3>
                  <img src={weather.current.condition.icon} />
                </div>
                <div className="temp">
                  <h2>{weather.current.temp_c} <span>&#176;C</span></h2>
                </div>
            </div>  
       </main>     
      )}   
    </div>
  );
}

export default App;
