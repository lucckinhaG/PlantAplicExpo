import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, ScrollView } from 'react-native';

export default function Lista({ data }) {

    return (
        <View style={styles.containerLista}>
            <Text style={styles.itemTitle}>{data.nome}</Text>
            <Text style={styles.item}>{data.doseha}</Text>
            <Text style={styles.item}>{data.completa}</Text>
            <Text style={styles.item}>{data.incompleta}</Text>
            <View style={styles.button}>
                <Button title='X' onPress={() => {}} color='#7CC81C' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerLista: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
    },
    itemTitle: {
        width: 120,
        height: 28,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 13,
        fontWeight: '500',
    },
    item: {
        width: 70,
        height: 28,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 13,
        fontWeight: '500',
    },
    button: {
        marginHorizontal: 15,
    }
})