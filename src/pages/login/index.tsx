import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { style } from "./styles";
import Logo from "../../img/logo.png";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  async function getLogin() {
    try {
      setLoading(true);
      if (!user || !password) {
        return Alert.alert("Atenção", "Informe seus dados para logar");
      }

      setTimeout(() => {
        Alert.alert("Logado com sucesso");
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} />
        <Text style={style.text}>Login</Text>
      </View>

      <View style={style.boxMid}>
        <Text style={style.titleInput}>USUÁRIO</Text>

        <View style={style.boxInput}>
          <TextInput
            placeholder="Digite seu usuário"
            placeholderTextColor="#999"
            value={user}
            onChangeText={setUser}
            style={{ flex: 1, textAlignVertical: "center", fontSize: 16 }}
          />
        </View>

        <Text style={style.titleInput}>SENHA</Text>

        {/* Campo senha com ícone */}
        <View style={[style.boxInput, { flexDirection: "row", alignItems: "center" }]}>
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={showPassword}
            style={{ flex: 1, textAlignVertical: "center", fontSize: 16, paddingLeft: 10 }}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ paddingHorizontal: 10 }}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#555"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.boxButton}>
        <TouchableOpacity style={style.button} onPress={() => getLogin()}>
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
