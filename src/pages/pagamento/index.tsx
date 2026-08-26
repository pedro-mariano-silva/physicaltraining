import React, { useState } from "react";
import * as Clipboard from "expo-clipboard";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { style } from "./styles";
import Topo from "../../img/topo.png";

import logoPix from "../../img/logoPix.png";

import { useNavigation } from "@react-navigation/native";

import { FontDisplay, useFonts } from "expo-font";

export default function Pagamento() {
  const navigation = useNavigation<any>();

  const [fontsLoaded] = useFonts({
    OpenSans: {
      uri: "https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-U1U5Ew7ytN1k7VfttU.woff2",
      display: FontDisplay.FALLBACK,
    },
  });

  // 👉 Função para copiar o texto
  const copiarTexto = async () => {
    await Clipboard.setStringAsync("058.736.897-76");
    Alert.alert("Copiado!", "A chave foi copiada para a área de transferência. \n\nOBS: Envie o comprovante pelo Whatsapp");
  };

  return (
    <View style={style.container}>
      <View>
        <Image source={Topo} style={style.topo} />
        <Text style={style.text}>PAGAMENTO</Text>
      </View>

      <View style={style.containerText}></View>

      <Image source={logoPix} style={style.logoPix} />

      <View style={style.textCopiar}>
        <Text>APERTE PARA COPIAR</Text>
      </View>

      <View style={style.containerButton}>
        <TouchableOpacity
          style={style.containerButtonInicio}
          activeOpacity={0.4}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={style.textButtonInicio}>INÍCIO</Text>
        </TouchableOpacity>
      </View>

      {/* 👉 Botão que copia o texto */}
      <TouchableOpacity
        style={style.containerSpaceChave}
        activeOpacity={0.4}
        onPress={copiarTexto}
      >
        <Text style={style.textButtonChave}>058.736.897-76</Text>
      </TouchableOpacity>

      <View></View>
    </View>
  );
}
