import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { style } from "./styles";
import Topo from "../../img/topo.png";

import { FontDisplay, useFonts } from "expo-font";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../App";
import { supabase } from "../../lib/supabase";

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  "Checkin"
>;

type TipoCheckin = "com_personal" | "sem_personal";

export default function Checkin() {
  const navigation = useNavigation<NavProps>();

  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    OpenSans: {
      uri: "https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-U1U5Ew7ytN1k7VfttU.woff2",
      display: FontDisplay.FALLBACK,
    },
  });

  async function realizarCheckin(tipo: TipoCheckin) {
    if (loading) return;

    try {
      setLoading(true);

      // 1. Pega o usuário logado
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        Alert.alert(
          "Erro",
          "Não foi possível identificar o usuário logado."
        );
        return;
      }

      console.log("USUÁRIO LOGADO:", user.id);

      // 2. Procura o aluno vinculado a esse usuário
      const { data: aluno, error: alunoError } = await supabase
        .from("alunos")
        .select("id, profissional_id")
        .eq("user_id", user.id)
        .single();

      console.log("ALUNO:", aluno);
      console.log("ERRO ALUNO:", alunoError);

      if (alunoError || !aluno) {
        Alert.alert(
          "Cadastro não encontrado",
          "Seu usuário não está vinculado a um profissional."
        );
        return;
      }

      // 3. Grava o check-in no Supabase
      const { data: checkin, error: checkinError } = await supabase
        .from("checkins")
        .insert({
          aluno_id: aluno.id,
          profissional_id: aluno.profissional_id,
          tipo: tipo,
        })
        .select()
        .single();

      console.log("CHECKIN:", checkin);
      console.log("ERRO CHECKIN:", checkinError);

     if (checkinError) {
  console.log("ERRO CHECKIN:", checkinError);

 if (checkinError.code === "23505") {
  Alert.alert(
    "Check-in já realizado",
    "Você já registrou seu check-in hoje.",
    [
      {
        text: "OK",
        onPress: () => navigation.popToTop(),
      },
    ]
  );

  return;
}

  Alert.alert(
    "Erro ao realizar check-in",
    "Não foi possível registrar seu check-in."
  );

  return;

      }

      // 4. Só vai para a tela de sucesso se gravou no banco
      if (tipo === "com_personal") {
        navigation.navigate("checkinPersonal");
      } else {
        navigation.navigate("checkinsemPersonal");
      }
    } catch (error) {
      console.log("ERRO INESPERADO:", error);

      Alert.alert(
        "Erro",
        "Não foi possível registrar o check-in."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={style.container}>
      <View>
        <Image source={Topo} style={style.topo} />
        <Text style={style.text}>CHECK IN</Text>
      </View>

      <View style={style.containerTitle}>
        <Text style={style.title}>
          DESEJA REALIZAR O CHECK IN:
        </Text>
      </View>

      <View style={style.containerButton}>
        <TouchableOpacity
          style={style.containerButtonWithPersonal}
          activeOpacity={0.4}
          disabled={loading}
          onPress={() => realizarCheckin("com_personal")}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={style.textButtonWithPersonal}>
              COM PERSONAL
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={style.containerButtonWithPersonal}
          activeOpacity={0.4}
          disabled={loading}
          onPress={() => realizarCheckin("sem_personal")}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={style.textButtonWithoutPersonal}>
              SEM PERSONAL
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}