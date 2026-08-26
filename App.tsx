import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./src/pages/login";
import Home from "./src/pages/home";
import Checkin from "./src/pages/checkin"; // 👉 ajuste o caminho correto
import checkinPersonal from "./src/pages/checkinPersonal";
import checkinsemPersonal from "./src/pages/checkinsemPersonal";
import Corpo from "./src/pages/corpo";
import Historico from "./src/pages/historicoPeso";
import Pagamento from "./src/pages/pagamento";

// Tipagem das rotas do app
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Checkin: undefined;
  checkinPersonal: undefined;
  checkinsemPersonal: undefined;
  Corpo: undefined;
  Historico: undefined;
  Pagamento: undefined;
};

// Criação da stack tipada
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Checkin" component={Checkin} />
        <Stack.Screen name="checkinPersonal" component={checkinPersonal} />
        <Stack.Screen name="checkinsemPersonal" component={checkinsemPersonal} />
        <Stack.Screen name="Corpo" component={Corpo} />
         <Stack.Screen name="Historico" component={Historico} />
        <Stack.Screen name="Pagamento" component={Pagamento} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
