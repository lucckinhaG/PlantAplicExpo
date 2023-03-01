import React from 'react';
import { 
    View,
    SafeAreaView,
    Image,
    Text,
    Button,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Calcular from '../InputLote';
import Salvos from '../Salvos';

export default function Home() {
    const navigation = useNavigation();

 return (
    <SafeAreaView style={styles.container}>
        <View style={styles.containerImage}>
            <Image source={require('../../assets/Logo.png')}/>
        </View>

        <View style={styles.containerButton}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InputLote')}>
                <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Salvos')}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles= StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor: '#F4F7F8',
            padding: 20,
        },
        containerImage:{
            alignItems: 'center',
            justifyContent: 'center',
            margin: 100,
        },
        containerButton:{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
        },
        button:{
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderRadius: 15,
            borderColor: '#FFDB1B',
            backgroundColor: '#7CC81C',
            width: '70%',
            height: 50,
            margin: 10,
        },
    })