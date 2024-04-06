import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, StatusBar } from "react-native";
import { api } from "../../../services/api";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export const EnviaProduto = () => {
    const [prod, setProd] = useState<any>();
    const [data, setData] = useState<any>();
    const [valorPesquisa, setValorPesquisa] = useState<number>();
    const [visible, setVisible] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState();

    async function busca(v: number) {
        setValorPesquisa(v);
        try {
            const response = await api.get(`/produto/${v}`);
            if(response){

            setData(response.data);
            setProd(response.data.produto);
        }

        } catch (err) {
            console.log(err);
        }
    }


    async function enviaProduto() {
       // console.log(data)
        if(!data.setores){
            data.setores =  {"codigoSetor": 1, "data_recad": null, "estoque": 0, "local": "", "local1": "", "local2": "", "local3": "", "nome_setor": "ESTOQUE - FILIAL SC"}
        }

        if(!data.produto.outro_cod){
            return Alert.alert('este produto nao possui um sku cadastrado!');
        }

        try {
            const response:any = await api.post("/produto/cadastrar", data);
            if(response.status === 200 ){
                Alert.alert(`Produto cadastrado com sucesso!`,` codigo: `+response.data.codigo);
                setData(null);
                setProd(null);
                setVisible(false)
            }
        } catch (err:any) {
            if (err.response && err.response.status === 500 && err.response.data.err === "Produto já cadastrado com esse SKU") {
                Alert.alert("Erro", "Produto já cadastrado com esse SKU.");
            } else {
                console.log(err);
                Alert.alert("Erro", "Falha ao enviar o produto. Por favor, tente novamente.");
            }
        }


    }



    const Item = ({ item }: any) => {
        function selectedItem(item: any) {
            setVisible(true);
            setItemSelecionado(item);
        }

        return (
            <TouchableOpacity
                onPress={() => selectedItem(item)}
                style={{ margin: 10, padding: 20, borderRadius: 5, backgroundColor: "#FFF" }}
            >
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "#504de4", fontWeight: "bold" }}>Código: </Text>
                    <Text style={{ color: "#504de4" }}>{item?.produto?.codigo}</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <Text numberOfLines={3} ellipsizeMode="tail" style={{ color: "#504de4", fontSize: 16 }}>{item?.produto?.descricao}</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#504de4", fontWeight: "bold" }}>SKU:  </Text>

                    <Text style={{ color: "#504de4", fontWeight: "bold" }}>
                        {item?.produto?.outro_cod}
                    </Text>
                </View>

            </TouchableOpacity>
        );
    };

    const ItemSelecionado = ({ item }: any) => {
        return (
            <View style={{ backgroundColor: "#f0f0f0", borderRadius: 7, margin: 10, padding: 70 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold", color:'#42414d' }}>Código:</Text>
                    <Text style={{ fontSize:15, color:'#42414d'}}>{item?.produto?.codigo}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold", color:'#42414d' }}>SKU:</Text>
                    <Text style={{ fontSize:15, color:'#42414d'}} >{item?.produto?.outro_cod}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold" ,color:'#42414d'}}>Descrição: </Text>
                    <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 15, color:'#42414d' }}>{item?.produto?.descricao}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => enviaProduto()}
                    style={{ backgroundColor: "#504de4", padding: 10, alignItems: "center", borderRadius: 5 }}
                >
                    <Text style={{ color: "white" }}>Enviar</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
       

        
        <View style={{ flex: 1 ,backgroundColor:'#e9ecf1'}}>
             <StatusBar barStyle="light-content" />
            <View style={{ padding: 30,marginTop:5 , backgroundColor: "#504de4", borderTopLeftRadius:35,borderTopRightRadius:35 ,
             borderBottomLeftRadius:7,borderBottomRightRadius:7,margin:3, elevation:7
             }}>
            <TextInput
                    style={{ 
                        marginVertical: 10, borderWidth: 1.5, borderColor: "#FFF",backgroundColor:'#fff', padding: 5, borderRadius:20, color:'#504de4',
                        fontSize:15    
                    }}
                    placeholder="codigo: "
                    onChangeText={(v) => busca(parseInt(v))}
                    />
            </View>
            
            {prod  ?
            
            <Item item={data} /> 
            : null
            }
            <Modal visible={visible} transparent={true}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", borderRadius: 10, padding: 40 }}>
                        <TouchableOpacity onPress={() => setVisible(false)} style={{ alignSelf: "flex-end", padding: 5 }}>
                            <Text style={{ color: "red" }}>Fechar</Text>
                        </TouchableOpacity>
                        {itemSelecionado ? <ItemSelecionado item={itemSelecionado} /> : null}
                    </View>
                </View>
            </Modal>

        </View>
     
    );
};
