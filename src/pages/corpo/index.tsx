import React, { useState } from "react";
import {Text, View, Image, Button, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import { style } from "./styles";
import Topo from '../../img/topo.png'
import Man from '../../img/fitnessMan.png'
import Woman from '../../img/fitnessGirl.png'
import Idea from '../../img/idea.png'


import {FontDisplay, useFonts} from 'expo-font'

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App"; // caminho correto

   export default function Corpo(){
    const navigation = useNavigation<any>();
    const [fontsLoaded]=useFonts({
        'OpenSans': {
            uri: ('https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-U1U5Ew7ytN1k7VfttU.woff2'),
            display: FontDisplay.FALLBACK
        }

    })

    return(
        
        <View style={style.container}>            
        
                <View >
                    
            
                <Image
                        source={Topo}
                        style={style.topo}
                    />
                    <Text style={style.text}>CORPO</Text>
                    

            </View>


                <View style={style.containerText}>
                <Text style={style.textTilteSeuPeso}>SEU PESO INICIAL:    KG</Text>
                <Text style={style.textTilteSuaMeta}>SUA META DE PESO:  KG</Text>
                <Text style={style.textTiltePrecisaPerder}>VOCÊ PECISA PERDER:  KG</Text>

                </View>

                

                <View style={style.containerButton} >
                    
                     <TouchableOpacity style={style.containerButtonSalvar} activeOpacity={0.4}>
                        <Text style={style.textButtonInicio}>SALVAR</Text>
                     </TouchableOpacity>

                      <TouchableOpacity style={style.containerButtonInicio} activeOpacity={0.4}  onPress={() => navigation.navigate("Home")}>
                        
                        <Text style={style.textButtonInicio}>INÍCIO</Text>
                        
                     </TouchableOpacity>                        
                


                </View>

                <View >
                    
            
                    <Image
                            source={Man}
                            style={style.man}
                        />
    
                </View>

                <View >
                    
            
                    <Image
                            source={Woman}
                            style={style.woman}
                        />
                    
                        
    
                </View>

                <View >
                    
            
                    <Image
                            source={Idea}
                            style={style.idea}
                        />

                        <View style={style.containerTextIdea}>
                        <Text style={style.textIdea}>
                        LEMBRE-SE DE REALIZAR SUA PESAGEM 
                       UMA VEZ AO MÊS DE PREFERÊNCIA NO MESMO
                        HORÁRIO
                        </Text>
                        </View>
                    
                        
    
                </View>


               



            </View>
                   
                   
                  
                  

 
        
    )
}