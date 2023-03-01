import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TextInput, Image, TouchableOpacity, Pressable, Keyboard, Button } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5'

import LoteLista from '../../components/LoteLista';
import HeaderSearch from '../../components/HeaderSearch';


export default function Salvos() {

    const [dados, setDados] = useState([]);

    const [prods, setProds] = useState([]);

    async function Pesquisar() {
    }

    //useEffect(() => {
       // async function loadProdutos() {
           // setDados();
            //setProds(produtos);
           // console.log("Lotes=>");
       // }
       // loadProdutos();

   // }, [])

    async function excluirProduto(data) {}

    async function visualizeList(data) {}

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <FlatList
                    data={dados}
                    keyExtractor={item => String(item._id)}
                    renderItem={({ item }) => (<LoteLista data={item} excluir={excluirProduto} />)}
                    ListHeaderComponent={<HeaderSearch/>}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerImage: {
        alignItems: 'center',
        margin: 20,
    },
    containerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        borderBottomWidth: 5,
        borderBottomColor: '#7CC81C',
    },
    inputSearch: {
        width: '70%',
        borderWidth: 2,
        padding: 5,
        marginRight: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderColor: '#7CC81C',
        fontSize: 14,
    },
    searchButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderRadius: 25,
        borderColor: '#7CC81C',
        padding: 5,
    }
});