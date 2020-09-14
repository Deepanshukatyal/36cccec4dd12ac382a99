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
  StatusBar,
} from 'react-native';

import {Form, Item, Button, Toast, Input} from 'native-base';
import {getCountryApi} from './api';

class HomeScreen extends Component {
  state = {
    inputValue: null,
    LoadingData: false,
    ListData: [],
  };

  showToast = (text) => {
    Toast.show({
      text,
      duration: 3000,
    });
  };
  handleInputChange = (newValue) => {
    this.setState({inputValue: newValue ? newValue : null});
  };

  handleSubmit = () => {
    this.setState({LoadingData: true});
    const {
      navigation: {navigate},
    } = this.props;
    getCountryApi(this.state.inputValue)
      .then((response) => {
        this.setState({LoadingData: false});
        //console.log('country data-------', response);
        if (response && response.data && response.data.length > 0) {
          this.setState({ListData: response.data});
        } else {
          this.showToast('Something went wrong');
        }
      })
      .catch((error) => {
        this.setState({LoadingData: false});
        this.showToast(error.message);
      });
  };


  render() {
    const {
      navigation: {navigate},
    } = this.props;
    const {inputValue, LoadingData, ListData} = this.state;
    return (
      <View style={styles.container}>
        {LoadingData && (
          <Text style={styles.loadingText}>Loading ...........</Text>
        )}
        <Form>
          <Item sty={styles.input}>
            <Input
              placeholder="Enter Country Name"
              onChangeText={this.handleInputChange}
              value={inputValue}
              editable={!this.state.LoadingData}
            />
          </Item>
          <Button
            primary
            style={styles.btn}
            onPress={this.handleSubmit}
            disabled={inputValue ? false : true}>
            <Text style={styles.btnText}>SUBMIT</Text>
          </Button>

          <FlatList
            data={ListData}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity onPress={() => navigate('Detail', {item})}>
                  <Text style={styles.textSearched}>{item.name}</Text>
                </TouchableOpacity>
                <View style={styles.lineView}></View>
              </View>
            )}
            ItemSeparatorComponent={this.renderSeperator}
          />
        </Form>
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
    color: '#fff',
    alignSelf: 'center',
    fontWeight: 'bold',
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

export default HomeScreen;
