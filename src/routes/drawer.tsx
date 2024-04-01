import { createDrawerNavigator } from '@react-navigation/drawer';

import { View,Text } from 'react-native';
import { Teste } from '../components/teste';

const Drawer = createDrawerNavigator();


export function MyDrawer() {
  return (

      <Drawer.Navigator>
       <Drawer.Screen name="Feed" component={Teste} />
      
       </Drawer.Navigator>

  );
}