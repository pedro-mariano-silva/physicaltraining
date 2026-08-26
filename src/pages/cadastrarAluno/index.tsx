import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../App";
import { style } from "./styles";

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  "CadastrarAluno"
>;

export default function CadastrarAluno() {
  const navigation = useNavigation<NavProps>();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function cadastrarAluno() {
    if (!nome.trim() || !email.trim() || !senha) {
      Alert.alert(
        "Atenção",
        "Preencha nome, e-mail e senha."
      );
      return;
    }

    try {
      setLoading(true);

      // Por enquanto só validamos a tela.
      // Depois vamos chamar a Edge Function do Supabase.

      Alert.alert(
        "Cadastro",
        "Tela pronta. No próximo passo vamos conectar ao Supabase."
      );
    } catch (error) {
      console.log("Erro:", error);

      Alert.alert(
        "Erro",
        "Não foi possível cadastrar o aluno."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={style.container}
      contentContainerStyle={style.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={style.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={style.backButtonText}>
          ‹ Voltar
        </Text>
      </TouchableOpacity>

      <Text style={style.title}>
        Cadastrar aluno
      </Text>

      <Text style={style.subtitle}>
        Crie o acesso de um novo aluno.
      </Text>

      <Text style={style.label}>
        NOME
      </Text>

      <TextInput
        style={style.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={style.label}>
        E-MAIL
      </Text>

      <TextInput
        style={style.input}
        placeholder="E-mail do aluno"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={style.label}>
        TELEFONE
      </Text>

      <TextInput
        style={style.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={setTelefone}
      />

      <Text style={style.label}>
        SENHA INICIAL
      </Text>

      <TextInput
        style={style.input}
        placeholder="Senha inicial"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={style.button}
        onPress={cadastrarAluno}
        disabled={loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={style.buttonText}>
            CADASTRAR ALUNO
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}