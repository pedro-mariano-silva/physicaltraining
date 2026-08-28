import React, {
  useEffect,
  useState,
} from "react";

import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  View,
} from "react-native";

import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import {
  RootStackParamList,
} from "../../../App";

import {
  supabase,
} from "../../lib/supabase";

import {
  style,
} from "./styles";

import {
  Ionicons,
} from "@expo/vector-icons";

type EditarAlunoRouteProp =
  RouteProp<
    RootStackParamList,
    "EditarAluno"
  >;

type NavigationProp =
  NativeStackNavigationProp<
    RootStackParamList,
    "EditarAluno"
  >;

export default function EditarAluno() {
  const route =
    useRoute<
      EditarAlunoRouteProp
    >();

  const navigation =
    useNavigation<
      NavigationProp
    >();

  const {
    alunoId,
  } =
    route.params;

  const [
    nome,
    setNome,
  ] =
    useState("");

  const [
    email,
    setEmail,
  ] =
    useState("");

  const [
    senhaTemporaria,
    setSenhaTemporaria,
  ] =
    useState("");

  const [
    confirmarSenha,
    setConfirmarSenha,
  ] =
    useState("");

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    salvando,
    setSalvando,
  ] =
    useState(false);

  const [
    mostrarSenha,
    setMostrarSenha,
  ] =
    useState(false);

  const [
    mostrarConfirmacao,
    setMostrarConfirmacao,
  ] =
    useState(false);

  // ==========================================
  // CARREGA ALUNO
  // ==========================================

  useEffect(() => {
    carregarAluno();
  }, [
    alunoId,
  ]);

  async function carregarAluno() {
    try {
      setLoading(
        true
      );

      const {
        data,
        error,
      } =
        await supabase.functions.invoke(
          "editar-aluno",
          {
            body: {
              acao:
                "buscar",

              alunoId,
            },
          }
        );

      console.log(
        "Dados editar aluno:",
        data
      );

      console.log(
        "Erro carregar editar aluno:",
        error
      );

      if (error) {
        let mensagem =
          "Não foi possível carregar os dados do aluno.";

        try {
          const contexto =
            await error.context?.json();

          if (
            contexto?.error
          ) {
            mensagem =
              contexto.error;
          }
        } catch {}

        Alert.alert(
          "Erro",
          mensagem
        );

        return;
      }

      if (
        data?.error
      ) {
        Alert.alert(
          "Erro",
          data.error
        );

        return;
      }

      setNome(
        data?.aluno
          ?.nome ??
          ""
      );

      setEmail(
        data?.aluno
          ?.email ??
          ""
      );
    } catch (
      error
    ) {
      console.log(
        "Erro inesperado ao carregar aluno:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível carregar os dados."
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  // ==========================================
  // SALVAR ALTERAÇÕES
  // ==========================================

  async function salvarAlteracoes() {
    const nomeLimpo =
      nome.trim();

    const emailLimpo =
      email
        .trim()
        .toLowerCase();

    const senhaLimpa =
      senhaTemporaria.trim();

    const confirmacaoLimpa =
      confirmarSenha.trim();

    // ==========================================
    // VALIDAÇÕES
    // ==========================================

    if (!nomeLimpo) {
      Alert.alert(
        "Atenção",
        "Digite o nome do aluno."
      );

      return;
    }

    if (!emailLimpo) {
      Alert.alert(
        "Atenção",
        "Digite o e-mail do aluno."
      );

      return;
    }

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        emailLimpo
      );

    if (!emailValido) {
      Alert.alert(
        "Atenção",
        "Digite um e-mail válido."
      );

      return;
    }

    if (
      senhaLimpa &&
      senhaLimpa.length < 6
    ) {
      Alert.alert(
        "Atenção",
        "A senha temporária deve ter pelo menos 6 caracteres."
      );

      return;
    }

    if (
      senhaLimpa !==
      confirmacaoLimpa
    ) {
      Alert.alert(
        "Atenção",
        "As senhas temporárias não coincidem."
      );

      return;
    }

    try {
      setSalvando(
        true
      );

      const {
        data,
        error,
      } =
        await supabase.functions.invoke(
          "editar-aluno",
          {
            body: {
              acao:
                "salvar",

              alunoId,

              nome:
                nomeLimpo,

              email:
                emailLimpo,

              novaSenha:
                senhaLimpa,
            },
          }
        );

      console.log(
        "Resultado editar aluno:",
        data
      );

      console.log(
        "Erro editar aluno:",
        error
      );

      if (error) {
        let mensagem =
          "Não foi possível salvar as alterações.";

        try {
          const contexto =
            await error.context?.json();

          if (
            contexto?.error
          ) {
            mensagem =
              contexto.error;
          }
        } catch {}

        Alert.alert(
          "Erro",
          mensagem
        );

        return;
      }

      if (
        data?.error
      ) {
        Alert.alert(
          "Erro",
          data.error
        );

        return;
      }

      // ==========================================
      // SUCESSO
      // ==========================================

      if (
        senhaLimpa
      ) {
        Alert.alert(
          "Senha temporária criada",
          "Os dados foram atualizados. O aluno deverá entrar usando essa senha temporária e será obrigado a criar uma nova senha pessoal no próximo acesso.",
          [
            {
              text:
                "OK",

              onPress:
                () =>
                  navigation.goBack(),
            },
          ]
        );

        return;
      }

      Alert.alert(
        "Sucesso",
        "Nome e e-mail foram atualizados.",
        [
          {
            text:
              "OK",

            onPress:
              () =>
                navigation.goBack(),
          },
        ]
      );
    } catch (
      error
    ) {
      console.log(
        "Erro inesperado ao salvar:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível salvar as alterações."
      );
    } finally {
      setSalvando(
        false
      );
    }
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (
    loading
  ) {
    return (
      <View
        style={
          style.loadingContainer
        }
      >
        <ActivityIndicator
          size="large"
        />

        <Text
          style={
            style.loadingText
          }
        >
          Carregando aluno...
        </Text>
      </View>
    );
  }

  // ==========================================
  // TELA
  // ==========================================

  return (
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
      <TouchableOpacity
        style={
          style.backButton
        }
        onPress={
          () =>
            navigation.goBack()
        }
        activeOpacity={
          0.7
        }
      >
        <Text
          style={
            style.backButtonText
          }
        >
          ‹ Voltar
        </Text>
      </TouchableOpacity>

      <Text
        style={
          style.title
        }
      >
        Editar aluno
      </Text>

      <Text
        style={
          style.subtitle
        }
      >
        Atualize os dados do aluno ou crie uma senha temporária.
      </Text>

      <View
        style={
          style.formCard
        }
      >
        {/* NOME */}

        <Text
          style={
            style.label
          }
        >
          Nome
        </Text>

        <TextInput
          style={
            style.input
          }
          value={
            nome
          }
          onChangeText={
            setNome
          }
          placeholder="Nome do aluno"
          placeholderTextColor="#999"
          autoCapitalize="words"
          editable={
            !salvando
          }
        />

        {/* EMAIL */}

        <Text
          style={
            style.labelSpacing
          }
        >
          E-mail
        </Text>

        <TextInput
          style={
            style.input
          }
          value={
            email
          }
          onChangeText={
            setEmail
          }
          placeholder="E-mail do aluno"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={
            false
          }
          keyboardType="email-address"
          editable={
            !salvando
          }
        />

        {/* SEPARADOR */}

        <View
          style={
            style.separator
          }
        />

        {/* SENHA TEMPORÁRIA */}

        <Text
          style={
            style.passwordTitle
          }
        >
          Redefinir senha
        </Text>

        <Text
          style={
            style.passwordDescription
          }
        >
          Use esta opção somente se o aluno esqueceu a senha.
          A nova senha será temporária e deverá ser alterada
          pelo próprio aluno no próximo acesso.
        </Text>

        <Text
          style={
            style.labelSpacing
          }
        >
          Senha temporária
        </Text>

        <View
          style={
            style.passwordInputContainer
          }
        >
          <TextInput
            style={
              style.passwordInput
            }
            value={
              senhaTemporaria
            }
            onChangeText={
              setSenhaTemporaria
            }
            placeholder="Deixe vazio para não redefinir"
            placeholderTextColor="#999"
            secureTextEntry={
              !mostrarSenha
            }
            autoCapitalize="none"
            autoCorrect={
              false
            }
            editable={
              !salvando
            }
          />

          <TouchableOpacity
            style={
              style.eyeButton
            }
            onPress={
              () =>
                setMostrarSenha(
                  (valorAtual) =>
                    !valorAtual
                )
            }
            activeOpacity={
              0.7
            }
            disabled={
              salvando
            }
          >
            <Ionicons
              name={
                mostrarSenha
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={
                22
              }
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <Text
          style={
            style.helperText
          }
        >
          Mínimo de 6 caracteres.
        </Text>

        <Text
          style={
            style.labelSpacing
          }
        >
          Confirmar senha temporária
        </Text>

        <View
          style={
            style.passwordInputContainer
          }
        >
          <TextInput
            style={
              style.passwordInput
            }
            value={
              confirmarSenha
            }
            onChangeText={
              setConfirmarSenha
            }
            placeholder="Digite novamente"
            placeholderTextColor="#999"
            secureTextEntry={
              !mostrarConfirmacao
            }
            autoCapitalize="none"
            autoCorrect={
              false
            }
            editable={
              !salvando
            }
          />

          <TouchableOpacity
            style={
              style.eyeButton
            }
            onPress={
              () =>
                setMostrarConfirmacao(
                  (valorAtual) =>
                    !valorAtual
                )
            }
            activeOpacity={
              0.7
            }
            disabled={
              salvando
            }
          >
            <Ionicons
              name={
                mostrarConfirmacao
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={
                22
              }
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* SALVAR */}

        <TouchableOpacity
          style={[
            style.saveButton,

            salvando &&
              style.saveButtonDisabled,
          ]}
          activeOpacity={
            0.7
          }
          disabled={
            salvando
          }
          onPress={
            salvarAlteracoes
          }
        >
          {salvando ? (
            <ActivityIndicator
              color="#FFFFFF"
            />
          ) : (
            <Text
              style={
                style.saveButtonText
              }
            >
              SALVAR ALTERAÇÕES
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}