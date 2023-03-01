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
 import moment from 'moment';

 import Lista from '../../components/Lista';

export default function InputProduto({route}) {
    const navigation = useNavigation();

    const [produto, setProduto] = useState('');
    const [doseha, setDoseha] = useState('');
    const completa = (route.params.haaplic * doseha).toFixed(2);
    const incompleta = (route.params.unfullaplic * doseha).toFixed(2);
    const totalaplic = (route.params.area * doseha).toFixed(2);

    const [disableButton, setDisableButton] = useState(true);

    const [lista, setLista] = useState([]);
    const [prod, setProd] = useState([]);


    const currentDate = moment().format('DD/MM/YYYY');
    const _id = new Date().getTime();


    async function Adicionar() {
        if (produto === '' || doseha === '') {
            alert('Preencha todos os campos!');
            return;
        }
          setLista(
            (arr)=> [...arr,{
              id: new Date(). getTime(),
              nome: produto,
              doseha:doseha,
              completa: completa,
              incompleta: incompleta,
              totalaplic: totalaplic
            }]);
            setProduto ('');
            setDoseha ('');
            console.log(lista);
        }
      
        useEffect(() => { setProd (lista);
        }, [lista]);



        const html = `
        <html>
        <head>
            <meta charset="utf-8">
            <title>Invoice</title>
            <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
            <style>
              ${htmlStyles}
            </style>
          </head>
        <body>
          <header>
            <h1>PlantAplic</h1>
            <address>
              <h2>Dados da fazenda/lote</h2>
              <h3>Data: ${currentDate}</h3>
              <h3>Fazenda/Lote: ${route.params.fazenda}</h3>
              <h3> Operador responsável: ${route.params.operador} </h3>
              <h3>Veículo: ${route.params.veiculo}</h3>
              <h3>Placa/Prefixo: ${route.params.identific}</h3>
              <h3> Área / hectáre: ${route.params.area} há </h3>
              <h3> Capacidade do tanque: ${route.params.tanque} l </h3>
              <h3> Vazão: ${route.params.vazao} há </h3>
              <h3> Hectáre p/ Aplic: ${route.params.haaplic} há/aplicação </h3>
              <h3> Quantidade de cargas: ${route.params.fullaplic} </h3>
              <h3> Uma carga de: ${route.params.unfullaplic} </h3>
            </address>
          </header>
          <h2>Produtos Utilizados</h1>
          <table class="inventory">
            <thead>
              <tr>
                <th> <Span> Produto </Span> </th>
                <th> <Span> Dose/ha </Span> </th>
                <th> <Span> Carga Cheia </Span> </th>
                <th> <Span> Carga Incompleta </Span> </th>
                <th> <Span> Total da Área </Span> </th>
              </tr>
            <thead>
            ${lista.map(
              data => `
            <tbody>
              <tr>
                <td> <span> ${data.produto} </span> </td>
                <td> <span> ${data.doseha} </span> </td>
                <td> <span> ${data.completa} </span> </td>
                <td> <span> ${data.incompleta} </span> </td>
                <td> <span> ${data.totalaplic} </span> </td>
              </tr>
            </tbody>
            `,
          )
                  .join('')}
          </table>
        </body>
      </html>
      `;

  async function GerarPDF() {
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    await shareAsync(file.uri);
  }


    async function Salvar() {
        try {
            setProduto('');
            setDoseha('');
            setLista([]);
            navigation.navigate('Home');
            alert('Relatório salvo com sucesso!');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <SafeAreaView style={styles.container}>
        <Pressable onPress={() => Keyboard.dismiss()}>

            <View style={styles.containerImage}>
                <Image source={require('../../assets/Logo.png')} />
            </View>

            <View style={styles.containerForm}>
                <View style={styles.titleForm}>
                    <Text style={styles.descTitle}>Produto</Text>
                    <Text style={styles.descTitle}>Dose/há </Text>
                </View>

                <View style={styles.form2}>
                    <TextInput
                        style={styles.inputRow}
                        value={produto}
                        keyboardType="default"
                        placeholder="Produto"
                        placeholderTextColor="#000"
                        onChangeText={(text) => setProduto(text)}
                    />

                    <TextInput
                        style={styles.inputRow}
                        placeholder="Ex: 1.23"
                        keyboardType='numeric'
                        value={doseha}
                        onChangeText={(number) => setDoseha(number)}
                    />
                </View>

                <View style={styles.button}>
                    <Button title='Adicionar' color='#7CC81C' onPress={Adicionar} />
                    <Button title='Compartilhar' color='#7CC81C' onPress={GerarPDF} />
                    <Button title='Salvar' color='#7CC81C' onPress={Salvar} disabled={disableButton} />
                </View>

                <View style={styles.containerProdutoTitle}>
                    <Text style={styles.titleProd}>Produto</Text>
                    <Text style={styles.titleRes}>Dose/ha</Text>
                    <Text style={styles.titleRes}>Carga Cheia</Text>
                    <Text style={styles.titleRes}>Carga incompleta</Text>
                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={lista}
                    keyExtractor={item => String(item._id)}
                    renderItem={({ item }) => (<Lista data={item} />)}
                />

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
    marginTop: 15
},
containerForm: {

},
form1: {
    justifyContent: 'center',
    alignItems: 'center',
},
form2: {
    justifyContent: 'space-around',
    flexDirection: 'row'
},
titleForm: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
descTitle: {
    fontSize: 16
},
button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
},
containerProdutoTitle: {
    flexDirection: 'row',
    margin: 5,
    marginRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
},
titleProd: {
    width: 80,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 8,
    marginHorizontal: 10,
    fontSize: 12,
    borderBottomWidth: 2,
},
titleRes: {
    width: 50,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    fontWeight: '500',
    margin: 8,
    borderBottomWidth: 2,
    marginHorizontal: 10,
},
});

const htmlStyles = `
  h1 { 
    font: bold 100% sans-serif;
    letter-spacing: 0.5em;
    text-align: center;
    text-transform: uppercase;
    }
/* table */
table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }

/* header */
header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }
header h1 { background: #7CC81C; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }

/* article */
article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }
article address { float: left; font-size: 125%; font-weight: bold; }

/* table meta & balance */
table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after { clear: both; content: ""; display: table; }

/* table meta */
table.meta th { width: 40%; }
table.meta td { width: 60%; }

/* table items */
table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }
table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: right; width: 12%; }
table.inventory td:nth-child(4) { text-align: right; width: 12%; }
table.inventory td:nth-child(5) { text-align: right; width: 12%; }

`;