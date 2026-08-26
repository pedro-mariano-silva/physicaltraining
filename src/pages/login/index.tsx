import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { style } from "./styles";
import Logo from "../../img/logo.png";
import { supabase } from "../../lib/supabase";
import { RootStackParamList } from "../../../App";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function Login() {
  const navigation = useNavigation<NavigationProp>();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  async function getLogin() {
    if (!user.trim() || !password) {
      Alert.alert("Atenção", "Informe seu e-mail e senha.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: user.trim(),
        password,
      });

      if (error) {
        console.log("Erro de login:", error);

        Alert.alert(
          "Não foi possível entrar",
          "E-mail ou senha inválidos."
        );

        return;
      }

      
    } catch (error) {
      console.log("Erro inesperado:", error);

      Alert.alert(
        "Erro",
        "Não foi possível realizar o login. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} />
        <Text style={style.text}>Login</Text>
      </View>

      <View style={style.boxMid}>
        <Text style={style.titleInput}>E-MAIL</Text>

        <View style={style.boxInput}>
          <TextInput
            placeholder="Digite seu e-mail"
            placeholderTextColor="#999"
            value={user}
            onChangeText={setUser}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={{
              flex: 1,
              textAlignVertical: "center",
              fontSize: 16,
            }}
          />
        </View>

        <Text style={style.titleInput}>SENHA</Text>

        <View
          style={[
            style.boxInput,
            {
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={showPassword}
            style={{
              flex: 1,
              textAlignVertical: "center",
              fontSize: 16,
              paddingLeft: 10,
            }}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ paddingHorizontal: 10 }}
          >
            <Ionicons
              name={
                showPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color="#555"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.boxButton}>
        <TouchableOpacity
          style={style.button}
          onPress={getLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={style.buttonLogar}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text>DESENVOLVIDO POR PEDRO MARIANO</Text>
    </View>
  );
}