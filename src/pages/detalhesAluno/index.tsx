import React, {
  useState,
} from "react";

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
  | "treino_ab"
  | "forca"
  | "cardio";

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
  origem_checkin: OrigemCheckin;
  data_checkin: string;
  horario_checkin: string;
};

type StatusReposicao =
  | "pendente"
  | "realizada"
  | "cancelada";

type Reposicao = {
  id: string;
  data_reposicao: string;
  status: StatusReposicao;
  created_at: string;
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

  const [
    reposicoes,
    setReposicoes,
  ] =
    useState<Reposicao[]>(
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
  // REPOSIÇÃO INDEPENDENTE
  // ==========================================

  const [
    modalReposicaoAberto,
    setModalReposicaoAberto,
  ] =
    useState(false);

  const [
    dataReposicaoSelecionada,
    setDataReposicaoSelecionada,
  ] =
    useState(
      inicioDoDia(
        new Date()
      )
    );

  const [
    mesCalendario,
    setMesCalendario,
  ] =
    useState(
      primeiroDiaDoMes(
        new Date()
      )
    );

  const [
    salvandoReposicao,
    setSalvandoReposicao,
  ] =
    useState(false);

  const [
    atualizandoReposicaoId,
    setAtualizandoReposicaoId,
  ] =
    useState<string | null>(
      null
    );

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
      // 2. BUSCA O HISTÓRICO DE CHECK-INS
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

      // ========================================
      // 3. BUSCA AS REPOSIÇÕES
      // ========================================

      const {
        data: reposicoesData,
        error: reposicoesError,
      } =
        await supabase
          .from("reposicoes")
          .select(`
            id,
            data_reposicao,
            status,
            created_at
          `)
          .eq(
            "aluno_id",
            alunoId
          )
          .order(
            "data_reposicao",
            {
              ascending: false,
            }
          )
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (
        reposicoesError
      ) {
        console.log(
          "Erro reposições:",
          reposicoesError
        );

        Alert.alert(
          "Erro",
          "Não foi possível carregar as reposições."
        );

        return;
      }

      setReposicoes(
        (
          reposicoesData ??
          []
        ) as Reposicao[]
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
  // BUSCA O PROFISSIONAL LOGADO
  // ==========================================

  async function buscarProfissionalId() {
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

      return null;
    }

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

      return null;
    }

    return profissional.id as string;
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

      const profissionalId =
        await buscarProfissionalId();

      if (
        !profissionalId
      ) {
        Alert.alert(
          "Erro",
          "Não foi possível identificar o profissional."
        );

        return;
      }

      const {
        error: checkinError,
      } =
        await supabase
          .from("checkins")
          .insert({
            aluno_id:
              alunoId,

            profissional_id:
              profissionalId,

            tipo,

            tipo_treino:
              tipoTreinoSelecionado,

            status_reposicao:
              "nenhuma",

            origem_checkin:
              "profissional",

            data_reposicao:
              null,
          });

      if (
        checkinError
      ) {
        console.log(
          "Erro check-in profissional:",
          checkinError
        );

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
  // ABRE MODAL DE REPOSIÇÃO
  // ==========================================

  function abrirModalReposicao() {
    const hoje =
      inicioDoDia(
        new Date()
      );

    setDataReposicaoSelecionada(
      hoje
    );

    setMesCalendario(
      primeiroDiaDoMes(
        hoje
      )
    );

    setModalReposicaoAberto(
      true
    );
  }

  // ==========================================
  // FECHA MODAL DE REPOSIÇÃO
  // ==========================================

  function fecharModalReposicao() {
    if (
      salvandoReposicao
    ) {
      return;
    }

    setModalReposicaoAberto(
      false
    );
  }

  // ==========================================
  // CONFIRMA REPOSIÇÃO
  // ==========================================

  async function confirmarReposicao() {
    try {
      setSalvandoReposicao(
        true
      );

      const profissionalId =
        await buscarProfissionalId();

      if (
        !profissionalId
      ) {
        Alert.alert(
          "Erro",
          "Não foi possível identificar o profissional."
        );

        return;
      }

      const dataBanco =
        formatarDataBanco(
          dataReposicaoSelecionada
        );

      const {
        data,
        error,
      } =
        await supabase
          .from("reposicoes")
          .insert({
            aluno_id:
              alunoId,

            profissional_id:
              profissionalId,

            data_reposicao:
              dataBanco,

            status:
              "pendente",
          })
          .select(`
            id,
            data_reposicao,
            status,
            created_at
          `)
          .single();

      if (
        error
      ) {
        console.log(
          "Erro ao marcar reposição:",
          error
        );

        Alert.alert(
          "Erro",
          "Não foi possível marcar a reposição."
        );

        return;
      }

      setReposicoes(
        listaAtual => [
          data as Reposicao,
          ...listaAtual,
        ]
      );

      setModalReposicaoAberto(
        false
      );

      Alert.alert(
        "Reposição marcada",
        `Reposição agendada para ${formatarData(
          dataBanco
        )}.`
      );
    } catch (
      error
    ) {
      console.log(
        "Erro inesperado na reposição:",
        error
      );

      Alert.alert(
        "Erro",
        "Não foi possível marcar a reposição."
      );
    } finally {
      setSalvandoReposicao(
        false
      );
    }
  }

  // ==========================================
  // MARCA REPOSIÇÃO COMO REALIZADA
  // ==========================================

  async function marcarReposicaoRealizada(
    reposicaoId: string
  ) {
    if (
      atualizandoReposicaoId
    ) {
      return;
    }

    try {
      setAtualizandoReposicaoId(
        reposicaoId
      );

      const {
        data,
        error,
      } =
        await supabase
          .from("reposicoes")
          .update({
            status:
              "realizada",
          })
          .eq(
            "id",
            reposicaoId
          )
          .select("id");

      if (
        error
      ) {
        console.log(
          "Erro ao concluir reposição:",
          error
        );

        Alert.alert(
          "Erro",
          "Não foi possível concluir a reposição."
        );

        return;
      }

      if (
        !data ||
        data.length === 0
      ) {
        Alert.alert(
          "Atenção",
          "Nenhuma reposição foi atualizada."
        );

        return;
      }

      setReposicoes(
        listaAtual =>
          listaAtual.map(
            item =>
              item.id ===
              reposicaoId
                ? {
                    ...item,
                    status:
                      "realizada",
                  }
                : item
          )
      );

      Alert.alert(
        "Reposição concluída",
        "A reposição foi marcada como realizada."
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
        "Não foi possível concluir a reposição."
      );
    } finally {
      setAtualizandoReposicaoId(
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

      case "forca":
        return "Treino de Força";

      case "cardio":
        return "Cardio";

      default:
        return "Treino não informado";
    }
  }

  function textoStatusReposicao(
    status:
      StatusReposicao
  ) {
    switch (
      status
    ) {
      case "pendente":
        return "⚠ Reposição pendente";

      case "realizada":
        return "✓ Reposição realizada";

      case "cancelada":
        return "Reposição cancelada";

      default:
        return "";
    }
  }

  // ==========================================
  // ABRIR MODAL DE CHECK-IN
  // ==========================================

  function abrirModalCheckin() {
    const hoje =
      formatarDataBanco(
        new Date()
      );

    const jaPossuiCheckin =
      checkins.some(
        item =>
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
  // FECHA MODAL CHECK-IN
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
  // CALENDÁRIO
  // ==========================================

  const diasSemana = [
    "D",
    "S",
    "T",
    "Q",
    "Q",
    "S",
    "S",
  ];

  const nomeMes =
    mesCalendario.toLocaleDateString(
      "pt-BR",
      {
        month:
          "long",

        year:
          "numeric",
      }
    );

  const primeiroDia =
    new Date(
      mesCalendario.getFullYear(),
      mesCalendario.getMonth(),
      1
    );

  const quantidadeDias =
    new Date(
      mesCalendario.getFullYear(),
      mesCalendario.getMonth() + 1,
      0
    ).getDate();

  const espacosAntes =
    primeiroDia.getDay();

  const celulasCalendario:
    Array<
      number | null
    > = [
      ...Array(
        espacosAntes
      ).fill(
        null
      ),

      ...Array.from(
        {
          length:
            quantidadeDias,
        },
        (
          _,
          indice
        ) =>
          indice + 1
      ),
    ];

  while (
    celulasCalendario.length %
      7 !==
    0
  ) {
    celulasCalendario.push(
      null
    );
  }

  const hojeCalendario =
    inicioDoDia(
      new Date()
    );

  const podeVoltarMes =
    primeiroDiaDoMes(
      mesCalendario
    ).getTime() >
    primeiroDiaDoMes(
      hojeCalendario
    ).getTime();

  function voltarMes() {
    if (
      !podeVoltarMes
    ) {
      return;
    }

    setMesCalendario(
      new Date(
        mesCalendario.getFullYear(),
        mesCalendario.getMonth() - 1,
        1
      )
    );
  }

  function avancarMes() {
    setMesCalendario(
      new Date(
        mesCalendario.getFullYear(),
        mesCalendario.getMonth() + 1,
        1
      )
    );
  }

  function selecionarDia(
    dia: number
  ) {
    const data =
      inicioDoDia(
        new Date(
          mesCalendario.getFullYear(),
          mesCalendario.getMonth(),
          dia
        )
      );

    if (
      data.getTime() <
      hojeCalendario.getTime()
    ) {
      return;
    }

    // Um único toque seleciona a data.
    setDataReposicaoSelecionada(
      data
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
    formatarDataBanco(
      new Date()
    );

  const checkinHoje =
    checkins.find(
      item =>
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
        {/* VOLTAR */}

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

        {/* NOME DO ALUNO */}

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
          Detalhes, presença e reposições
        </Text>

        {/* EDITAR ALUNO */}

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

        {/* CHECK-IN PELO PROFISSIONAL */}

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

        {/* REPOSIÇÃO INDEPENDENTE DO CHECK-IN */}

        <TouchableOpacity
          style={
            style.reporButton
          }
          activeOpacity={
            0.7
          }
          onPress={
            abrirModalReposicao
          }
        >
          <Text
            style={
              style.reporButtonText
            }
          >
            MARCAR REPOSIÇÃO
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

        {/* REPOSIÇÕES */}

        <Text
          style={
            style.sectionTitle
          }
        >
          Reposições
        </Text>

        {reposicoes.length ===
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
              Nenhuma reposição marcada.
            </Text>
          </View>
        ) : (
          reposicoes.map(
            item => (
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
                      item.data_reposicao
                    )}
                  </Text>

                  <Text
                    style={
                      style.reposicaoStatus
                    }
                  >
                    {textoStatusReposicao(
                      item.status
                    )}
                  </Text>

                  {item.status ===
                    "pendente" && (
                    <TouchableOpacity
                      style={
                        style.realizadaButton
                      }
                      activeOpacity={
                        0.7
                      }
                      disabled={
                        atualizandoReposicaoId ===
                        item.id
                      }
                      onPress={
                        () =>
                          marcarReposicaoRealizada(
                            item.id
                          )
                      }
                    >
                      {atualizandoReposicaoId ===
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
              </View>
            )
          )
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
            item => (
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

      {/* ==========================================
          MODAL REPOSIÇÃO
      ========================================== */}

      <Modal
        visible={
          modalReposicaoAberto
        }
        transparent
        animationType="fade"
        onRequestClose={
          fecharModalReposicao
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
              Marcar reposição
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
              Selecione o dia da reposição.
              Um toque é suficiente.
            </Text>

            {/* CABEÇALHO DO CALENDÁRIO */}

            <View
              style={{
                width:
                  "100%",

                flexDirection:
                  "row",

                alignItems:
                  "center",

                justifyContent:
                  "space-between",

                marginTop:
                  8,

                marginBottom:
                  14,
              }}
            >
              <TouchableOpacity
                activeOpacity={
                  0.7
                }
                disabled={
                  !podeVoltarMes
                }
                onPress={
                  voltarMes
                }
                style={{
                  width:
                    44,

                  height:
                    44,

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  opacity:
                    podeVoltarMes
                      ? 1
                      : 0.25,
                }}
              >
                <Text
                  style={{
                    fontSize:
                      28,

                    fontWeight:
                      "700",
                  }}
                >
                  ‹
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  fontSize:
                    17,

                  fontWeight:
                    "700",

                  textTransform:
                    "capitalize",
                }}
              >
                {nomeMes}
              </Text>

              <TouchableOpacity
                activeOpacity={
                  0.7
                }
                onPress={
                  avancarMes
                }
                style={{
                  width:
                    44,

                  height:
                    44,

                  alignItems:
                    "center",

                  justifyContent:
                    "center",
                }}
              >
                <Text
                  style={{
                    fontSize:
                      28,

                    fontWeight:
                      "700",
                  }}
                >
                  ›
                </Text>
              </TouchableOpacity>
            </View>

            {/* DIAS DA SEMANA */}

            <View
              style={{
                width:
                  "100%",

                flexDirection:
                  "row",
              }}
            >
              {diasSemana.map(
                (
                  dia,
                  indice
                ) => (
                  <View
                    key={
                      `${dia}-${indice}`
                    }
                    style={{
                      width:
                        "14.2857%",

                      alignItems:
                        "center",

                      paddingVertical:
                        6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize:
                          12,

                        fontWeight:
                          "700",

                        opacity:
                          0.55,
                      }}
                    >
                      {dia}
                    </Text>
                  </View>
                )
              )}
            </View>

            {/* DIAS DO MÊS */}

            <View
              style={{
                width:
                  "100%",

                flexDirection:
                  "row",

                flexWrap:
                  "wrap",

                marginBottom:
                  14,
              }}
            >
              {celulasCalendario.map(
                (
                  dia,
                  indice
                ) => {
                  if (
                    dia ===
                    null
                  ) {
                    return (
                      <View
                        key={
                          `vazio-${indice}`
                        }
                        style={{
                          width:
                            "14.2857%",

                          height:
                            44,
                        }}
                      />
                    );
                  }

                  const dataDia =
                    inicioDoDia(
                      new Date(
                        mesCalendario.getFullYear(),
                        mesCalendario.getMonth(),
                        dia
                      )
                    );

                  const passado =
                    dataDia.getTime() <
                    hojeCalendario.getTime();

                  const selecionado =
                    formatarDataBanco(
                      dataDia
                    ) ===
                    formatarDataBanco(
                      dataReposicaoSelecionada
                    );

                  return (
                    <View
                      key={
                        `dia-${dia}-${indice}`
                      }
                      style={{
                        width:
                          "14.2857%",

                        height:
                          44,

                        alignItems:
                          "center",

                        justifyContent:
                          "center",
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={
                          0.7
                        }
                        disabled={
                          passado
                        }
                        onPress={
                          () =>
                            selecionarDia(
                              dia
                            )
                        }
                        style={{
                          width:
                            36,

                          height:
                            36,

                          borderRadius:
                            18,

                          alignItems:
                            "center",

                          justifyContent:
                            "center",

                          backgroundColor:
                            selecionado
                              ? "#6C63FF"
                              : "transparent",

                          opacity:
                            passado
                              ? 0.25
                              : 1,
                        }}
                      >
                        <Text
                          style={{
                            fontSize:
                              15,

                            fontWeight:
                              selecionado
                                ? "700"
                                : "500",

                            color:
                              selecionado
                                ? "#FFFFFF"
                                : "#222222",
                          }}
                        >
                          {dia}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
              )}
            </View>

            <Text
              style={{
                textAlign:
                  "center",

                fontSize:
                  16,

                fontWeight:
                  "600",

                marginBottom:
                  18,
              }}
            >
              Data selecionada:{" "}
              {dataReposicaoSelecionada.toLocaleDateString(
                "pt-BR"
              )}
            </Text>

            <TouchableOpacity
              style={
                style.reporButton
              }
              activeOpacity={
                0.7
              }
              disabled={
                salvandoReposicao
              }
              onPress={
                confirmarReposicao
              }
            >
              {salvandoReposicao ? (
                <ActivityIndicator />
              ) : (
                <Text
                  style={
                    style.reporButtonText
                  }
                >
                  CONFIRMAR REPOSIÇÃO
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={
                style.cancelButton
              }
              activeOpacity={
                0.7
              }
              disabled={
                salvandoReposicao
              }
              onPress={
                fecharModalReposicao
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

// ==========================================
// FUNÇÕES AUXILIARES DE DATA
// ==========================================

function inicioDoDia(
  data: Date
) {
  return new Date(
    data.getFullYear(),
    data.getMonth(),
    data.getDate()
  );
}

function primeiroDiaDoMes(
  data: Date
) {
  return new Date(
    data.getFullYear(),
    data.getMonth(),
    1
  );
}

function formatarDataBanco(
  data: Date
) {
  const ano =
    data.getFullYear();

  const mes =
    String(
      data.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const dia =
    String(
      data.getDate()
    ).padStart(
      2,
      "0"
    );

  return `${ano}-${mes}-${dia}`;
}
