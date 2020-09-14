/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Form, Item, Button, Toast, Input} from 'native-base';

import {SvgUri} from 'react-native-svg';
import {weatherApi} from './api';

class DetailScreen extends Component {
  state = {
    inputValue: null,
    LoadingData: false,
    showTemperature: null,
    weather_icons: null,
    windSpeed: '',
    temp: '',
    precip: '',
  };

  showToast = (text) => {
    Toast.show({
      text,
      duration: 3000,
    });
  };

  getTemperature(capital) {
    this.setState({showTemperature: true});
    const {
      navigation: {navigate},
    } = this.props;
    weatherApi(capital)
      .then((response) => {
        this.setState({LoadingData: false,showTemperature:false});
        console.log('data-------', response.data.current.length);
        if (response && response.data && response.data.current) {
          this.setState({
            temp: response.data.current.temperature,
            windSpeed: response.data.current.wind_speed,
            precip: response.data.current.precip,
            weather_icons: response.data.current.weather_icons,
          });
        } else {
          this.showToast('Something went wrong');
        }
      })
      .catch((error) => {
        this.setState({LoadingData: false});
        this.showToast(error.message);
      });
  }

  render() {
    const {
      weather_icons,
      LoadingData,
      precip,
      temp,
      windSpeed,
      
    } = this.state;
    const countryDetails = this.props.navigation.getParam('item');
    //console.log("details----------",countryDetails)
    const {flag, latlng, capital, population} = countryDetails;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.detailView}>
          <SvgUri width="100%" height="250" uri={flag} />
          <Text style={styles.btnText}>{capital}</Text>
          <Text style={styles.btnText}>{population}</Text>
          <Text style={styles.btnText}>{latlng}</Text>

         
  <Text style={[styles.btnText,{color:"#000",margin:10,textAlign:"center"}]}>Please Click on below submit button to get details</Text>
       
  <Text style={styles.btnText}>Precip :{precip}</Text>
          <Text style={styles.btnText}>Temperature :{temp}</Text>
          <Text style={styles.btnText}>Wind Speed :{windSpeed}</Text>

          {weather_icons &&
            weather_icons.length &&
            weather_icons.map((item, index) => {
              return (
              <Image source={{uri: item}} style={styles.imageStyle} />
              )
            })}
               <Button
            primary
            style={styles.btn}
            onPress={()=>this.getTemperature(capital)}
           // disabled={inputValue ? false : true}
            >
            <Text style={styles.btnText}>SUBMIT</Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingText: {
    textAlign: 'center',
  },
  btnText: {
    color: '#000',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  imageStyle: {
    width: 100,
    height: 200,
    margin: '10%',
  },
  btn: {
    margin: 20,
    paddingHorizontal:20,
    justifyContent: 'center',
    alignSelf:"center"
  },
  input: {
    marginBottom: 10,
  },
  lineView: {height: 1, width: '100%', backgroundColor: '#000'},
  textSearched: {
    textAlign: 'center',
    margin: '5%',
  },
});

export default DetailScreen;
