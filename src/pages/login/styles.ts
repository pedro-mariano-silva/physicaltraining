import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },

  // TOPO - Logo + título
  boxTop: {
    height: Dimensions.get("window").height / 5.5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 350,
    height: 110,
    resizeMode: "contain",
  },

  text: {
    
    marginTop: 20,
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },

  // ÁREA DOS INPUTS
  boxMid: {
    width: "90%",
    marginTop: 70,
  },

  titleInput: {

    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 6,
    marginLeft: 5,
    top: -10
  },

  boxInput: {
    top: -10,
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    borderColor: "#68E58B",
    marginBottom: 20,
  },

  // BOTÃO
  boxButton: {
    width: "100%",
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    top: -60,
    width: 220,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    backgroundColor: "#68E58B",

    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 8,
  },

  buttonLogar: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
