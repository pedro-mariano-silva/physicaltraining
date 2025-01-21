import React from "react";
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native'
import { style } from "./styles";
import Logo from '../../img/logo.png'

export default function Login(){
    return(
        <View style={style.container}>            
        
                <View style={style.boxTop}>
            
                <Image
                        source={Logo}
                        style={style.logo}
                    />
                    <Text style={style.text}>Login</Text>
             

                 </View>
                    <View style={style.boxMid}>
                        <Text style={style.titleInput}>USUÁRIO</Text>
                        <View style={style.boxInput}>
                        <TextInput/>
                           
                        </View>
                        
                        <Text style={style.titleInput}>SENHA</Text>
                        <View style={style.boxInput}>
                        <TextInput/>
                           
                        </View>
                     

                    </View>
                    

                     <View style={style.boxButton}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.buttonLogar}>Entrar</Text>
                        </TouchableOpacity>

                    </View>
                    <Text>DESENVOLVIDO POR PEDRO MARIANO</Text>
                    
         </View>

        
    )
}