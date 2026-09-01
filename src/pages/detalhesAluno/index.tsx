import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";

import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import {
  supabase,
} from "../../lib/supabase";

import {
  RootStackParamList,
} from "../../../App";

import {
  style,
} from "./styles";

// ==========================================
// TIPOS DE NAVEGAÇÃO
// ==========================================

type DetalhesRouteProp =
  RouteProp<
    RootStackParamList,
    "DetalhesAluno"
  >;

type NavigationProp =
  NativeStackNavigationProp<
    RootStackParamList,
    "DetalhesAluno"
  >;

// ==========================================
// TIPOS
// ==========================================

type TipoTreino =
  | "treino_a"
  | "treino_b"
  | "treino_unico"
  | "treino_ab";

type StatusReposicao =
  | "nenhuma"
  | "repor"
  | "realizada";

type OrigemCheckin =
  | "aluno"
  | "profissional";

type TipoCheckin =
  | "com_personal"
  | "sem_personal";

type Checkin = {
  id: string;
  tipo: TipoCheckin;
  tipo_treino: TipoTreino | null;
  status_reposicao: StatusReposicao;
  origem_checkin: OrigemCheckin;
  data_checkin: string;
  horario_checkin: string;
};

// ==========================================
// COMPONENTE
// ==========================================

export default function DetalhesAluno() {
  const route =
    useRoute<DetalhesRouteProp>();

  const navigation =
    useNavigation<NavigationProp>();

  const {
    alunoId,
  } =
    route.params;

  // ==========================================
  // ESTADOS DA TELA
  // ==========================================

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    atualizandoId,
    setAtualizandoId,
  ] =
    useState<string | null>(
      null
    );

  const [
    nomeAluno,
    setNomeAluno,
  ] =
    useState("");

  const [
    checkins,
    setCheckins,
  ] =
    useState<Checkin[]>(
      []
    );

  // ==========================================
  // CHECK-IN PELO PROFISSIONAL
  // ==========================================

  const [
    modalCheckinAberto,
    setModalCheckinAberto,
  ] =
    useState(false);

  const [
    tipoTreinoSelecionado,
    setTipoTreinoSelecionado,
  ] =
    useState<TipoTreino | null>(
      null
    );

  const [
    salvandoCheckin,
    setSalvandoCheckin,
  ] =
    useState(false);

  // ==========================================
  // CARREGA AO ENTRAR / VOLTAR PARA A TELA
  // ==========================================

  useFocusEffect(
    React.useCallback(() => {
      carregarAluno();
    }, [alunoId])
  );

  // ==========================================
  // CARREGA ALUNO
  // ==========================================

  async function carregarAluno() {
    try {
      setLoading(
        true
      );

      // ========================================
      // 1. BUSCA O ALUNO
      // ========================================

      const {
        data: aluno,
        error: alunoError,
      } =
        await supabase
          .from("alunos")
          .select(`
            id,
            user_id,
            profile:profiles (
              nome
            )
          `)
          .eq(
            "id",
            alunoId
          )
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
        aluno.profile?.[0]
          ?.nome ??
          "Aluno"
      );

      // ========================================
      // 2. BUSCA O HISTÓRICO
      // ========================================

      const {
        data: checkinsData,
        error: checkinsError,
      } =
        await supabase
          .from("checkins")
          .select(`
            id,
            tipo,
            tipo_treino,
            status_reposicao,
            origem_checkin,
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

      if (
        checkinsError
      ) {
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
        (
          checkinsData ??
          []
        ) as Checkin[]
      );
    } catch (
      error
    ) {
      console.log(
        "Erro inesperado:",
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
  // REALIZA CHECK-IN PELO PROFISSIONAL
  // ==========================================

  async function realizarCheckinProfissional(
    tipo: TipoCheckin
  ) {
    if (
      !tipoTreinoSelecionado
    ) {
      Alert.alert(
        "Atenção",
        "Selecione o tipo de treino."
      );

      return;
    }

    try {
      setSalvandoCheckin(
        true
      );

      // ========================================
      // IDENTIFICA USUÁRIO LOGADO
      // ========================================

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
          "Erro usuário:",
          userError
        );

        Alert.alert(
          "Erro",
          "Não foi possível identificar o profissional."
        );

        return;
      }

      // ========================================
      // BUSCA ID DO PROFISSIONAL
      // ========================================

      const {
        data: profissional,
        error: profissionalError,
      } =
        await supabase
          .from("profissionais")
          .select("id")
          .eq(
            "user_id",
            user.id
          )
          .single();

      if (
        profissionalError ||
        !profissional
      ) {
        console.log(
          "Erro profissional:",
          profissionalError
        );

        Alert.alert(
          "Erro",
          "Profissional não encontrado."
        );

        return;
      }

      // ========================================
      // INSERE CHECK-IN
      // ========================================

      const {
        error: checkinError,
      } =
        await supabase
          .from("checkins")
          .insert({
            aluno_id:
              alunoId,

            profissional_id:
              profissional.id,

            tipo,

            tipo_treino:
              tipoTreinoSelecionado,

            status_reposicao:
              "nenhuma",

            origem_checkin:
              "profissional",
          });

      if (
        checkinError
      ) {
        console.log(
          "Erro check-in profissional:",
          checkinError
        );

        // ======================================
        // CHECK-IN DUPLICADO
        // ======================================

        if (
          checkinError.code ===
          "23505"
        ) {
          Alert.alert(
            "Check-in já realizado",
            "Este aluno já possui um check-in registrado hoje."
          );

          setModalCheckinAberto(
            false
          );

          setTipoTreinoSelecionado(
            null
          );

          return;
        }

        Alert.alert(
          "Erro",
          "Não foi possível registrar o check-in."
        );

        return;
      }

      // ========================================
      // SUCESSO
      // ========================================

      setModalCheckinAberto(
        false
      );

      setTipoTreinoSelecionado(
        null
      );

      Alert.alert(
        "Check-in realizado",
        "O check-in foi registrado pelo profissional."
      );

      await carregarAluno();
    } catch (
      error
    ) {
      console.log(
        "Erro inesperado no check-in:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível realizar o check-in."
      );
    } finally {
      setSalvandoCheckin(
        false
      );
    }
  }

  // ==========================================
  // ATUALIZA REPOSIÇÃO
  // ==========================================

  async function atualizarReposicao(
    checkinId: string,
    novoStatus:
      StatusReposicao
  ) {
    if (
      atualizandoId
    ) {
      return;
    }

    try {
      setAtualizandoId(
        checkinId
      );

      const {
        data,
        error,
      } =
        await supabase
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

      if (
        error
      ) {
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
        (
          listaAtual
        ) =>
          listaAtual.map(
            (
              item
            ) =>
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
    } catch (
      error
    ) {
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

  // ==========================================
  // FORMATADORES
  // ==========================================

  function formatarData(
    data: string
  ) {
    const [
      ano,
      mes,
      dia,
    ] =
      data.split("-");

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
        hour:
          "2-digit",

        minute:
          "2-digit",
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
    status:
      StatusReposicao
  ) {
    switch (
      status
    ) {
      case "repor":
        return "⚠ Reposição pendente";

      case "realizada":
        return "✓ Reposição realizada";

      default:
        return "";
    }
  }

  // ==========================================
  // ABRIR MODAL DE CHECK-IN
  // ==========================================

  function abrirModalCheckin() {
    const hoje =
      new Date()
        .toISOString()
        .split("T")[0];

    const jaPossuiCheckin =
      checkins.some(
        (
          item
        ) =>
          item.data_checkin ===
          hoje
      );

    if (
      jaPossuiCheckin
    ) {
      Alert.alert(
        "Check-in já realizado",
        "Este aluno já possui um check-in registrado hoje."
      );

      return;
    }

    setTipoTreinoSelecionado(
      null
    );

    setModalCheckinAberto(
      true
    );
  }

  // ==========================================
  // FECHA MODAL
  // ==========================================

  function fecharModalCheckin() {
    if (
      salvandoCheckin
    ) {
      return;
    }

    setModalCheckinAberto(
      false
    );

    setTipoTreinoSelecionado(
      null
    );
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
          Carregando...
        </Text>
      </View>
    );
  }

  // ==========================================
  // CHECK-IN DE HOJE
  // ==========================================

  const hoje =
    new Date()
      .toISOString()
      .split("T")[0];

  const checkinHoje =
    checkins.find(
      (
        item
      ) =>
        item.data_checkin ===
        hoje
    );

  // ==========================================
  // TELA
  // ==========================================

  return (
    <>
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
        {/* =====================================
            VOLTAR
        ===================================== */}

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

        {/* =====================================
            NOME DO ALUNO
        ===================================== */}

        <Text
          style={
            style.title
          }
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

        {/* =====================================
            EDITAR ALUNO
        ===================================== */}

        <TouchableOpacity
          style={
            style.editButton
          }
          activeOpacity={
            0.7
          }
          onPress={
            () =>
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

        {/* =====================================
            CHECK-IN PELO PROFISSIONAL
        ===================================== */}

        <TouchableOpacity
          style={
            style.checkinButton
          }
          activeOpacity={
            0.7
          }
          onPress={
            abrirModalCheckin
          }
        >
          <Text
            style={
              style.checkinButtonText
            }
          >
            REALIZAR CHECK-IN
          </Text>
        </TouchableOpacity>

        {/* =====================================
            RESUMO
        ===================================== */}

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

        {/* =====================================
            STATUS DE HOJE
        ===================================== */}

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

            {checkinHoje.origem_checkin ===
              "profissional" && (
              <Text
                style={
                  style.origemCheckin
                }
              >
                Check-in realizado pelo profissional
              </Text>
            )}

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

        {/* =====================================
            HISTÓRICO
        ===================================== */}

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
            (
              item
            ) => (
              <View
                key={
                  item.id
                }
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

                  {/* ORIGEM DO CHECK-IN */}

                  {item.origem_checkin ===
                    "profissional" && (
                    <Text
                      style={
                        style.origemCheckin
                      }
                    >
                      Check-in realizado pelo profissional
                    </Text>
                  )}

                  {/* STATUS REPOSIÇÃO */}

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
                      onPress={
                        () =>
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
                      onPress={
                        () =>
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

      {/* ==========================================
          MODAL CHECK-IN
      ========================================== */}

      <Modal
        visible={
          modalCheckinAberto
        }
        transparent
        animationType="fade"
        onRequestClose={
          fecharModalCheckin
        }
      >
        <View
          style={
            style.modalOverlay
          }
        >
          <View
            style={
              style.modalCard
            }
          >
            <Text
              style={
                style.modalTitle
              }
            >
              Realizar check-in
            </Text>

            <Text
              style={
                style.modalAluno
              }
            >
              {nomeAluno}
            </Text>

            <Text
              style={
                style.modalSubtitle
              }
            >
              Selecione o treino realizado pelo aluno.
            </Text>

            {/* TREINO A */}

            <TouchableOpacity
              style={[
                style.treinoButton,

                tipoTreinoSelecionado ===
                  "treino_a" &&
                  style.treinoButtonSelected,
              ]}
              activeOpacity={
                0.7
              }
              disabled={
                salvandoCheckin
              }
              onPress={
                () =>
                  setTipoTreinoSelecionado(
                    "treino_a"
                  )
              }
            >
              <Text
                style={[
                  style.treinoButtonText,

                  tipoTreinoSelecionado ===
                    "treino_a" &&
                    style.treinoButtonTextSelected,
                ]}
              >
                Treino A
              </Text>
            </TouchableOpacity>

            {/* TREINO B */}

            <TouchableOpacity
              style={[
                style.treinoButton,

                tipoTreinoSelecionado ===
                  "treino_b" &&
                  style.treinoButtonSelected,
              ]}
              activeOpacity={
                0.7
              }
              disabled={
                salvandoCheckin
              }
              onPress={
                () =>
                  setTipoTreinoSelecionado(
                    "treino_b"
                  )
              }
            >
              <Text
                style={[
                  style.treinoButtonText,

                  tipoTreinoSelecionado ===
                    "treino_b" &&
                    style.treinoButtonTextSelected,
                ]}
              >
                Treino B
              </Text>
            </TouchableOpacity>

            {/* TREINO ÚNICO */}

            <TouchableOpacity
              style={[
                style.treinoButton,

                tipoTreinoSelecionado ===
                  "treino_unico" &&
                  style.treinoButtonSelected,
              ]}
              activeOpacity={
                0.7
              }
              disabled={
                salvandoCheckin
              }
              onPress={
                () =>
                  setTipoTreinoSelecionado(
                    "treino_unico"
                  )
              }
            >
              <Text
                style={[
                  style.treinoButtonText,

                  tipoTreinoSelecionado ===
                    "treino_unico" &&
                    style.treinoButtonTextSelected,
                ]}
              >
                Treino Único
              </Text>
            </TouchableOpacity>

            {/* TREINO A+B */}

            <TouchableOpacity
              style={[
                style.treinoButton,

                tipoTreinoSelecionado ===
                  "treino_ab" &&
                  style.treinoButtonSelected,
              ]}
              activeOpacity={
                0.7
              }
              disabled={
                salvandoCheckin
              }
              onPress={
                () =>
                  setTipoTreinoSelecionado(
                    "treino_ab"
                  )
              }
            >
              <Text
                style={[
                  style.treinoButtonText,

                  tipoTreinoSelecionado ===
                    "treino_ab" &&
                    style.treinoButtonTextSelected,
                ]}
              >
                Treino A+B
              </Text>
            </TouchableOpacity>

            {/* COMO FOI REALIZADO */}

            <Text
              style={
                style.modalQuestion
              }
            >
              Como foi realizado?
            </Text>

            {/* COM PERSONAL */}

            <TouchableOpacity
              style={[
                style.personalButton,

                (
                  salvandoCheckin ||
                  !tipoTreinoSelecionado
                ) &&
                  style.modalButtonDisabled,
              ]}
              activeOpacity={
                0.7
              }
              disabled={
                salvandoCheckin ||
                !tipoTreinoSelecionado
              }
              onPress={
                () =>
                  realizarCheckinProfissional(
                    "com_personal"
                  )
              }
            >
              {salvandoCheckin ? (
                <ActivityIndicator
                  color="#FFFFFF"
                />
              ) : (
                <Text
                  style={
                    style.personalButtonText
                  }
                >
                  COM PERSONAL
                </Text>
              )}
            </TouchableOpacity>

            {/* SEM PERSONAL */}

            <TouchableOpacity
              style={[
                style.semPersonalButton,

                (
                  salvandoCheckin ||
                  !tipoTreinoSelecionado
                ) &&
                  style.modalButtonDisabled,
              ]}
              activeOpacity={
                0.7
              }
              disabled={
                salvandoCheckin ||
                !tipoTreinoSelecionado
              }
              onPress={
                () =>
                  realizarCheckinProfissional(
                    "sem_personal"
                  )
              }
            >
              <Text
                style={
                  style.semPersonalButtonText
                }
              >
                SEM PERSONAL
              </Text>
            </TouchableOpacity>

            {/* CANCELAR */}

            <TouchableOpacity
              style={
                style.cancelButton
              }
              activeOpacity={
                0.7
              }
              disabled={
                salvandoCheckin
              }
              onPress={
                fecharModalCheckin
              }
            >
              <Text
                style={
                  style.cancelButtonText
                }
              >
                CANCELAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}