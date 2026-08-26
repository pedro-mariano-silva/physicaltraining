import React, { useState } from "react";
import {Text, View, Image, Button, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import { style } from "./styles";
import Topo from '../../img/topo.png'
import Man from '../../img/fitnessMan.png'
import Woman from '../../img/fitnessGirl.png'
import Idea from '../../img/idea.png'
import Painel from '../../img/painel.png'
import { useNavigation } from "@react-navigation/native";




import {FontDisplay, useFonts} from 'expo-font'



   export default function Historico(){
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
                    <Text style={style.text}>Histórico</Text>
                    

            </View>

                <View style={style.painel}>
                    <Image
                    source={Painel}
                    

                    />
                </View>


                <View style={style.containerText}>
                <Text style={style.textTiltekG}>_______ KG          EM:  _____/____/__        </Text>
                <Text style={style.textTiltekG}>_______ KG          EM:  _____/____/__        </Text>
                <Text style={style.textTiltekG}>_______ KG          EM:  _____/____/__        </Text>
                <Text style={style.textTiltekG}>_______ KG          EM:  _____/____/__        </Text>
                <Text style={style.textTiltekG}>_______ KG          EM:  _____/____/__        </Text>
                <Text style={style.textTiltekG}>_______ KG          EM:  _____/____/__        </Text>
                <Text style={style.textTiltekG}>_______ KG          EM:  _____/____/__        </Text>
                <Text style={style.textTiltekG}>_______ KG          EM:  _____/____/__        </Text>
                <Text style={style.textTiltekG}>_______ KG          EM:  _____/____/__        </Text>
                <Text style={style.textTiltekG}>_______ KG          EM:  _____/____/__        </Text>
                <Text style={style.textTiltekG}>_______ KG          EM:  _____/____/__        </Text>
                <Text style={style.textTiltekG}>_______ KG          EM:  _____/____/__        </Text>
          

                </View>

                

                <View style={style.containerButton} >
                    
                   

                      <TouchableOpacity style={style.containerButtonInicio}
                      onPress={() => navigation.navigate("Home")}
                      activeOpacity={0.4}>
                        <Text style={style.textButtonInicio}>INÍCIO</Text>
                     </TouchableOpacity>                        
                


                </View>

                <View >
                    
            
                  
                        
    
                </View>


               



            </View>
                   
                   
                  
                  

 
        
    )
}