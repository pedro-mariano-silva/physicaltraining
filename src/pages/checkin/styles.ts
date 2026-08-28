import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  // ========================================
  // TELA
  // ========================================

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // ========================================
  // TOPO
  // ========================================

  topo: {
    top: -150,
    width: 395,
    height: 365,
  },

  text: {
    padding: 20,
    fontSize: 40,
    top: -299,
    color: "white",
    fontFamily: "Baloo-Bhaina",
    fontWeight: "bold",
    left: 60,
  },

  // ========================================
  // TÍTULO
  // ========================================

  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    top: -185,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 25,
    textAlign: "center",
  },

  // ========================================
  // TIPOS DE TREINO
  // ========================================

  containerTreinos: {
    width: "100%",
    paddingHorizontal: 20,

    flexDirection: "row",
    flexWrap: "wrap",

    justifyContent: "space-between",

    top: -165,
  },

  botaoTreino: {
    width: "48%",
    height: 48,

    marginBottom: 12,

    borderWidth: 2,
    borderColor: "#4DA953",

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FFFFFF",
  },

  botaoTreinoSelecionado: {
    backgroundColor: "#4DA953",
  },

  textoTreino: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4DA953",
    textAlign: "center",
  },

  textoTreinoSelecionado: {
    color: "#FFFFFF",
  },

  // ========================================
  // MODAL - FUNDO
  // ========================================

  modalOverlay: {
    flex: 1,

    backgroundColor: "rgba(0, 0, 0, 0.55)",

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 25,
  },

  // ========================================
  // MODAL - CONTAINER
  // ========================================

  modalContainer: {
    width: "100%",
    maxWidth: 360,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    paddingHorizontal: 24,
    paddingVertical: 28,

    alignItems: "center",

    elevation: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  // ========================================
  // NOME DO TREINO NO MODAL
  // ========================================

  modalTreino: {
    fontSize: 22,
    fontWeight: "700",

    color: "#4DA953",

    textAlign: "center",

    marginBottom: 10,
  },

  // ========================================
  // PERGUNTA DO MODAL
  // ========================================

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",

    color: "#222",

    textAlign: "center",

    marginBottom: 25,
  },

  // ========================================
  // BOTÕES DO MODAL
  // ========================================

  modalButton: {
    width: "100%",
    height: 50,

    backgroundColor: "#4DA953",

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 12,
  },

  modalButtonText: {
    color: "#FFFFFF",

    fontSize: 16,
    fontWeight: "700",

    textAlign: "center",
  },

  // ========================================
  // CANCELAR
  // ========================================

  modalCancelButton: {
  width: "100%",
  height: 45,

  justifyContent: "center",
  alignItems: "center",

  marginTop: 3,

  borderWidth: 2,
  borderColor: "#4DA953",
  borderRadius: 12,

  backgroundColor: "#FFFFFF",
},

modalCancelText: {
  color: "#000000",

  fontSize: 14,
  fontWeight: "700",
},
});