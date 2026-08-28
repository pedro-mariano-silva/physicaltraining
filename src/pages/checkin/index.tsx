import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
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

type TipoCheckin =
  | "com_personal"
  | "sem_personal";

type TipoTreino =
  | "treino_a"
  | "treino_b"
  | "treino_unico"
  | "treino_ab";

export default function Checkin() {
  const navigation =
    useNavigation<NavProps>();

  const [loading, setLoading] =
    useState(false);

  const [
    tipoTreinoSelecionado,
    setTipoTreinoSelecionado,
  ] = useState<TipoTreino | null>(
    null
  );

  const [
    modalVisivel,
    setModalVisivel,
  ] = useState(false);

  const [fontsLoaded] = useFonts({
    OpenSans: {
      uri: "https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-U1U5Ew7ytN1k7VfttU.woff2",
      display: FontDisplay.FALLBACK,
    },
  });

  function selecionarTreino(
    tipoTreino: TipoTreino
  ) {
    if (loading) return;

    setTipoTreinoSelecionado(
      tipoTreino
    );

    setModalVisivel(true);
  }

  function fecharModal() {
    if (loading) return;

    setModalVisivel(false);
  }

  function nomeTipoTreino() {
    switch (
      tipoTreinoSelecionado
    ) {
      case "treino_a":
        return "TREINO A";

      case "treino_b":
        return "TREINO B";

      case "treino_unico":
        return "TREINO ÚNICO";

      case "treino_ab":
        return "TREINO A+B";

      default:
        return "";
    }
  }

  async function realizarCheckin(
    tipo: TipoCheckin
  ) {
    if (loading) return;

    if (
      !tipoTreinoSelecionado
    ) {
      Alert.alert(
        "Selecione o treino",
        "Informe qual treino você irá realizar hoje."
      );

      return;
    }

    try {
      setLoading(true);

      // ========================================
      // 1. USUÁRIO LOGADO
      // ========================================

      const {
        data: { user },
        error: userError,
      } =
        await supabase.auth.getUser();

      if (
        userError ||
        !user
      ) {
        Alert.alert(
          "Erro",
          "Não foi possível identificar o usuário logado."
        );

        return;
      }

      console.log(
        "USUÁRIO LOGADO:",
        user.id
      );

      // ========================================
      // 2. BUSCA O ALUNO
      // ========================================

      const {
        data: aluno,
        error: alunoError,
      } = await supabase
        .from("alunos")
        .select(
          "id, profissional_id"
        )
        .eq(
          "user_id",
          user.id
        )
        .single();

      console.log(
        "ALUNO:",
        aluno
      );

      console.log(
        "ERRO ALUNO:",
        alunoError
      );

      if (
        alunoError ||
        !aluno
      ) {
        Alert.alert(
          "Cadastro não encontrado",
          "Seu usuário não está vinculado a um profissional."
        );

        return;
      }

      // ========================================
      // 3. GRAVA O CHECK-IN
      // ========================================

      const {
        data: checkin,
        error: checkinError,
      } = await supabase
        .from("checkins")
        .insert({
          aluno_id:
            aluno.id,

          profissional_id:
            aluno.profissional_id,

          tipo: tipo,

          tipo_treino:
            tipoTreinoSelecionado,

          status_reposicao:
            "nenhuma",
        })
        .select()
        .single();

      console.log(
        "CHECKIN:",
        checkin
      );

      console.log(
        "ERRO CHECKIN:",
        checkinError
      );

      // ========================================
      // ERRO DO CHECK-IN
      // ========================================

      if (checkinError) {
        if (
          checkinError.code ===
          "23505"
        ) {
          setModalVisivel(false);

          Alert.alert(
            "Check-in já realizado",
            "Você já registrou seu check-in hoje.",
            [
              {
                text: "OK",
                onPress: () =>
                  navigation.popToTop(),
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

      // ========================================
      // 4. FECHA MODAL
      // ========================================

      setModalVisivel(false);

      // ========================================
      // 5. TELA DE SUCESSO
      // ========================================

      if (
        tipo ===
        "com_personal"
      ) {
        navigation.navigate(
          "checkinPersonal"
        );
      } else {
        navigation.navigate(
          "checkinsemPersonal"
        );
      }
    } catch (error) {
      console.log(
        "ERRO INESPERADO:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível registrar o check-in."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      style={style.container}
    >
      {/* TOPO */}

      <View>
        <Image
          source={Topo}
          style={style.topo}
        />

        <Text
          style={style.text}
        >
          CHECK IN
        </Text>
      </View>

      {/* TÍTULO */}

      <View
        style={
          style.containerTitle
        }
      >
        <Text
          style={style.title}
        >
          QUAL TREINO VOCÊ IRÁ
          REALIZAR HOJE?
        </Text>
      </View>

      {/* TIPOS DE TREINO */}

      <View
        style={
          style.containerTreinos
        }
      >
        <TouchableOpacity
          style={[
            style.botaoTreino,

            tipoTreinoSelecionado ===
              "treino_a" &&
              style.botaoTreinoSelecionado,
          ]}
          activeOpacity={0.7}
          disabled={loading}
          onPress={() =>
            selecionarTreino(
              "treino_a"
            )
          }
        >
          <Text
            style={[
              style.textoTreino,

              tipoTreinoSelecionado ===
                "treino_a" &&
                style.textoTreinoSelecionado,
            ]}
          >
            TREINO A
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            style.botaoTreino,

            tipoTreinoSelecionado ===
              "treino_b" &&
              style.botaoTreinoSelecionado,
          ]}
          activeOpacity={0.7}
          disabled={loading}
          onPress={() =>
            selecionarTreino(
              "treino_b"
            )
          }
        >
          <Text
            style={[
              style.textoTreino,

              tipoTreinoSelecionado ===
                "treino_b" &&
                style.textoTreinoSelecionado,
            ]}
          >
            TREINO B
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            style.botaoTreino,

            tipoTreinoSelecionado ===
              "treino_unico" &&
              style.botaoTreinoSelecionado,
          ]}
          activeOpacity={0.7}
          disabled={loading}
          onPress={() =>
            selecionarTreino(
              "treino_unico"
            )
          }
        >
          <Text
            style={[
              style.textoTreino,

              tipoTreinoSelecionado ===
                "treino_unico" &&
                style.textoTreinoSelecionado,
            ]}
          >
            TREINO ÚNICO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            style.botaoTreino,

            tipoTreinoSelecionado ===
              "treino_ab" &&
              style.botaoTreinoSelecionado,
          ]}
          activeOpacity={0.7}
          disabled={loading}
          onPress={() =>
            selecionarTreino(
              "treino_ab"
            )
          }
        >
          <Text
            style={[
              style.textoTreino,

              tipoTreinoSelecionado ===
                "treino_ab" &&
                style.textoTreinoSelecionado,
            ]}
          >
            TREINO A+B
          </Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}

      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={
          fecharModal
        }
      >
        <View
          style={
            style.modalOverlay
          }
        >
          <View
            style={
              style.modalContainer
            }
          >
            <Text
              style={
                style.modalTreino
              }
            >
              {nomeTipoTreino()}
            </Text>

            <Text
              style={
                style.modalTitle
              }
            >
              COMO DESEJA REALIZAR
              O CHECK-IN?
            </Text>

            <TouchableOpacity
              style={
                style.modalButton
              }
              activeOpacity={0.7}
              disabled={loading}
              onPress={() =>
                realizarCheckin(
                  "com_personal"
                )
              }
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text
                  style={
                    style.modalButtonText
                  }
                >
                  COM PERSONAL
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={
                style.modalButton
              }
              activeOpacity={0.7}
              disabled={loading}
              onPress={() =>
                realizarCheckin(
                  "sem_personal"
                )
              }
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text
                  style={
                    style.modalButtonText
                  }
                >
                  SEM PERSONAL
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={
                style.modalCancelButton
              }
              activeOpacity={0.7}
              disabled={loading}
              onPress={
                fecharModal
              }
            >
              <Text
                style={
                  style.modalCancelText
                }
              >
                CANCELAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}