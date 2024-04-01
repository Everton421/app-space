

import { NavigationContainer } from "@react-navigation/native"
import { MyDrawer } from "./drawer"
export const Routes = ()=>{

    return(
        <NavigationContainer>
            <MyDrawer/>
        </NavigationContainer>
    )
}