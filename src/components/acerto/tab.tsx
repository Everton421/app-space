import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AcertoCamera from "./acertoCamera";
import { acertoProduto } from "./acertoProduto";
import { NativeBaseProvider } from "native-base";

const tab = createBottomTabNavigator();

export const tabRoutesAcerto =()=>{
    return(
        <NativeBaseProvider>

        <tab.Navigator>
            
            <tab.Screen 
            options={{headerShown:false}}
                name="prod"
                component={acertoProduto}
            />

            <tab.Screen 
            options={{headerShown:false}}
            name="ler codigo"
            component={AcertoCamera}
            />
            
          
        
        </tab.Navigator>
        </NativeBaseProvider>

    )
}
