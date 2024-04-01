import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from "react-native";
import { api } from "../../services/api";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export const Teste = () => {
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
        try {
            const response:any = await api.post("/produto/cadastrar", data);
//            console.log(response);
            if(response.status === 200 ){
                Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
            }else{
                Alert.alert("Erro", "Falha ao cadastrar o produto. Por favor, tente novamente.");
            }


        } catch (err) {
            console.log(err);
            Alert.alert("Erro", "Falha ao enviar o produto. Por favor, tente novamente.");
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
                style={{ margin: 5, padding: 20, borderRadius: 5, backgroundColor: "#00ddff" }}
            >
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Código: </Text>
                    <Text style={{ color: "white" }}>{item?.produto?.codigo}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Descrição: </Text>
                    <Text numberOfLines={3} ellipsizeMode="tail" style={{ color: "white", fontSize: 15 }}>{item?.produto?.descricao}</Text>

                </View>
                <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>SKU:  </Text>

                    <Text style={{ color: "white", fontWeight: "bold" }}>
                        {item?.produto?.outro_cod}
                    </Text>
                </View>

            </TouchableOpacity>
        );
    };

    const ItemSelecionado = ({ item }: any) => {
        return (
            <View style={{ backgroundColor: "#f0f0f0", borderRadius: 5, margin: 10, padding: 70 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>Código:</Text>
                    <Text>{item?.produto?.codigo}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>SKU:</Text>
                    <Text>{item?.produto?.outro_cod}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>Descrição:</Text>
                    <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 15 }}>{item?.produto?.descricao}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => enviaProduto()}
                    style={{ backgroundColor: "#53c853", padding: 10, alignItems: "center", borderRadius: 5 }}
                >
                    <Text style={{ color: "white" }}>Enviar</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
            <TextInput
                style={{ marginVertical: 10, borderWidth: 1, borderColor: "black", padding: 5 }}
                onChangeText={(v) => busca(parseInt(v))}
            />
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
