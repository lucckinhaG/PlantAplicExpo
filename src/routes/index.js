import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../pages/Home';
import InputLote from '../pages/InputLote';
import Salvos from '../pages/Salvos';
import InputProduto from '../pages/InputProduto';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen
            name="InputLote"
            component={InputLote}
            options={{ headerShown: false }}
            />

            <Stack.Screen
            name="InputProduto"
            component={InputProduto}
            options={{ headerShown: false }}
            />

            <Stack.Screen
            name="Salvos"
            component={Salvos}
            options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}