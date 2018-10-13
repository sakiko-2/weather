import React, { Component } from 'react';
import { CloudSnow, Droplet, Snow, Sun } from 'react-feather';
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
      <div className='main-weather level is-mobile'>
        <div className='subtitle is-2' style={{ margin: '.5rem' }}>
          {this.state.dataSource.main.temp}&deg;C
        </div>
        {this.renderWeatherIcon()}
      </div>
    );
  }

  renderWeatherIcon() {
    if (this.state.dataSource.weather[0].main.toLowerCase() === 'clear') {
      return <Sun />;
    }
    else if (this.state.dataSource.weather[0].main.toLowerCase().includes('drizzle') ||
      this.state.dataSource.weather[0].main.toLowerCase().includes('rain')) {
        return <Droplet />;
    }
    else if (this.state.dataSource.weather[0].main.toLowerCase().includes('snow')) {
      return <CloudSnow />;
    }
    else { 
      return <div>{this.state.dataSource.weather[0]}</div>;
    }
  }

  render() {
    return (
      <div className='App'>
        <div className='container is-fluid'>
          {this.renderCurrentWeather()}
        </div>
      </div>
    );
  }
}

export default App;
