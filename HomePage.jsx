import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    textName: {
      color: '#d6d5da',
      fontSize: 28,
      fontFamily: 'NoyhSlim-Regular',
    },
    textDate: {
      color: '#d6d5da',
      fontSize: 14,
      fontFamily: 'NoyhSlim-Regular',
      opacity: .8,
    },
    button: {
      paddingVertical: 20,
      borderRadius: 20,
      borderColor: '#d6d5da',
      borderWidth: 1,
      margin: 10,
      flexDirection: 'row',
    },
    image: {
      width: 60,
      height: 60,
      resizeMode: 'stretch',
    },
    cText: {
      justifyContent: 'center',
    },
    cImage: {
      paddingLeft: 20,
      paddingRight: 50,
    }
  })

const zodiacSigns = [
  {id: 1, name: 'ARIES', date: '(MAR 21 – APR 20)', image: require('./assets/images/Aries.png')},
  {id: 2, name: 'TAURUS', date: '(APR 21 – MAY 20)', image: require('./assets/images/Taurus.png')},
  {id: 3, name: 'GEMINI', date: '(MAY 21 – JUN 20)', image: require('./assets/images/Gemini.png')},
  {id: 4, name: 'CANCER', date: '(JUN 21 – JUL 22)', image: require('./assets/images/Cancer.png')},
  {id: 5, name: 'LEO', date: '(JUL 23 – AUG 22)', image: require('./assets/images/Leo.png')},
  {id: 6, name: 'VIRGO', date: '(AUG 23 – SEP 22)', image: require('./assets/images/Virgo.png')},
  {id: 7, name: 'LIBRA', date: '(SEP 23 – OCT 22)', image: require('./assets/images/Libra.png')},
  {id: 8, name: 'SCORPIO', date: '(OCT 23 – NOV 21)', image: require('./assets/images/Scorpio.png')},
  {id: 9, name: 'SAGITTARIUS', date: '(NOV 22 – DEC 21)', image: require('./assets/images/Sagittarius.png')},
  {id: 10, name: 'CAPRICORN', date: '(DEC 22 – JAN 19)', image: require('./assets/images/Capricorn.png')},
  {id: 11, name: 'AQUARIUS', date: '(JAN 20 – FEB 18)', image: require('./assets/images/Aquarius.png')},
  {id: 12, name: 'PISCES', date: '(FEB 19 – MAR 20)', image: require('./assets/images/Pisces.png')},
];

const HomePage = () => {

    const signs = zodiacSigns.map(function(item) {
      return <View key={item.id}>
        <TouchableOpacity style={styles.button} 
          onPress={() => {Actions.signs({number: item.id-1})}}>
          <View style={styles.cImage}>
          <Image
          style={styles.image}
          source={item.image}/>
          </View>
          <View style={styles.cText}>
          <Text style={styles.textName}>{item.name}</Text>
          <Text style={styles.textDate}>{item.date}</Text>
          </View>
        </TouchableOpacity>
      </View>;
    });

    return (
      <ScrollView style={{backgroundColor: '#181828', paddingTop: 20}}>
        {signs}
        <View style={{paddingTop: 30}}/>
      </ScrollView>
    )
  }

  export default HomePage;