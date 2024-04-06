import { View ,FlatList, Text} from "react-native"

export const Home = ()=>{

    const data = [1,2,3,4,5,6,7]
    const Item=({value}:any)=>{
        return(
            <View style={{backgroundColor:'#4c4de5',margin:10, borderRadius:100, width:50,height:50, alignItems:'center', justifyContent:'center'}}>
                <Text>{value}</Text>
            </View>
        )
    }

    return(
        <View>

            <FlatList
            horizontal={true}
            data={data}
            renderItem={ ({item})=> <Item value={item}/>}
            showsHorizontalScrollIndicator={false}
            />


        </View>
    )
}