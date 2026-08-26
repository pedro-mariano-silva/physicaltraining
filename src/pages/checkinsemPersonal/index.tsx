import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { style } from "./styles";
import Topo from "../../img/topo.png";
import Check from "../../img/check.png";
import { FontDisplay, useFonts } from "expo-font";

// IMPORTAR TIPAGEM DA STACK
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App"; // caminho correto

// 👉 Tipagem para navegação
type NavProps = NativeStackNavigationProp<RootStackParamList>;

export default function CheckinSemPersonal() {
  const navigation = useNavigation<NavProps>(); // agora tipado corretamente

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
          CHECK IN SEM O PERSONAL REALIZADO COM SUCESSO. {"\n"}
        </Text>
      </View>

      <View style={style.containerButton}>
        <TouchableOpacity
          style={style.containerButtonInicio}
          activeOpacity={0.4}
          onPress={() => navigation.navigate("Home")} // agora funciona
        >
          <Text style={style.textButtonInicio}>INÍCIO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
