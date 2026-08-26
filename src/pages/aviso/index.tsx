import React, { useState } from "react";
import {Text, View, Image, Button, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import { style } from "./styles";
import Topo from '../../img/topo.png'
import Idea from '../../img/Idea.png'




import {FontDisplay, useFonts} from 'expo-font'



   export default function Aviso(){
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
                    <Text style={style.text}>AVISOS</Text>
                    

            </View>

               


                <View style={style.containerText}>
               

                </View>

                

                <View style={style.containerButton} >
                    
                   

                      <TouchableOpacity style={style.containerButtonInicio} activeOpacity={0.4}>
                        <Text style={style.textButtonInicio}>INÍCIO</Text>
                     </TouchableOpacity>                        
                


                </View>

                <View >
                    
            
                  
                        
    
                </View>


               



            </View>
                   
                   
                  
                  

 
        
    )
}