import React, {useState} from 'react';
import { View,Text, Alert, StyleSheet, TextInput, AsyncStorage, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({navigation}){

    const [data, setData] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`,{
            date: data
        },{
            headers: {user_id}
        });
        Alert.alert("Solicitação de reserva enviada");
        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Qual data deseja reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={data}
                onChangeText={texto => setData(texto)}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button} activeOpacity={.7} >
                <Text style={styles.textButton}>Solicitar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]} activeOpacity={.7} >
                <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
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
        height: 42,
        backgroundColor: '#f05a5b',
        borderRadius: 2,
    },
    cancelButton: {
        backgroundColor: '#CCC',
        marginTop: 10,
    },
    textButton: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    }
});