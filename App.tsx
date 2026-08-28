import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";

import Login from "./src/pages/login";
import Home from "./src/pages/home";
import HomeProfissional from "./src/pages/homeProfissional";
import DetalhesAluno from "./src/pages/detalhesAluno";

import Checkin from "./src/pages/checkin";
import checkinPersonal from "./src/pages/checkinPersonal";
import checkinsemPersonal from "./src/pages/checkinsemPersonal";

import Corpo from "./src/pages/corpo";
import Historico from "./src/pages/historicoPeso";
import Pagamento from "./src/pages/pagamento";

import CadastrarAluno from "./src/pages/cadastrarAluno";

import { supabase } from "./src/lib/supabase";

export type RootStackParamList = {
  Login: undefined;

  Home: undefined;

  HomeProfissional: undefined;

  DetalhesAluno: {
    alunoId: string;
  };

  Checkin: undefined;
  checkinPersonal: undefined;
  checkinsemPersonal: undefined;

  Corpo: undefined;
  Historico: undefined;
  Pagamento: undefined;

  CadastrarAluno: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type TipoUsuario = "aluno" | "profissional" | null;

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [tipoUsuario, setTipoUsuario] =
    useState<TipoUsuario>(null);

  const [loading, setLoading] = useState(true);

  async function carregarTipoUsuario(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("tipo")
      .eq("id", userId)
      .single();

if (error) {
  console.log("Erro ao buscar tipo do usuário:", error);

  await supabase.auth.signOut();

  setTipoUsuario(null);
  setSession(null);

  return;
}

    setTipoUsuario(data.tipo as TipoUsuario);
  }

  useEffect(() => {
    async function carregarSessao() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session?.user) {
        await carregarTipoUsuario(
          session.user.id
        );
      }

      setLoading(false);
    }

    carregarSessao();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);

        if (session?.user) {
          setLoading(true);

          await carregarTipoUsuario(
            session.user.id
          );

          setLoading(false);
        } else {
          setTipoUsuario(null);
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Usuário não autenticado */}
        {!session && (
          <Stack.Screen
            name="Login"
            component={Login}
          />
        )}

        {/* Rotas do aluno */}
        {session &&
          tipoUsuario === "aluno" && (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
              />

              <Stack.Screen
                name="Checkin"
                component={Checkin}
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
                component={Corpo}
              />

              <Stack.Screen
                name="Historico"
                component={Historico}
              />

              <Stack.Screen
                name="Pagamento"
                component={Pagamento}
              />
            </>
          )}

        {/* Rotas do profissional */}
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
  component={CadastrarAluno}
/>

              <Stack.Screen
                name="DetalhesAluno"
                component={
                  DetalhesAluno
                }
              />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}