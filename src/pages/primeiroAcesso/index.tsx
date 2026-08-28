import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { supabase } from "../../lib/supabase";
import { style } from "./styles";

export default function PrimeiroAcesso() {
  const [
    novaSenha,
    setNovaSenha,
  ] = useState("");

  const [
    confirmarSenha,
    setConfirmarSenha,
  ] = useState("");

  const [
    salvando,
    setSalvando,
  ] = useState(false);

  async function definirNovaSenha() {
    const senha =
      novaSenha.trim();

    const confirmacao =
      confirmarSenha.trim();

    // ==========================================
    // VALIDAÇÕES
    // ==========================================

    if (!senha) {
      Alert.alert(
        "Atenção",
        "Digite sua nova senha."
      );

      return;
    }

    if (senha.length < 6) {
      Alert.alert(
        "Atenção",
        "A senha deve possuir pelo menos 6 caracteres."
      );

      return;
    }

    if (!confirmacao) {
      Alert.alert(
        "Atenção",
        "Confirme sua nova senha."
      );

      return;
    }

    if (
      senha !==
      confirmacao
    ) {
      Alert.alert(
        "Atenção",
        "As senhas não coincidem."
      );

      return;
    }

    try {
      setSalvando(true);

      // ==========================================
      // 1. IDENTIFICA O ALUNO LOGADO
      // ==========================================

      const {
        data: {
          user,
        },
        error: userError,
      } =
        await supabase.auth.getUser();

      if (
        userError ||
        !user
      ) {
        console.log(
          "Erro ao identificar usuário:",
          userError
        );

        Alert.alert(
          "Erro",
          "Não foi possível identificar sua conta."
        );

        return;
      }

      // ==========================================
      // 2. ALTERA A SENHA NO SUPABASE AUTH
      // ==========================================

      const {
        error: senhaError,
      } =
        await supabase.auth.updateUser({
          password: senha,
        });

      if (senhaError) {
        console.log(
          "Erro ao alterar senha:",
          senhaError
        );

        Alert.alert(
          "Erro",
          senhaError.message ??
            "Não foi possível alterar sua senha."
        );

        return;
      }

      // ==========================================
      // 3. FINALIZA O PRIMEIRO ACESSO
      // ==========================================

      const {
        data: profileAtualizado,
        error: profileError,
      } =
        await supabase
          .from("profiles")
          .update({
            precisa_trocar_senha:
              false,
          })
          .eq(
            "id",
            user.id
          )
          .select(
            "id, precisa_trocar_senha"
          )
          .single();

      console.log(
        "Profile após primeiro acesso:",
        profileAtualizado
      );

      if (profileError) {
        console.log(
          "Erro ao finalizar primeiro acesso:",
          profileError
        );

        Alert.alert(
          "Atenção",
          "Sua senha foi alterada, mas não foi possível concluir o primeiro acesso."
        );

        return;
      }

      // ==========================================
      // 4. ATUALIZA A SESSÃO
      // ==========================================
      //
      // Isso faz o App.tsx consultar novamente
      // o campo precisa_trocar_senha e liberar
      // automaticamente a Home.
      // ==========================================

      const {
        error:
          refreshError,
      } =
        await supabase.auth.refreshSession();

      if (
        refreshError
      ) {
        console.log(
          "Erro ao atualizar sessão:",
          refreshError
        );
      }

      Alert.alert(
        "Senha definida",
        "Sua nova senha foi salva com sucesso."
      );
    } catch (
      error
    ) {
      console.log(
        "Erro inesperado no primeiro acesso:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível concluir o primeiro acesso."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={
        style.keyboardContainer
      }
      behavior={
        Platform.OS ===
        "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        style={
          style.container
        }
        contentContainerStyle={
          style.contentContainer
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={
          false
        }
      >
        <View
          style={
            style.header
          }
        >
          <Text
            style={
              style.title
            }
          >
            Primeiro acesso
          </Text>

          <Text
            style={
              style.subtitle
            }
          >
            Por segurança, crie uma senha pessoal antes de continuar.
          </Text>
        </View>

        <View
          style={
            style.card
          }
        >
          <View
            style={
              style.infoBox
            }
          >
            <Text
              style={
                style.infoTitle
              }
            >
              Crie sua própria senha
            </Text>

            <Text
              style={
                style.infoText
              }
            >
              A senha utilizada para entrar foi criada temporariamente pelo seu profissional.
            </Text>
          </View>

          <Text
            style={
              style.label
            }
          >
            Nova senha
          </Text>

          <TextInput
            style={
              style.input
            }
            value={
              novaSenha
            }
            onChangeText={
              setNovaSenha
            }
            placeholder="Digite sua nova senha"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={
              false
            }
            editable={
              !salvando
            }
          />

          <Text
            style={
              style.helperText
            }
          >
            Utilize pelo menos 6 caracteres.
          </Text>

          <Text
            style={
              style.labelSpacing
            }
          >
            Confirmar nova senha
          </Text>

          <TextInput
            style={
              style.input
            }
            value={
              confirmarSenha
            }
            onChangeText={
              setConfirmarSenha
            }
            placeholder="Digite novamente sua nova senha"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={
              false
            }
            editable={
              !salvando
            }
            onSubmitEditing={
              definirNovaSenha
            }
          />

          <TouchableOpacity
            style={[
              style.button,
              salvando &&
                style.buttonDisabled,
            ]}
            activeOpacity={
              0.7
            }
            disabled={
              salvando
            }
            onPress={
              definirNovaSenha
            }
          >
            {salvando ? (
              <ActivityIndicator
                color="#FFFFFF"
              />
            ) : (
              <Text
                style={
                  style.buttonText
                }
              >
                DEFINIR NOVA SENHA
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}