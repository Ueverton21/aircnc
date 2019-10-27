import React, { useState, useEffect} from 'react';
import { View , Text, AsyncStorage, Image,StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }){

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then((user)=> {
            if(user){
                navigation.navigate('List');
            }
        });
    }, []);

    async function handleSubmit(){
        const response = await api.post('/sessions', {
            email
        });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }

    return(
        <View style={styles.container}>
            <Image source={logo} />
            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={texto => setEmail(texto)}
                />
                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={texto => setTechs(texto)}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button} activeOpacity={.7} >
                    <Text style={styles.textButton}>Encontrar Spots</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
        paddingTop: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        backgroundColor: '#f05a5b',
        borderRadius: 2,
        marginTop: 15
    },
    textButton: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    }
});