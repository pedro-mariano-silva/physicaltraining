import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { style } from "./styles";
import Topo from "../../img/topo.png";
import Check from "../../img/check.png";
import { FontDisplay, useFonts } from "expo-font";

// IMPORTAÇÃO DA TIPAGEM
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

// 👉 Tipagem correta da navegação
type NavProps = NativeStackNavigationProp<RootStackParamList>;

export default function CheckinPersonal() {
  const navigation = useNavigation<NavProps>(); // Agora tipado

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
        <Text style={style.text}>CHECK IN</Text>
      </View>

      <Image style={style.containerCheck} source={Check} />

      <View style={style.containerText}>
        <Text style={style.textTiltePersonal}>
          CHECK IN COM O PERSONAL REALIZADO COM SUCESSO.
        </Text>
      </View>

      <View style={style.containerButton}>
        <TouchableOpacity
          style={style.containerButtonInicio}
          activeOpacity={0.4}
          onPress={() => navigation.navigate("Home")} // 
        >
          <Text style={style.textButtonInicio}>INÍCIO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
