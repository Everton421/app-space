import { View, Text, Button, TextInput, TouchableOpacity, Modal, Alert } from "react-native"
import { api } from "../../services/api"
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { ColorSpace } from "react-native-reanimated";
export const Teste = ()=>{

    const [prod, setProd] = useState<any>();
    const [data,setData] = useState<any>();
    const [ valorPesquisa, setValorPesquisa] = useState<number>();
    const [visible,setVisible] = useState(false);
    const [itemSelecionado, setItemSelecionaDo] = useState();

    const [produtosCompleto, setProdutosCompleto] = useState();
    


    async function busca(v:number){
        setValorPesquisa(v);
        try{
            const response = await api.get(`/produto/${v}`);
   
            setData(response.data);    
        setProd(response.data);
    
    }catch(err){console.log(err)}
    }


    {/********************** item da busca  ***********************/}
    const Item = ({item}:any)=>{

        function selectedItem(item:any){
            setVisible(true);
            setItemSelecionaDo(item)
            console.log(item)
        }

        return (
          
            <TouchableOpacity 
             onPress={()=> selectedItem(item)}
                style={{ margin:5, padding:20,borderRadius:5,backgroundColor:"red"}}
            >

             <View style={{flexDirection:'row'}}>
                    <Text style={{color:'white', fontWeight:"bold"}}>codigo: </Text> 
                         <Text style={{color:'white'}}>
                             {item.produto.codigo}
                         </Text>
              </View>
            <View style={{flexDirection:'row'}}>
                   <Text style={{color:'white', fontWeight:"bold"}}>  descricao</Text> 
                   <Text style={{color:'white'}} > {item.produto.descricao}</Text>
             </View>
            </TouchableOpacity>
        
        )
    }
    {/*************************************************************/}

const ItemSelecionado = ({item}:any)=>{
    const [preco, setPreco] = useState<number>(0);
   
    return(
            
            <View>
                        
                 

                        <View style={{flexDirection:'row', justifyContent:"space-around", margin:15}}>

                                <View style={{ flexDirection:'row'}} >
                                    <Text style={{fontWeight:'bold', fontSize:15}}>CODIGO : </Text>
                                       <Text style={{fontSize:15 }}>{item?.produto.codigo}</Text>
                                 </View>
                        
                                 <View style={{ flexDirection:'row'}} >
                                    <Text style={{fontWeight:'bold',fontSize:15}}>SKU : </Text>
                                     <Text>{item?.produto.outro_cod}</Text>
                                  </View>
                                    
                                  <View style={{ flexDirection:'row'}} >
                                      <Text style={{fontWeight:'bold'}}>PREÇO : </Text>
                                      <Text>{item?.tabelaDePreco.preco}</Text>
                                </View>
                                    
                          </View>
                        
                          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>      
                             <Text style={{fontSize:18}}>{item?.produto.descricao}</Text>
                          </View>
                          
                          
                         
                       
            
            </View>

    );
    
}
    
    return (
        <View>
         
         <TextInput
         style={{ margin:10 , borderWidth:1,borderColor:'black'}}
            onChangeText={ (v)=> busca(parseInt(v)) }
         />

         { data ?
                <Item item={data} />
                 : null
         }

           
            
       <Modal visible={visible}>
            <View>

                <TouchableOpacity onPress={()=> setVisible(false)} 
                    style={{ backgroundColor:'red', paddingHorizontal:25 }}
                >
                    <Text style={{color:'white'}}> voltar</Text>    
                </TouchableOpacity>
                
                { itemSelecionado ? 
                
                <View>
                  <ItemSelecionado item={itemSelecionado}/>
                    <Button
                        title="press"
                        onPress={()=> console.log(itemSelecionado)}
                    />
                </View>

            :null    
            }
            </View>
        </Modal> 
                  
            


        </View>
    )
}
