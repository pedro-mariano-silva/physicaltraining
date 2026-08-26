import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { style } from "./styles";
import Topo from "../../img/topo.png";
import Exercise from "../../img/exercise.png";
import Rectangle from "../../icons/rectangle.png";
import { FontDisplay, useFonts } from "expo-font";

// IMPORTA TIPAGEM DAS ROTAS
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App"; // <-- ajuste o caminho correto

// Define o tipo da navegação
type NavProps = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function Home() {
  // Define navegação com tipo correto
  const navigation = useNavigation<NavProps>();

  const [fontsLoaded] = useFonts({
    OpenSans: {
      uri: "https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-U1U5Ew7ytN1k7VfttU.woff2",
      display: FontDisplay.FALLBACK,
    },
  });

  return (
    <View style={style.container}>
      <View>
        <Image source={Topo} style={style.topo} />
        <Text style={style.text}>OLÁ, PEDRO!</Text>

        <Image source={Exercise} style={style.exercise} />

        <View style={style.containerTextIcon2}>
          <View>
            <Text style={style.textCorpo}>CORPO</Text>
          </View>

          {/*<View>
            <Text style={style.textIconDicas}>DICAS</Text>
          </View>*/}

          <View style={style.textIconPagamento}>
            <Text>PAGAMENTO</Text>
          </View>
        </View>

        <View style={style.containerTextIcon}>
          <View>
            <Text style={style.textIconCheckin}>CHECK IN</Text>
          </View>

          <View style={style.textHistorico}>
            <Text>HISTÓRICO DE PESO</Text>
          </View>

          {/*<View style={style.textIconAviso}>
            <Text>AVISOS</Text>
          </View>*/}
        </View>

        <View style={style.containerIcon}>
          <Image source={Rectangle} />
          <Image source={Rectangle} />
          {/*<Image source={Rectangle} /> - remoção temporaria de 'avisos'*/} 
        </View>

        <View style={style.containerIcon}>
          <Image source={Rectangle} />
          {/*<Image source={Rectangle} />*/}
          <Image source={Rectangle} />
        </View>
      </View>

      {/* Ícones de navegação */}
      <View>
        <View style={style.buttonIcon}>
          {/* 👉 Botão CHECKIN que navega */}
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => navigation.navigate("Checkin")}
          >
            <Image
              source={require("../../icons/iconcheck.png")}
              style={style.iconcheck}
            />
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => navigation.navigate("Historico")}
          activeOpacity={0.4}>
            
            <Image
              source={require("../../icons/icongraphic.png")}
              style={style.iconGraphic}
              
            />
          </TouchableOpacity>

          {/*<TouchableOpacity activeOpacity={0.4}>
            <Image
              source={require("../../icons/iconnotification.png")}
              style={style.iconNotification}
            />
          </TouchableOpacity>*/}
        </View>
      </View>

      <View style={style.buttonIcon2}>
        <TouchableOpacity 
        onPress={() => navigation.navigate("Corpo")}
        activeOpacity={0.4}>
          <Image source={require("../../icons/iconmuscle.png")} />
        </TouchableOpacity>

        {/*<TouchableOpacity activeOpacity={0.4}>
          <Image
            source={require("../../icons/iconidea.png")}
            style={style.iconIdea}
          />
        </TouchableOpacity>*/}

        <TouchableOpacity
        onPress={() => navigation.navigate("Pagamento")}
        activeOpacity={0.4}>
          <Image
            source={require("../../icons/iconmoney.png")}
            style={style.iconMoney}
          />
        </TouchableOpacity>
        
                 
                       
      </View>
      <TouchableOpacity 
      style={style.containerButtonInicio}
     onPress={() => navigation.navigate("Login")}
    activeOpacity={0.4}>
    <Text style={style.textButtonSair}>SAIR</Text>
</TouchableOpacity>               
    </View>
  );
}
