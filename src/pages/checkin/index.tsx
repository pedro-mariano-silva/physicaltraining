import React, { useState } from "react";
import {Text, View, Image, Button, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import { style } from "./styles";
import Topo from '../../img/topo.png'
import Exercise from '../../img/exercise.png'
import {FontDisplay, useFonts} from 'expo-font'
import { useNavigation } from "@react-navigation/native";



   export default function Checkin(){
      const navigation = useNavigation(); // ✅ hook de navegação
    
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
                    <Text style={style.text}>CHECK IN</Text>
                    

            </View>

                <View style={style.containerTitle}>
                    <Text style={style.title}>DESEJA REALIZAR O CHECK IN:</Text>
                </View>

                <View style={style.containerButton} >
                    <TouchableOpacity style={style.containerButtonWithPersonal} activeOpacity={0.4}
                     onPress={() => navigation.navigate("checkinPersonal")}
                    >
                        <Text style={style.textButtonWithPersonal}>COM PERSONAL</Text>
                        
                     </TouchableOpacity>
                     

                     <TouchableOpacity style={style.containerButtonWithPersonal} activeOpacity={0.4}
                     onPress={() => navigation.navigate("checkinsemPersonal")}
                     >
                        <Text style={style.textButtonWithoutPersonal}>SEM PERSONAL</Text>
                     </TouchableOpacity>


                   
                


                </View>

               



            </View>
                   
                   
                  
                  

 
        
    )
}