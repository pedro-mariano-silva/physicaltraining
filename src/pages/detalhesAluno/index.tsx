import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";

import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { supabase } from "../../lib/supabase";
import { RootStackParamList } from "../../../App";
import { style } from "./styles";

type DetalhesRouteProp = RouteProp<
  RootStackParamList,
  "DetalhesAluno"
>;

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DetalhesAluno"
>;

type Checkin = {
  id: string;
  tipo: "com_personal" | "sem_personal";
  data_checkin: string;
  horario_checkin: string;
};

export default function DetalhesAluno() {
  const route = useRoute<DetalhesRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { alunoId } = route.params;

  const [loading, setLoading] = useState(true);
  const [nomeAluno, setNomeAluno] = useState("");
  const [checkins, setCheckins] = useState<Checkin[]>([]);

  useEffect(() => {
    carregarAluno();
  }, [alunoId]);

  async function carregarAluno() {
    try {
      setLoading(true);

      // Busca o aluno e o perfil vinculado
      const { data: aluno, error: alunoError } = await supabase
        .from("alunos")
        .select(`
          id,
          user_id,
          profile:profiles (
            nome
          )
        `)
        .eq("id", alunoId)
        .single();

      if (alunoError || !aluno) {
        console.log("Erro aluno:", alunoError);

        Alert.alert(
          "Erro",
          "Não foi possível carregar os dados do aluno."
        );

        return;
      }

      // O Supabase está retornando profile como array
      setNomeAluno(aluno.profile?.[0]?.nome ?? "Aluno");

      // Busca o histórico de check-ins
      const { data: checkinsData, error: checkinsError } =
        await supabase
          .from("checkins")
          .select(`
            id,
            tipo,
            data_checkin,
            horario_checkin
          `)
          .eq("aluno_id", alunoId)
          .order("data_checkin", { ascending: false })
          .order("horario_checkin", { ascending: false });

      if (checkinsError) {
        console.log("Erro check-ins:", checkinsError);

        Alert.alert(
          "Erro",
          "Não foi possível carregar o histórico."
        );

        return;
      }

      setCheckins((checkinsData ?? []) as Checkin[]);
    } catch (error) {
      console.log("Erro inesperado:", error);

      Alert.alert(
        "Erro",
        "Não foi possível carregar os dados."
      );
    } finally {
      setLoading(false);
    }
  }

  function formatarData(data: string) {
    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  function formatarHorario(data: string) {
    return new Date(data).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={style.loadingText}>
          Carregando...
        </Text>
      </View>
    );
  }

  const hoje = new Date().toISOString().split("T")[0];

  const checkinHoje = checkins.find(
    (item) => item.data_checkin === hoje
  );

  return (
    <ScrollView
      style={style.container}
      contentContainerStyle={style.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={style.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={style.backButtonText}>
          ‹ Voltar
        </Text>
      </TouchableOpacity>

      <Text style={style.title}>
        {nomeAluno}
      </Text>

      <Text style={style.subtitle}>
        Detalhes e histórico de presença
      </Text>

      {/* Resumo */}
      <View style={style.summaryCard}>
        <Text style={style.summaryLabel}>
          Total de check-ins
        </Text>

        <Text style={style.summaryNumber}>
          {checkins.length}
        </Text>
      </View>

      {/* Status de hoje */}
      <Text style={style.sectionTitle}>
        Status de hoje
      </Text>

      {checkinHoje ? (
        <View style={style.presentCard}>
          <Text style={style.presentTitle}>
            ✓ Presente hoje
          </Text>

          <Text style={style.presentDetails}>
            {checkinHoje.tipo === "com_personal"
              ? "Com personal"
              : "Sem personal"}
            {" • "}
            {formatarHorario(
              checkinHoje.horario_checkin
            )}
          </Text>
        </View>
      ) : (
        <View style={style.absentCard}>
          <Text style={style.absentTitle}>
            Ainda não fez check-in hoje
          </Text>
        </View>
      )}

      {/* Histórico */}
      <Text style={style.sectionTitle}>
        Histórico de presença
      </Text>

      {checkins.length === 0 ? (
        <View style={style.emptyCard}>
          <Text style={style.emptyText}>
            Nenhum check-in registrado.
          </Text>
        </View>
      ) : (
        checkins.map((item) => (
          <View
            key={item.id}
            style={style.historyCard}
          >
            <View>
              <Text style={style.historyDate}>
                {formatarData(
                  item.data_checkin
                )}
              </Text>

              <Text style={style.historyType}>
                {item.tipo === "com_personal"
                  ? "Com personal"
                  : "Sem personal"}
              </Text>
            </View>

            <Text style={style.historyTime}>
              {formatarHorario(
                item.horario_checkin
              )}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}