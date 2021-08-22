import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Header from './components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from './components/Card';
import apiData from './apiData.json';

const App = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([])

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    // setData(apiData.items)
    // setInitialData(apiData.items)
    fetch('https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow')
      .then(response => response.json())
      .then(responseJson => {
        let fetchedData = responseJson.items;
        setData(fetchedData);
        setInitialData(fetchedData)
      }).catch(error => console.log(error.message))
  }

  const renderItem = ({ item }) => (
    <View>
      <Card link={item.link} question={item.title} author={item.owner.display_name} upVote={item.score} />
    </View>
  );

  function searchText(text) {
    if (text === "") {
      setData(initialData)
    } else {
      let temp = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
      setData(temp)
    }
  }

  function handleOnchange(text) {
    searchText(text);
    setInput(text);
  }

  const handleOnpress = () => {
    setInput("");
    setData(initialData);
  }

  return (
    <SafeAreaProvider style={styles.appContainer}>
      <StatusBar style="auto" />
      <View>
        <Header heading="Search StackOverflow" />
        <Input
          value={input}
          onChangeText={text => handleOnchange(text)}
          style={styles.textInput}
          placeholder="Search items here..."
          leftIcon={<Icon name="search" size={19} color="#FBBF24" style={{ marginRight: 5 }} />}
        />
        <View>
          <Button buttonStyle={{ backgroundColor: '#FBBF24', width: '100%', margin: 'auto', marginTop: 10 }} title="Clear Search" onPress={(input) => handleOnpress(input)} />
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
      <View style={{ height: 40 }} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    margin: 'auto',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    maxWidth: 600,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  heading: {
    fontSize: 30,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 17,
  },
});

export default App;
