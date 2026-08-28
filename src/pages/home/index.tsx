import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { style } from "./styles";

import Topo from "../../img/topo.png";
import Exercise from "../../img/exercise.png";
import Rectangle from "../../icons/rectangle.png";

import { FontDisplay, useFonts } from "expo-font";
import { supabase } from "../../lib/supabase";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type NavProps =
  NativeStackNavigationProp<
    RootStackParamList,
    "Home"
  >;

export default function Home() {
  const navigation =
    useNavigation<NavProps>();

  const [nome, setNome] =
    useState("");

  const [fontsLoaded] = useFonts({
    OpenSans: {
      uri: "https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-U1U5Ew7ytN1k7VfttU.woff2",
      display: FontDisplay.FALLBACK,
    },
  });

  async function handleLogout() {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.log(
        "Erro ao sair:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível sair da conta."
      );
    }
  }

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const {
          data: { user },
          error: userError,
        } =
          await supabase.auth.getUser();

        if (
          userError ||
          !user
        ) {
          console.log(
            "Erro ao buscar usuário:",
            userError
          );

          return;
        }

        const {
          data,
          error,
        } =
          await supabase
            .from("profiles")
            .select("nome")
            .eq(
              "id",
              user.id
            )
            .single();

        if (error) {
          console.log(
            "Erro ao buscar perfil:",
            error
          );

          return;
        }

        setNome(
          data.nome
        );
      } catch (error) {
        console.log(
          "Erro inesperado:",
          error
        );
      }
    }

    carregarPerfil();
  }, []);

  return (
    <View style={style.container}>
      {/* CABEÇALHO */}

      <View>
        <Image
          source={Topo}
          style={style.topo}
        />

        <Text style={style.text}>
          Olá, {nome || "Aluno"}
        </Text>

        <Image
          source={Exercise}
          style={style.exercise}
        />
      </View>

      {/* CHECK IN + PAGAMENTO */}

      <View style={style.optionsContainer}>
        {/* CHECK IN */}

        <TouchableOpacity
          style={style.option}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate(
              "Checkin"
            )
          }
        >
          <Text style={style.optionText}>
            CHECK IN
          </Text>

          <View style={style.rectangleContainer}>
            <Image
              source={Rectangle}
              style={style.rectangle}
            />

            <Image
              source={require(
                "../../icons/iconcheck.png"
              )}
              style={style.iconCheck}
            />
          </View>
        </TouchableOpacity>

        {/* PAGAMENTO */}

        <TouchableOpacity
          style={style.option}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate(
              "Pagamento"
            )
          }
        >
          <Text style={style.optionText}>
            PAGAMENTO
          </Text>

          <View style={style.rectangleContainer}>
            <Image
              source={Rectangle}
              style={style.rectangle}
            />

            <Image
              source={require(
                "../../icons/iconmoney.png"
              )}
              style={style.iconMoney}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* SAIR */}

      <View style={style.logoutArea}>
        <TouchableOpacity
          style={style.containerButtonInicio}
          onPress={handleLogout}
          activeOpacity={0.4}
        >
          <Text style={style.textButtonSair}>
            SAIR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}