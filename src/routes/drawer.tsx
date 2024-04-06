import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { View,Text } from 'react-native';
//import { EnviaProduto } from '../components/teste';
import { acertoProduto } from '../components/acerto/acertoProduto';
import { Home } from '../screens/home';
import { DrawerActions } from '@react-navigation/native';
import { lazy } from 'react';
import { Configurações } from '../components/configurações';
import { EnviaProduto } from '../components/produtos/enviaProdutos';

const Drawer = createDrawerNavigator();


export function MyDrawer() {

 
  return (

      <Drawer.Navigator
      >
      
      {/**   <Drawer.Screen  name="home" component={Home}/> */}
     
      <Drawer.Screen name="enviaProdutos" component={EnviaProduto} options={{headerShown:false}}/>
       {/**  <Drawer.Screen 
       options={{drawerActiveTintColor:'red'}}
         name="acertoProduto"
         component={acertoProduto} 
        /> 
       */}
        
        <Drawer.Screen 
        options={{
         drawerIcon:({})=>(
            <AntDesign name="setting" size={20} color="black" />
            )
      }}
          name="configurações"
          component={Configurações} 
         />
 
      
       </Drawer.Navigator>

  );
}