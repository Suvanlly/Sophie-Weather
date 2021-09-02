import React, { Component, Fragment } from 'react';
import styled from 'styled-components'
import Result from './Result'
import NotFound from './NotFound'

const AppTitle = styled.h3`
  color: #ffffff;
  opacity: 1;
  height: auto;
  margin-top: 100px;
  font-size: 50px;
  text-align: center;
  transition: all .3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`
const InputWrapper = styled.form`
  text-align: center;
  margin-top: 50px;
  height: 50px;
`
const SearchInput = styled.input`
  font-size: 18px;
  width: 250px;
  border-radius: 10px;
  border: none;
  height: 50px;
  margin-right: 10px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
  }
`
const SearchButton = styled.button`
  height: 50px;
  width: 100px;
  line-height: 50px;
  border: none;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

class App extends Component {
  state = {
    inputValue: '',
    weatherInfo: '',
    weatherDisplay: false, //为了在142行加入摄氏度符号
    error: false
  }

  inputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  searchWeather = (e) => {
    e.preventDefault(); //为了实现133行的onSubmit功能
    const value = this.state.inputValue
    const geoAPIkey = 'AIzaSyBjoZIOKg9rrHX3UXgMf1YmvBpfTGT7puM'
    const googleSource = `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${geoAPIkey}`
    fetch (googleSource)
      .then(response => response.json())
      .then(googleData => {
        console.log(googleSource)
        console.log(googleData)
        const lat = googleData.results[0].geometry.location.lat
        const lng = googleData.results[0].geometry.location.lng
        console.log(lat, lng)

        const APIkey = '638d3030eafa245040554df387be8a9c'
        const weatherSource = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${APIkey}`
        fetch(weatherSource)
          .then(response => response.json())
          .then(weatherData => {
            console.log(weatherData)
            console.log(weatherData.daily)
            const months = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'Nocvember',
              'December',
            ];
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const currentDate = new window.Date();
            const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`
            const iconId = weatherData.current.weather[0].icon
            const iconURL = `http://openweathermap.org/img/wn/${iconId}@2x.png`
            const weatherInfo = {
              date: date,
              cityName: weatherData.timezone,
              temp: weatherData.current.temp,
              temp_max: weatherData.daily[0].temp.max,
              temp_min: weatherData.daily[0].temp.min,
              description: weatherData.current.weather[0].description,
              icon: iconURL,
              forecastDaily: weatherData.daily
            }
            this.setState({
              weatherInfo: weatherInfo,
              weatherDisplay: true,
              error: false
            })
          })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          error: true,
          weatherDisplay: false
        })
      })
    }

  render() { 
    const { weatherDisplay, inputValue, error } = this.state
    return (
      <Fragment>
        <AppTitle>Sophie's Weather</AppTitle>
        <InputWrapper onSubmit={this.searchWeather}>
          <SearchInput 
            value={inputValue} 
            placeholder='Enter the City Name...' 
            onChange={this.inputChange}
          />
          <SearchButton onClick={this.searchWeather}>Search</SearchButton>
        </InputWrapper>
        {weatherDisplay && <Result weather= {this.state.weatherInfo} />}
        {error && <NotFound error={error} />}
      </Fragment>
    );
  }
}

export default App;
