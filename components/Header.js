import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Header = ({heading}) => {
  return (
    <View>
      <Text style={styles.header}>{heading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    color: '#000',
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 9,
  },
});

export default Header;
