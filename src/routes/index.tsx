

import { NavigationContainer } from "@react-navigation/native"
import { MyDrawer } from "./drawer"
import { MyStack } from "./stack/stack"
import { AuthStack } from "./stack/authStack"

import { useContext } from "react"
import { AuthContext } from "../contexts/auth"

export const Routes = ()=>{
    const { logado } = useContext(AuthContext)

    return(
        <NavigationContainer>
            {/** <MyDrawer/>*/}
        {
            logado ? <MyStack/> : <AuthStack/> 
        }
        </NavigationContainer>
    )
}