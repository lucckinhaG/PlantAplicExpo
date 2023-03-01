import React, { useEffect, useState } from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  SafeAreaView,
  FlatList,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Button,
 } from 'react-native';
 import { useNavigation } from '@react-navigation/native';

 import { printToFileAsync } from 'expo-print';
 import { shareAsync } from 'expo-sharing';

 import Lista from '../../components/Lista';


export default function InputLote() {
  const navigation = useNavigation();


  const currentDate = new Date().toJSON().slice(0, 10);
  const [fazenda, setFazenda] = useState('');
  const [operador, setOperador ] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [identific, setIdentific] = useState('');
  const [area, setArea] = useState('');
  const [tanque, setTanque] = useState('');
  const [vazao, setVazao] = useState('');
  const [editableInput, setEditableInput] = useState(true);

  const haaplic = (tanque / vazao).toFixed(2);
  const fullaplic = parseInt ( area / haaplic );
  const unfullaplic = ( area - (fullaplic * haaplic)).toFixed(2);

  const [lista, setLista] = useState([]);
  
  const [prod, setProd] =  useState ([]);

  async function AdicionarProdutos() {
    //if( fazenda === '' || operador === '' || veiculo === '' || identific === '' || area === '' || tanque === '' || vazao === '' ){
    //  alert('Preencha todos os campos!');
    //  return;
    //}

    try{
    navigation.navigate('InputProduto', {fazenda: fazenda, operador: operador, veiculo: veiculo, identific: identific, area: area, tanque: tanque, vazao: vazao, haaplic: haaplic, fullaplic: fullaplic, unfullaplic: unfullaplic})
    Keyboard.dismiss();
  }catch (err){
    alert(err);
  }};


 return (
  <SafeAreaView>
            <Pressable onPress={() => Keyboard.dismiss()}>

                <View style={styles.containerImage}>
                    <Image source={require('../../assets/Logo.png')} />
                </View>

                <View style={styles.containerForm}>

                    <View style={styles.form1}>
                        <Text style={styles.descTitle}>Fazenda/Lote</Text>
                        <TextInput
                            style={styles.inputTitle}
                            value={fazenda}
                            keyboardType="default"
                            placeholder="Nome da fazenda"
                            onChangeText={(text) => setFazenda(text)}
                        />
                    </View>

                    <View style={styles.form1}>
                        <Text style={styles.descTitle}>Operador responsável</Text>
                        <TextInput
                            style={styles.inputTitle}
                            value={operador}
                            keyboardType="default"
                            placeholder="Nome do operador"
                            onChangeText={(text) => setOperador(text)}
                        />
                    </View>

                    <View style={styles.titleForm}>
                        <Text style={styles.descTitle}>Veículo</Text>
                        <Text style={styles.descTitle}>Placa/Prefixo</Text>
                    </View>

                    <View style={styles.form2}>
                        <TextInput
                            style={styles.inputRow}
                            value={veiculo}
                            keyboardType="default"
                            placeholder="Ex: Trator"
                            onChangeText={(text) => setVeiculo(text)}
                        />

                        <TextInput
                            style={styles.inputRow}
                            value={identific}
                            keyboardType="default"
                            placeholder="Ex: ABC-1234"
                            onChangeText={(text) => setIdentific(text)}
                        />
                    </View>

                    <View style={styles.titleForm}>
                        <Text style={styles.descTitle}>Area / hectáre</Text>
                        <Text style={styles.descTitle}>Capacidade do Tanque</Text>
                    </View>

                    <View style={styles.form2}>
                        <TextInput
                            style={styles.inputRow}
                            value={area}
                            keyboardType="numeric"
                            placeholder="Ex: 52.6"
                            onChangeText={(text) => setArea(text)}
                        />

                        <TextInput
                            style={styles.inputRow}
                            value={tanque}
                            keyboardType="numeric"
                            placeholder="Ex: 25"
                            onChangeText={(text) => setTanque(text)}
                        />
                    </View>

                    <View style={styles.titleForm}>
                        <Text style={styles.descTitle}>Vazão</Text>
                        <Text style={styles.descTitle}>Hectáre p/ aplic</Text>
                    </View>

                    <View style={styles.form2}>
                        <TextInput
                            style={styles.inputRow}
                            value={vazao}
                            keyboardType="numeric"
                            placeholder="Ex: 10"
                            onChangeText={(text) => setVazao(text)}
                        />

                        <Text style={styles.textResult}>{haaplic}</Text>
                    </View>

                    <View style={styles.titleForm}>
                        <Text style={styles.descTitle}>Cargas Cheias</Text>
                        <Text style={styles.descTitle}>Uma carga de</Text>
                    </View>

                    <View style={styles.form2}>
                        <Text style={styles.textResult}>{fullaplic}</Text>
                        <Text style={styles.textResult}>{unfullaplic}</Text>
                    </View>

                </View>

                <View style={styles.button}>
                    <Button title='Adicionar Produtos' color='#7CC81C' onPress={AdicionarProdutos} />
                </View>


            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F7F8',
    },
    containerImage: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    containerForm: {

    },
    form1: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    descTitle: {
        fontSize: 16
    },
    inputTitle: {
        width: '90%',
        height: 40,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        borderWidth: 3,
        paddingLeft: 15,
        margin: 8,
        fontSize: 12,
        fontWeight: '500',
        borderColor: '#7CC81C',
        color: '#000',
    },
    titleForm: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    form2: {
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    inputRow: {
        width: '43%',
        height: 40,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        borderWidth: 3,
        paddingLeft: 15,
        margin: 8,
        fontSize: 12,
        fontWeight: '500',
        borderColor: '#7CC81C',
        color: '#000',
    },
    textResult: {
        width: '42%',
        height: 40,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        borderWidth: 3,
        paddingLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        margin: 8,
        fontSize: 12,
        fontWeight: '500',
        borderColor: '#7CC81C',
        color: '#000',
    },
    button: {
        marginTop: 25,
    },
})
