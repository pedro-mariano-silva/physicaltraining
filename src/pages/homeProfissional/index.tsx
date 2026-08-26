import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { supabase } from "../../lib/supabase";
import { style } from "./styles";
import { RootStackParamList } from "../../../App";

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  "HomeProfissional"
>;

type AlunoProfissional = {
  id: string;
  user_id: string;
  nome: string;
};

type CheckinHoje = {
  id: string;
  aluno_id: string;
  tipo: "com_personal" | "sem_personal";
  horario_checkin: string;
};

export default function HomeProfissional() {
  const navigation = useNavigation<NavProps>();

  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [alunos, setAlunos] = useState<AlunoProfissional[]>([]);
  const [checkinsHoje, setCheckinsHoje] = useState<CheckinHoje[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setLoading(true);

      // ========================================
      // 1. USUÁRIO AUTENTICADO
      // ========================================

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        Alert.alert(
          "Erro",
          "Não foi possível identificar o usuário."
        );

        return;
      }

      // ========================================
      // 2. NOME DO PROFISSIONAL
      // ========================================

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("nome")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.log("Erro profile:", profileError);
      } else {
        setNome(profile.nome);
      }

      // ========================================
      // 3. CADASTRO DO PROFISSIONAL
      // ========================================

      const { data: profissional, error: profissionalError } =
        await supabase
          .from("profissionais")
          .select("id")
          .eq("user_id", user.id)
          .single();

      if (profissionalError || !profissional) {
        console.log(
          "Erro profissional:",
          profissionalError
        );

        Alert.alert(
          "Erro",
          "Não foi possível localizar o cadastro profissional."
        );

        return;
      }

      // ========================================
      // 4. ALUNOS VINCULADOS
      // ========================================

      const { data: alunosData, error: alunosError } =
        await supabase
          .from("alunos")
          .select("id, user_id")
          .eq("profissional_id", profissional.id);

      if (alunosError) {
        console.log("Erro alunos:", alunosError);

        Alert.alert(
          "Erro",
          "Não foi possível carregar os alunos."
        );

        return;
      }

      const alunosBase = alunosData ?? [];

      // ========================================
      // 5. BUSCA OS NOMES DOS ALUNOS
      // ========================================

      if (alunosBase.length > 0) {
        const userIds = alunosBase.map(
          (aluno) => aluno.user_id
        );

        const { data: profilesAlunos, error: profilesError } =
          await supabase
            .from("profiles")
            .select("id, nome")
            .in("id", userIds);

        if (profilesError) {
          console.log(
            "Erro profiles alunos:",
            profilesError
          );

          Alert.alert(
            "Erro",
            "Não foi possível carregar os nomes dos alunos."
          );

          return;
        }

        const listaAlunos: AlunoProfissional[] =
          alunosBase.map((aluno) => {
            const perfil = profilesAlunos?.find(
              (profile) =>
                profile.id === aluno.user_id
            );

            return {
              id: aluno.id,
              user_id: aluno.user_id,
              nome: perfil?.nome ?? "Aluno",
            };
          });

        setAlunos(listaAlunos);
      } else {
        setAlunos([]);
      }

      // ========================================
      // 6. DATA DE HOJE
      // ========================================

      const hoje = new Date()
        .toISOString()
        .split("T")[0];

      // ========================================
      // 7. CHECK-INS DE HOJE
      // ========================================

      const { data: checkins, error: checkinsError } =
        await supabase
          .from("checkins")
          .select(`
            id,
            aluno_id,
            tipo,
            horario_checkin
          `)
          .eq(
            "profissional_id",
            profissional.id
          )
          .eq("data_checkin", hoje)
          .order("horario_checkin", {
            ascending: false,
          });

      if (checkinsError) {
        console.log(
          "Erro checkins:",
          checkinsError
        );

        Alert.alert(
          "Erro",
          "Não foi possível carregar os check-ins de hoje."
        );

        return;
      }

      setCheckinsHoje(
        (checkins ?? []) as CheckinHoje[]
      );
    } catch (error) {
      console.log(
        "Erro inesperado:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível carregar os dados."
      );
    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // LOGOUT
  // ========================================

  async function handleLogout() {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      Alert.alert(
        "Erro",
        "Não foi possível sair da conta."
      );
    }
  }

  // ========================================
  // HORÁRIO
  // ========================================

  function formatarHorario(data: string) {
    return new Date(data).toLocaleTimeString(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  // ========================================
  // ENCONTRA ALUNO PELO ID
  // ========================================

  function buscarAluno(alunoId: string) {
    return alunos.find(
      (aluno) => aluno.id === alunoId
    );
  }

  // ========================================
  // LOADING
  // ========================================

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

  return (
    <ScrollView
      style={style.container}
      contentContainerStyle={
        style.contentContainer
      }
      showsVerticalScrollIndicator={false}
    >
      {/* CABEÇALHO */}

      <View style={style.header}>
        <Text style={style.welcomeText}>
          Olá,
        </Text>

        <Text
          style={style.professionalName}
        >
          {nome}
        </Text>

        <Text style={style.subtitle}>
          Acompanhe seus alunos e os check-ins de hoje.
        </Text>
      </View>

      {/* RESUMO */}

      <View
        style={style.summaryContainer}
      >
        <View style={style.summaryCard}>
          <Text
            style={style.summaryNumber}
          >
            {alunos.length}
          </Text>

          <Text
            style={style.summaryLabel}
          >
            Alunos
          </Text>
        </View>

        <View style={style.summaryCard}>
          <Text
            style={style.summaryNumber}
          >
            {checkinsHoje.length}
          </Text>

          <Text
            style={style.summaryLabel}
          >
            Presentes hoje
          </Text>
        </View>
      </View>

      {/* CHECK-INS */}

      <Text style={style.sectionTitle}>
        Check-ins de hoje
      </Text>

      {checkinsHoje.length === 0 ? (
        <View style={style.emptyCard}>
          <Text style={style.emptyTitle}>
            Nenhum check-in hoje
          </Text>

          <Text style={style.emptyText}>
            Os check-ins dos seus alunos aparecerão aqui.
          </Text>
        </View>
      ) : (
        checkinsHoje.map((item) => {
          const aluno = buscarAluno(
            item.aluno_id
          );

          const nomeAluno =
            aluno?.nome ?? "Aluno";

          return (
            <View
              key={item.id}
              style={style.checkinCard}
            >
              <View
                style={
                  style.checkinHeader
                }
              >
                <View style={style.avatar}>
                  <Text
                    style={style.avatarText}
                  >
                    {nomeAluno
                      .charAt(0)
                      .toUpperCase()}
                  </Text>
                </View>

                <View
                  style={
                    style.checkinInfo
                  }
                >
                  <Text
                    style={
                      style.studentName
                    }
                  >
                    {nomeAluno}
                  </Text>

                  <Text
                    style={
                      style.checkinType
                    }
                  >
                    {item.tipo ===
                    "com_personal"
                      ? "Com personal"
                      : "Sem personal"}
                  </Text>
                </View>

                <View
                  style={
                    style.timeContainer
                  }
                >
                  <Text
                    style={style.timeText}
                  >
                    {formatarHorario(
                      item.horario_checkin
                    )}
                  </Text>
                </View>
              </View>
            </View>
          );
        })
      )}

      

      {/* MEUS ALUNOS */}

      <Text style={style.sectionTitle}>
        Meus alunos
      </Text>

      {alunos.length === 0 ? (
        <View style={style.emptyCard}>
          <Text style={style.emptyTitle}>
            Nenhum aluno
          </Text>

          <Text style={style.emptyText}>
            Você ainda não possui alunos vinculados.
          </Text>
        </View>
      ) : (
        alunos.map((aluno) => {
          const checkin =
            checkinsHoje.find(
              (item) =>
                item.aluno_id === aluno.id
            );

          return (
            <TouchableOpacity
              key={aluno.id}
              style={style.studentCard}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate(
                  "DetalhesAluno",
                  {
                    alunoId: aluno.id,
                  }
                )
              }
            >
              <View
                style={
                  style.studentHeader
                }
              >
                <View style={style.avatar}>
                  <Text
                    style={style.avatarText}
                  >
                    {aluno.nome
                      .charAt(0)
                      .toUpperCase()}
                  </Text>
                </View>

                <View
                  style={
                    style.studentInfo
                  }
                >
                  <Text
                    style={
                      style.studentName
                    }
                  >
                    {aluno.nome}
                  </Text>

                  {checkin ? (
                    <>
                      <Text
                        style={
                          style.presentText
                        }
                      >
                        ✓ Presente hoje
                      </Text>

                      <Text
                        style={
                          style.studentDetails
                        }
                      >
                        {checkin.tipo ===
                        "com_personal"
                          ? "Com personal"
                          : "Sem personal"}

                        {" • "}

                        {formatarHorario(
                          checkin.horario_checkin
                        )}
                      </Text>
                    </>
                  ) : (
                    <Text
                      style={
                        style.absentText
                      }
                    >
                      Ainda não fez check-in hoje
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      )}
<TouchableOpacity
  style={style.addStudentButton}
  activeOpacity={0.7}
  onPress={() => navigation.navigate("CadastrarAluno")}
>
  <Text style={style.addStudentButtonText}>
    + CADASTRAR ALUNO </Text>
 </TouchableOpacity>
      {/* ATUALIZAR */}

      <TouchableOpacity
        style={style.updateButton}
        onPress={carregarDados}
        activeOpacity={0.7}
      >
        <Text
          style={
            style.updateButtonText
          }
        >
          ATUALIZAR
        </Text>
      </TouchableOpacity>

      {/* SAIR */}

      <TouchableOpacity
        style={style.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Text
          style={
            style.logoutButtonText
          }
        >
          SAIR
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}