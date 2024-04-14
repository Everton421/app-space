import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Modal, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { api } from '../../services/api';
import { FlatList, TextInput } from 'react-native-gesture-handler';

export default function AcertoCamera() {

  const ItemLista = (item:any)=>{
    return(
      <TouchableOpacity style={{backgroundColor:'red'}}>
        <Text style={{color:'red'}}>
          {item}
        </Text>
      </TouchableOpacity>
    )
  }

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [value, setValue] = useState();
  const [prod, setProd] = useState<any>([]);
  const [saldo, setSaldo] = useState(0);
  const [preco, setPreco] = useState([]);
  const [ setor, setSetor ] = useState <any> ([]);
  const [dataRequest, setDataRequest ] = useState<any>([]);
  const [loading , setLoading ] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    async function busca() {
      setLoading(true)
      try {
        const valor = await api.get(`/produto/${value}`);
        setDataRequest(valor.data);
        setPreco(valor.data.tabelaDePreco[0]);
        setProd(valor.data.produtos[0]);
        setSetor(valor.data.setores[0]);
        console.log(valor.data)
      } catch (err) {
        console.log('erro ao buscar o produto', err);
      }finally{
        setLoading(false);
      }
    }


    if (scanned && value) {
      busca();
    }
  }, [scanned, value]);


  
  const handleBarCodeScanned = ({ type, data }:any) => {
    setScanned(true);
    setValue(data);
   // Alert.alert(
   //   'Código de barras lido!',
   //   `Tipo: ${type}\nValor: ${data}`,
   //   [{ text: 'OK', onPress: () => setScanned(false) }]
   // );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Acesso à câmera negado</Text>;
  }

  function addSaldo(v:any){
    let value:number = parseInt(v)
     dataRequest.setores[0].estoque = value
  } 

//  function addPreco(v){
//    const value = parseInt(v);
//    setPreco(value)
//    let obj = {...prod, novoPreco: preco}
//    setProd(obj);
//  }
//
  async function postProduto(){
    try{
//    await api.post('/acerto/',prod);
   const response =  await api.post('/acerto/',prod);
      setScanned(false);
      setSaldo(0)
      console.log(response.data)
    }catch(err) {
    console.log(err)
  }
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
    { scanned && value && (
        <Modal visible={ scanned }>
          <View style={{alignItems:'center'}}>
            { loading ? ( // Display "buscando produto" message when loading is true
              <Text>Buscando produto...</Text>
            ) : (
              prod !== undefined ? (
                <View>
                
                <View style={{height:50,marginTop:10}}>
                    <TouchableOpacity
                    style={{backgroundColor:'red', borderRadius:10,width:50,height:25,alignItems:'center'}}
                    onPress={ ()=>setScanned(false)}
                    >
                      <Text style={{color:'#FFF'}}>voltar</Text>
                    </TouchableOpacity>

                  </View>
                
                  <View style={{flexDirection:'row'}}>
                   <Text style={{fontWeight:'bold'}}> Código:  </Text> 
                    <Text style={{color:'blue'}} > { prod.codigo }</Text>
                  </View>
                
                  <View style={{flexDirection:'column',marginTop:3}}>
                    <Text style={{color:'blue'}}> { prod.descricao }</Text>
                  </View>

                  <View style={{marginTop:15, flexDirection:'row',justifyContent:'space-between'}}>
                  <Text> Novo saldo: { saldo }</Text>
                  <Text>Saldo sistema: { setor.estoque}</Text>
                  </View>

                    <TextInput
                    keyboardType='numeric'
                    onChangeText={(v)=> addSaldo(v)}
                    placeholder='Saldo'
                    style={{ borderWidth:1,borderColor:'black',borderRadius:5, textAlign:'center', marginBottom:50}}
                    />

                  

            {/*      
                  <View style={{marginTop:15, flexDirection:'row',justifyContent:'space-between'}}>
                  <Text> Novo preço: { preco }</Text>
                  <Text>Preço sistema: { prod.preco}</Text>
                  </View>

                    <TextInput
                    keyboardType='numeric'
                    onChangeText={(v)=> addPreco(v)}
                    placeholder='Preço'
                    style={{ borderWidth:1,borderColor:'black',borderRadius:5 ,marginBottom:20, textAlign:'center' }}

                      />
      */}
                  <Button title='GRAVAR' onPress={()=>{console.log(dataRequest)}}   />
                {/**   <Button title='press' onPress={()=>{console.log(prod)}}   /> */}
                  
                  

                </View>
              ) : (
                <View>
                  <Text>Produto não encontrado!</Text>
                  <Button 
                  title='OK'
                   onPress={()=>{setScanned(false)}}
                     />
                </View>
              )
            )}
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop:20
  },
  camera: {
    flex: 1,
  },
});
