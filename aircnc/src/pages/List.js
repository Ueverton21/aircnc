import React, {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import { View, Text, AsyncStorage, Alert, Image, StyleSheet,ScrollView } from 'react-native';

import logo from '../assets/logo.png';

import SpotList from '../components/SpotList';

export default function List(){
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://localhost:3333', {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovada':'Rejeitada'}`);
            })
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then((storagedTechs) => {
            const techsArray = storagedTechs.split(',').map(techs => techs.trim());

            setTechs(techsArray);
        });
    }, []);

    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>{techs.map(tech => <SpotList key={tech} tech={tech} />)}</ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 40,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10,
    }
});