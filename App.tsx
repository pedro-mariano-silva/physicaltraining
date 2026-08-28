import React, {
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  View,
} from "react-native";

import {
  StatusBar,
} from "expo-status-bar";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  Session,
} from "@supabase/supabase-js";

import Login from "./src/pages/login";
import Home from "./src/pages/home";

import HomeProfissional from "./src/pages/homeProfissional";
import DetalhesAluno from "./src/pages/detalhesAluno";
import CadastrarAluno from "./src/pages/cadastrarAluno";
import EditarAluno from "./src/pages/editarAluno";

import PrimeiroAcesso from "./src/pages/primeiroAcesso";

import Checkin from "./src/pages/checkin";
import checkinPersonal from "./src/pages/checkinPersonal";
import checkinsemPersonal from "./src/pages/checkinsemPersonal";

import Corpo from "./src/pages/corpo";
import Historico from "./src/pages/historicoPeso";
import Pagamento from "./src/pages/pagamento";

import {
  supabase,
} from "./src/lib/supabase";

export type RootStackParamList = {
  Login: undefined;

  Home: undefined;

  HomeProfissional: undefined;

  PrimeiroAcesso: undefined;

  DetalhesAluno: {
    alunoId: string;
  };

  EditarAluno: {
    alunoId: string;
  };

  CadastrarAluno: undefined;

  Checkin: undefined;
  checkinPersonal: undefined;
  checkinsemPersonal: undefined;

  Corpo: undefined;
  Historico: undefined;
  Pagamento: undefined;
};

const Stack =
  createNativeStackNavigator<
    RootStackParamList
  >();

type TipoUsuario =
  | "aluno"
  | "profissional"
  | null;

export default function App() {
  const [
    session,
    setSession,
  ] =
    useState<Session | null>(
      null
    );

  const [
    tipoUsuario,
    setTipoUsuario,
  ] =
    useState<TipoUsuario>(
      null
    );

  const [
    precisaTrocarSenha,
    setPrecisaTrocarSenha,
  ] =
    useState(false);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  // ==========================================
  // CARREGA O PERFIL DO USUÁRIO
  // ==========================================

  async function carregarPerfilUsuario(
    userId: string
  ) {
    try {
      const {
        data,
        error,
      } =
        await supabase
          .from("profiles")
          .select(
            "tipo, precisa_trocar_senha"
          )
          .eq(
            "id",
            userId
          )
          .single();

      if (error) {
        console.log(
          "Erro ao buscar perfil do usuário:",
          error
        );

        await supabase.auth.signOut();

        setSession(null);
        setTipoUsuario(null);
        setPrecisaTrocarSenha(false);

        return;
      }

      console.log(
        "Perfil carregado:",
        data
      );

      setTipoUsuario(
        data.tipo as TipoUsuario
      );

      setPrecisaTrocarSenha(
        data.precisa_trocar_senha ===
          true
      );
    } catch (error) {
      console.log(
        "Erro inesperado ao carregar perfil:",
        error
      );

      await supabase.auth.signOut();

      setSession(null);
      setTipoUsuario(null);
      setPrecisaTrocarSenha(false);
    }
  }

  // ==========================================
  // CARREGA A SESSÃO INICIAL
  // ==========================================

  useEffect(() => {
    let ativo = true;

    async function carregarSessao() {
      try {
        setLoading(true);

        const {
          data: {
            session:
              sessaoAtual,
          },
          error,
        } =
          await supabase.auth.getSession();

        if (!ativo) {
          return;
        }

        if (error) {
          console.log(
            "Erro ao carregar sessão:",
            error
          );

          setSession(null);
          setTipoUsuario(null);
          setPrecisaTrocarSenha(false);

          return;
        }

        setSession(
          sessaoAtual
        );

        if (
          sessaoAtual?.user
        ) {
          await carregarPerfilUsuario(
            sessaoAtual.user.id
          );
        } else {
          setTipoUsuario(
            null
          );

          setPrecisaTrocarSenha(
            false
          );
        }
      } catch (error) {
        console.log(
          "Erro inesperado ao carregar sessão:",
          error
        );

        if (ativo) {
          setSession(null);
          setTipoUsuario(null);
          setPrecisaTrocarSenha(false);
        }
      } finally {
        if (ativo) {
          setLoading(
            false
          );
        }
      }
    }

    carregarSessao();

    // ==========================================
    // ESCUTA LOGIN / LOGOUT / REFRESH
    // ==========================================

    const {
      data: {
        subscription,
      },
    } =
      supabase.auth.onAuthStateChange(
        async (
          event,
          novaSession
        ) => {
          console.log(
            "Evento Auth:",
            event
          );

          if (!ativo) {
            return;
          }

          setSession(
            novaSession
          );

          if (
            novaSession?.user
          ) {
            setLoading(
              true
            );

            await carregarPerfilUsuario(
              novaSession.user.id
            );

            if (ativo) {
              setLoading(
                false
              );
            }
          } else {
            setTipoUsuario(
              null
            );

            setPrecisaTrocarSenha(
              false
            );

            setLoading(
              false
            );
          }
        }
      );

    return () => {
      ativo = false;

      subscription.unsubscribe();
    };
  }, []);

  // ==========================================
  // LOADING GLOBAL
  // ==========================================

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent:
            "center",
          alignItems:
            "center",
          backgroundColor:
            "#F5F5F5",
        }}
      >
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  // ==========================================
  // PROTEÇÃO CONTRA NAVIGATOR SEM TELAS
  // ==========================================

  const perfilCarregado =
    !session ||
    tipoUsuario !== null;

  if (!perfilCarregado) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent:
            "center",
          alignItems:
            "center",
          backgroundColor:
            "#F5F5F5",
        }}
      >
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  // ==========================================
  // NAVEGAÇÃO
  // ==========================================

  return (
    <NavigationContainer>
      <StatusBar
        style="auto"
      />

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* ================================= */}
        {/* NÃO AUTENTICADO */}
        {/* ================================= */}

        {!session && (
          <Stack.Screen
            name="Login"
            component={
              Login
            }
          />
        )}

        {/* ================================= */}
        {/* ALUNO - PRIMEIRO ACESSO */}
        {/* ================================= */}

        {session &&
          tipoUsuario ===
            "aluno" &&
          precisaTrocarSenha && (
            <Stack.Screen
              name="PrimeiroAcesso"
              component={
                PrimeiroAcesso
              }
            />
          )}

        {/* ================================= */}
        {/* ALUNO - ACESSO NORMAL */}
        {/* ================================= */}

        {session &&
          tipoUsuario ===
            "aluno" &&
          !precisaTrocarSenha && (
            <>
              <Stack.Screen
                name="Home"
                component={
                  Home
                }
              />

              <Stack.Screen
                name="Checkin"
                component={
                  Checkin
                }
              />

              <Stack.Screen
                name="checkinPersonal"
                component={
                  checkinPersonal
                }
              />

              <Stack.Screen
                name="checkinsemPersonal"
                component={
                  checkinsemPersonal
                }
              />

              <Stack.Screen
                name="Corpo"
                component={
                  Corpo
                }
              />

              <Stack.Screen
                name="Historico"
                component={
                  Historico
                }
              />

              <Stack.Screen
                name="Pagamento"
                component={
                  Pagamento
                }
              />
            </>
          )}

        {/* ================================= */}
        {/* PROFISSIONAL */}
        {/* ================================= */}

        {session &&
          tipoUsuario ===
            "profissional" && (
            <>
              <Stack.Screen
                name="HomeProfissional"
                component={
                  HomeProfissional
                }
              />

              <Stack.Screen
                name="CadastrarAluno"
                component={
                  CadastrarAluno
                }
              />

              <Stack.Screen
                name="DetalhesAluno"
                component={
                  DetalhesAluno
                }
              />

              <Stack.Screen
                name="EditarAluno"
                component={
                  EditarAluno
                }
              />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}