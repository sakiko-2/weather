import React, { Component } from 'react';
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun } from 'react-feather';
import './App.css';
import { myConfig } from './config';

const ROOT_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loaded: false
    }
  }
 
  componentDidMount() {
    this.fetchCurrentWeather();
  }

  fetchCurrentWeather() {
    const REQUEST_URL = `${ROOT_URL}Auckland,nz&units=metric&appid=${myConfig.weatherAPI}`;

    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: responseData,
          loaded: true
        });
      })
      .catch((error) => console.log('Error:', error));
  }

  renderCurrentWeather() {
    if (!this.state.loaded) {
      return 'Loading ...';
    }

    return(
      <div className='main-weather'>
        {this.renderWeatherIcon()}
        <div className='title is-2'>
          {this.state.dataSource.main.temp}&deg;C
        </div>
        <div className='subtitle is-4'>
          {this.state.dataSource.weather[0].main}
        </div>
      </div>
    );
  }

  renderWeatherIcon() {
    const weatherName = this.state.dataSource.weather[0].main.toLowerCase();
    if (weatherName === 'clear') {
      return <Sun />;
    }
    else if (weatherName.includes('drizzle')) {
      return <CloudDrizzle />;
    } 
    else if (weatherName.includes('rain')) {
      return <CloudRain />;
    }
    else if (weatherName === 'clouds') {
      return <Cloud />;
    }
    else if (weatherName.includes('snow')) {
      return <CloudSnow />;
    }
    else if (weatherName.includes('thunder')) {
      return <CloudLightning />;
    }
    else { 
      return;
    }
  }

  render() {
    return (
      <div className='App'>
        <div className='container'>
          {this.renderCurrentWeather()}
        </div>
      </div>
    );
  }
}

export default App;
