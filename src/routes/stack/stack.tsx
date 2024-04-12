import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { Login } from "../../screens/login";
import { Home } from "../../screens/home";
import { EnviaProduto } from "../../screens/enviaProdutos";
import AcertoCamera from "../../components/acerto/acertoCamera";
import { Configurações } from "../../screens/configurações";
import {  ProdutosFilialsc } from "../../screens/produtosFilialsc";
import { ProdutosSpace } from "../../screens/produtosSpace";


const Stack = createStackNavigator();

    export const  MyStack = ()=>{
        return(
                <Stack.Navigator>
                    <Stack.Screen name="home" component={Home} options={{headerShown:false}} />

                    <Stack.Screen name="enviaProdutos" component={EnviaProduto} 
                     options={{
                        headerTitleStyle:{ fontWeight:"bold"}
                    }}
                    />
                    <Stack.Screen name="produtos filialsc" component={ProdutosFilialsc}  
                        options={{
                            headerTitleStyle:{ fontWeight:"bold"}
                        }}
                    />
                    <Stack.Screen name="produtos space" component={ProdutosSpace} 
                    options={{
                        headerTitleStyle:{ fontWeight:"bold"}
                    }}
                    />
                    <Stack.Screen name="configurações" component={Configurações} 
                    options={{
                        headerTitleStyle:{ fontWeight:"bold"}
                    }}
                    
                    
                    />

                </Stack.Navigator>
        )
    }

  