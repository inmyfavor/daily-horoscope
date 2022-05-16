import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';
import DOMParser from 'react-native-html-parser';

const signsStyles = StyleSheet.create({
    main: {
        backgroundColor: '#181828', 
        justifyContent: 'center',
        alignItems:'center',
        marginRight: 15,
    },
    image: {
        width: 250,
        height: 230,
        resizeMode: 'stretch',
    },
    text: {
        color: '#d6d5da',
        fontFamily: 'NoyhSlim-Regular',
    },
    title: {
        fontSize: 20,
        paddingBottom: 20
    },
    navText: {
        fontSize: 24,
        paddingLeft: 25,
        paddingRight: 20,
        paddingBottom: 20,
    },
    navTextUnderlined: {
        textDecorationLine: 'underline',
    },
    description: {
        fontSize: 20,
        opacity: .9,
        textAlign: 'justify'
    },
    back: {
        marginTop: 25,
        fontSize: 16,
        marginLeft: 10,
    },
    titles: {
        fontSize: 24,
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 20,
    },
    date: {
        textAlign: 'right',
        fontSize: 16,
        paddingRight: 10,
        paddingTop: 10,
    },
})

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const dateNow = new Date();
const today = (months[dateNow.getMonth()])+' '+(dateNow.getDate()<10?'0'+dateNow.getDate():dateNow.getDate())
+', '+(dateNow.getFullYear());

const tomorrowTimestamp = dateNow.getTime() + (24 * 60 * 60 * 1000);
const dateTomorrow = new Date(tomorrowTimestamp);
const tomorrow = (months[dateTomorrow.getMonth()])+' '+(dateTomorrow.getDate()<10?'0'+
dateTomorrow.getDate():dateTomorrow.getDate())+', '+(dateTomorrow.getFullYear());

const weekStartTimestamp = dateNow.getTime() - (24 * 60 * 60 * 1000)*(dateNow.getDay()-1);
const weekEndTimestamp = dateNow.getTime() - (24 * 60 * 60 * 1000)*(dateNow.getDay()-7);
const dateWeekStart = new Date(weekStartTimestamp);
const dateWeekEnd= new Date(weekEndTimestamp);
const weekly = (months[dateWeekStart.getMonth()])+' '+(dateWeekStart.getDate()<10?'0'+
dateWeekStart.getDate():dateWeekStart.getDate())+' - '+(months[dateWeekEnd.getMonth()])
+' '+(dateWeekEnd.getDate()<10?'0'+dateWeekEnd.getDate()
:dateWeekEnd.getDate());

const pageInfo = [
    {id: 1, title: 'Aries', image: require('./assets/mImages/mAries.png')},
    {id: 2, title: 'Taurus', image: require('./assets/mImages/mTaurus.png')},
    {id: 3, title: 'Gemini', image: require('./assets/mImages/mGemini.png')},
    {id: 4, title: 'Cancer', image: require('./assets/mImages/mCancer.png')},
    {id: 5, title: 'Leo', image: require('./assets/mImages/mLeo.png')},
    {id: 6, title: 'Virgo', image: require('./assets/mImages/mVirgo.png')},
    {id: 7, title: 'Libra', image: require('./assets/mImages/mLibra.png')},
    {id: 8, title: 'Scorpio', image: require('./assets/mImages/mScorpio.png')},
    {id: 9, title: 'Sagittarius', image: require('./assets/mImages/mSagittarius.png')},
    {id: 10, title: 'Capricorn', image: require('./assets/mImages/mCapricorn.png')},
    {id: 11, title: 'Aquarius', image: require('./assets/mImages/mAquarius.png')},
    {id: 12, title: 'Pisces', image: require('./assets/mImages/mPisces.png')},
];

const Loading = <Text style={[signsStyles.description, signsStyles.text]}>Loading...</Text>

const Signs = (props) => {

    const currentNumber = Number(props.number);

    const [index, setIndex] = useState(0);
    const[savedData, setSavedData] = useState('');

    const renderItemCarousel = ({item, index}) => {
        return (
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <Text>{item.text}</Text>
          </View>
    
        );
    };

    useEffect( () => {
        setSavedData(null);
        const sign = pageInfo[currentNumber];
        const time = navBar[index];
        let mounted = true;
        fetch(`http://www.easyhoroscope.com/${time.time}-horoscope/${sign.title.toLowerCase()}/`)
            .then(response => response.text())
            .then(text => {
                const parser = new DOMParser.DOMParser();
                const parsed = parser.parseFromString(text, 'text/html');
                const content = parsed.getElementById('horo_content');
                const titles = Array.from(content.getElementsByTagName('h2')).map(e => e.textContent);
                const descriptions = Array.from(content.getElementsByTagName('p')).map(e => e.textContent);
                if (mounted) {
                    setSavedData({ titles, descriptions });
                }
            });
        return () => mounted = false;
    }, [index]);

    function content(savedData) {
        const horoArray = [];
        for(let i = 0; i < savedData.titles.length; i++) {
            let horoContent = <View>
                <Text style={[signsStyles.text, signsStyles.titles]}>{savedData.titles[i]}</Text>
                <Text style={[signsStyles.text, signsStyles.description]}>{savedData.descriptions[i]}</Text>
            </View>
            horoArray.push(horoContent);
        }
        return horoArray;
    } 

    function whatDay(day, pageIndex) {
        if(pageIndex!=index) {return <View key={pageIndex}/>}
        return savedData ? <View key={pageIndex}>
        <Text style={[signsStyles.text, signsStyles.date]}>{day}</Text>
        {content(savedData)}
        </View> : Loading;
    }

    const navBar = [
        {id: 1, name: 'TODAY', text: whatDay(today, 0), time: 'daily'},
        {id: 2, name: 'TOMORROW', text: whatDay(tomorrow, 1), time: 'tomorrow'},
        {id: 3, name: 'WEEKLY', text: whatDay(weekly, 2), time: 'weekly'},
    ];

    const menu = navBar.map(function(item) {
        return <View key={item.id}>
                   <Text style={item.id==index+1 ? 
                    [signsStyles.navText, signsStyles.navTextUnderlined, signsStyles.text] : 
                    [signsStyles.navText, signsStyles.text]}>{item.name}</Text>
               </View>
    });


    function page(item, number) {
        return <View key={item[number].id}>
            <View>
                <TouchableOpacity onPress={Actions.pop}>
                    <Text style={[signsStyles.back, signsStyles.text]}>&#x22B2; Back</Text> 
                </TouchableOpacity>
            </View>
            <View style={signsStyles.main}>
            <Image 
                style={signsStyles.image}
                source={item[number].image}/>
            <Text style={[signsStyles.title, signsStyles.text]}>{item[number].title}</Text>
            </View>
        </View>
    };

    return (

        <View style={{flex: 1, paddingBottom: 20, backgroundColor: '#181828'}}>

            {page(pageInfo, currentNumber)}
           
            <View style={{flexDirection: 'row'}}> 
                {menu}
            </View>

            <ScrollView style={{backgroundColor: '#181828'}}>
                <Carousel 
                layout={"default"}
                data={navBar}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
                renderItem={renderItemCarousel}
                onSnapToItem={(index) => setIndex(index)}
                />
            </ScrollView>

        </View>

    );
};

export default Signs;