import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

import { API_KEY } from './utils/WeatherAPIKey';

import Weather from './components/Weather';
import FutureWeathers from './components/futureWeathers';

export default class App extends React.Component {
  state = {
    isLoading: true,
    daysArray: [],
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeahter(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    );
  }

  fetchWeahter(lat, lon) {
    fetch(
      //`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
      `http://api.openweathermap.org/data/2.5/forecast?id=1264588&APPID=${API_KEY}&units=metric` //panjim city_id=1632566, Vasco city_id=1253367,
    )
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        this.setState({
          //temperature: ((json.list[0].main.temp*1000) - 273.15*1000)/1000,
          temperature: json.list[0].main.temp,
          weatherCondition: json.list[0].weather[0].main,
          isLoading: false,
          daysArray: json.list,
        });
        
        
      });
  }
  formatAMPM = (tH) => {    //Calculating time in AM PM
    //var hours = dt.getHours();
    //var minutes = dt.getMinutes();
    var hours = tH;
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    //minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ' ' + ampm;
    //console.log(strTime);
    return strTime;
  }
  render() {
    futureDays = this.state.daysArray.map((item,index)=>{
      let dt = item.dt_txt.split(" ");
      //Calculating Date
      let dparts = dt[0].split("-");
      date = parseInt(dt[0].split('-')[2]);
      var mydate = new Date(dparts[0], dparts[1] - 1, dparts[2]);
      //console.log(mydate);
      //console.log(date);

      //Time
      let tparts = dt[1].split(':')[0];

      return(
        <FutureWeathers
          key = {index}
          keyIndex = {index}
          keyVal = {this.state.daysArray[index].main.temp}
          date = {mydate.toDateString()}
          time = {this.formatAMPM(tparts)}
        />
      );
    }); 

    const { isLoading, weatherCondition, temperature } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
        ) : (
          <Weather weather={weatherCondition} temperature={temperature} />
        )}
        <ScrollView>
          {futureDays}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height:'100%',
  },
  loadingContainer: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4',
    height: '100%',
  },
  loadingText: {
    fontSize: 30
  }
});
