import React, { useState } from "react";
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
  useFocusEffect,
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

type TipoTreino =
  | "treino_a"
  | "treino_b"
  | "treino_unico"
  | "treino_ab";

type StatusReposicao =
  | "nenhuma"
  | "repor"
  | "realizada";

type Checkin = {
  id: string;
  tipo: "com_personal" | "sem_personal";
  tipo_treino: TipoTreino | null;
  status_reposicao: StatusReposicao;
  data_checkin: string;
  horario_checkin: string;
};

export default function DetalhesAluno() {
  const route = useRoute<DetalhesRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { alunoId } = route.params;

  const [loading, setLoading] = useState(true);

  const [atualizandoId, setAtualizandoId] =
    useState<string | null>(null);

  const [nomeAluno, setNomeAluno] =
    useState("");

  const [checkins, setCheckins] =
    useState<Checkin[]>([]);

 useFocusEffect(
  React.useCallback(() => {
    carregarAluno();
  }, [alunoId])
);
  async function carregarAluno() {
    try {
      setLoading(true);

      // ========================================
      // 1. BUSCA O ALUNO
      // ========================================

      const {
        data: aluno,
        error: alunoError,
      } = await supabase
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

      if (
        alunoError ||
        !aluno
      ) {
        console.log(
          "Erro aluno:",
          alunoError
        );

        Alert.alert(
          "Erro",
          "Não foi possível carregar os dados do aluno."
        );

        return;
      }

      setNomeAluno(
        aluno.profile?.[0]?.nome ??
          "Aluno"
      );

      // ========================================
      // 2. BUSCA O HISTÓRICO
      // ========================================

      const {
        data: checkinsData,
        error: checkinsError,
      } = await supabase
        .from("checkins")
        .select(`
          id,
          tipo,
          tipo_treino,
          status_reposicao,
          data_checkin,
          horario_checkin
        `)
        .eq(
          "aluno_id",
          alunoId
        )
        .order(
          "data_checkin",
          {
            ascending: false,
          }
        )
        .order(
          "horario_checkin",
          {
            ascending: false,
          }
        );

      if (checkinsError) {
        console.log(
          "Erro check-ins:",
          checkinsError
        );

        Alert.alert(
          "Erro",
          "Não foi possível carregar o histórico."
        );

        return;
      }

      setCheckins(
        (checkinsData ??
          []) as Checkin[]
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
  // ATUALIZA REPOSIÇÃO
  // ========================================

  async function atualizarReposicao(
    checkinId: string,
    novoStatus: StatusReposicao
  ) {
    if (atualizandoId) {
      return;
    }

    try {
      setAtualizandoId(
        checkinId
      );

      const {
        data,
        error,
      } = await supabase
        .from("checkins")
        .update({
          status_reposicao:
            novoStatus,
        })
        .eq(
          "id",
          checkinId
        )
        .select();

      console.log(
        "Resultado update:",
        data
      );

      console.log(
        "Erro update:",
        error
      );

      if (error) {
        Alert.alert(
          "Erro",
          "Não foi possível atualizar o status da reposição."
        );

        return;
      }

      if (
        !data ||
        data.length === 0
      ) {
        Alert.alert(
          "Atenção",
          "Nenhum registro foi atualizado."
        );

        return;
      }

      setCheckins(
        (listaAtual) =>
          listaAtual.map(
            (item) =>
              item.id ===
              checkinId
                ? {
                    ...item,
                    status_reposicao:
                      novoStatus,
                  }
                : item
          )
      );
    } catch (error) {
      console.log(
        "Erro inesperado:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível atualizar a reposição."
      );
    } finally {
      setAtualizandoId(
        null
      );
    }
  }

  function formatarData(
    data: string
  ) {
    const [
      ano,
      mes,
      dia,
    ] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  function formatarHorario(
    data: string
  ) {
    return new Date(
      data
    ).toLocaleTimeString(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  function formatarTipoTreino(
    tipoTreino:
      | TipoTreino
      | null
  ) {
    switch (
      tipoTreino
    ) {
      case "treino_a":
        return "Treino A";

      case "treino_b":
        return "Treino B";

      case "treino_unico":
        return "Treino Único";

      case "treino_ab":
        return "Treino A+B";

      default:
        return "Treino não informado";
    }
  }

  function textoReposicao(
    status: StatusReposicao
  ) {
    switch (status) {
      case "repor":
        return "⚠ Reposição pendente";

      case "realizada":
        return "✓ Reposição realizada";

      default:
        return "";
    }
  }

  if (loading) {
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
          Carregando...
        </Text>
      </View>
    );
  }

  const hoje =
    new Date()
      .toISOString()
      .split("-")
      .slice(0, 3)
      .join("-");

  const checkinHoje =
    checkins.find(
      (item) =>
        item.data_checkin ===
        hoje
    );

  return (
    <ScrollView
      style={
        style.container
      }
      contentContainerStyle={
        style.contentContainer
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* VOLTAR */}

      <TouchableOpacity
        style={
          style.backButton
        }
        onPress={() =>
          navigation.goBack()
        }
        activeOpacity={0.7}
      >
        <Text
          style={
            style.backButtonText
          }
        >
          ‹ Voltar
        </Text>
      </TouchableOpacity>

      {/* NOME DO ALUNO */}

      <Text
        style={style.title}
      >
        {nomeAluno}
      </Text>

      <Text
        style={
          style.subtitle
        }
      >
        Detalhes e histórico de presença
      </Text>

      {/* EDITAR ALUNO */}

      <TouchableOpacity
        style={
          style.editButton
        }
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate(
            "EditarAluno",
            {
              alunoId,
            }
          )
        }
      >
        <Text
          style={
            style.editButtonText
          }
        >
          EDITAR ALUNO
        </Text>
      </TouchableOpacity>

      {/* RESUMO */}

      <View
        style={
          style.summaryCard
        }
      >
        <Text
          style={
            style.summaryLabel
          }
        >
          Total de check-ins
        </Text>

        <Text
          style={
            style.summaryNumber
          }
        >
          {checkins.length}
        </Text>
      </View>

      {/* STATUS DE HOJE */}

      <Text
        style={
          style.sectionTitle
        }
      >
        Status de hoje
      </Text>

      {checkinHoje ? (
        <View
          style={
            style.presentCard
          }
        >
          <Text
            style={
              style.presentTitle
            }
          >
            ✓ Presente hoje
          </Text>

          <Text
            style={
              style.presentDetails
            }
          >
            {formatarTipoTreino(
              checkinHoje.tipo_treino
            )}

            {" • "}

            {checkinHoje.tipo ===
            "com_personal"
              ? "Com personal"
              : "Sem personal"}

            {" • "}

            {formatarHorario(
              checkinHoje.horario_checkin
            )}
          </Text>

          {checkinHoje.status_reposicao !==
            "nenhuma" && (
            <Text
              style={
                style.reposicaoStatus
              }
            >
              {textoReposicao(
                checkinHoje.status_reposicao
              )}
            </Text>
          )}
        </View>
      ) : (
        <View
          style={
            style.absentCard
          }
        >
          <Text
            style={
              style.absentTitle
            }
          >
            Ainda não fez check-in hoje
          </Text>
        </View>
      )}

      {/* HISTÓRICO */}

      <Text
        style={
          style.sectionTitle
        }
      >
        Histórico de presença
      </Text>

      {checkins.length ===
      0 ? (
        <View
          style={
            style.emptyCard
          }
        >
          <Text
            style={
              style.emptyText
            }
          >
            Nenhum check-in registrado.
          </Text>
        </View>
      ) : (
        checkins.map(
          (item) => (
            <View
              key={item.id}
              style={
                style.historyCard
              }
            >
              <View
                style={
                  style.historyContent
                }
              >
                <Text
                  style={
                    style.historyDate
                  }
                >
                  {formatarData(
                    item.data_checkin
                  )}
                </Text>

                <Text
                  style={
                    style.historyType
                  }
                >
                  {formatarTipoTreino(
                    item.tipo_treino
                  )}

                  {" • "}

                  {item.tipo ===
                  "com_personal"
                    ? "Com personal"
                    : "Sem personal"}
                </Text>

                {item.status_reposicao !==
                  "nenhuma" && (
                  <Text
                    style={
                      style.reposicaoStatus
                    }
                  >
                    {textoReposicao(
                      item.status_reposicao
                    )}
                  </Text>
                )}

                {/* REPOR TREINO */}

                {item.status_reposicao ===
                  "nenhuma" && (
                  <TouchableOpacity
                    style={
                      style.reporButton
                    }
                    activeOpacity={
                      0.7
                    }
                    disabled={
                      atualizandoId ===
                      item.id
                    }
                    onPress={() =>
                      atualizarReposicao(
                        item.id,
                        "repor"
                      )
                    }
                  >
                    {atualizandoId ===
                    item.id ? (
                      <ActivityIndicator />
                    ) : (
                      <Text
                        style={
                          style.reporButtonText
                        }
                      >
                        REPOR TREINO
                      </Text>
                    )}
                  </TouchableOpacity>
                )}

                {/* REPOSIÇÃO REALIZADA */}

                {item.status_reposicao ===
                  "repor" && (
                  <TouchableOpacity
                    style={
                      style.realizadaButton
                    }
                    activeOpacity={
                      0.7
                    }
                    disabled={
                      atualizandoId ===
                      item.id
                    }
                    onPress={() =>
                      atualizarReposicao(
                        item.id,
                        "realizada"
                      )
                    }
                  >
                    {atualizandoId ===
                    item.id ? (
                      <ActivityIndicator />
                    ) : (
                      <Text
                        style={
                          style.realizadaButtonText
                        }
                      >
                        REPOSIÇÃO REALIZADA
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>

              <Text
                style={
                  style.historyTime
                }
              >
                {formatarHorario(
                  item.horario_checkin
                )}
              </Text>
            </View>
          )
        )
      )}
    </ScrollView>
  );
}