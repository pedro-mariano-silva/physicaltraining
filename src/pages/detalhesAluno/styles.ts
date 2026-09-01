import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 50,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: "#666",
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
    marginBottom: 20,
  },

  // ==========================================
  // EDITAR ALUNO
  // ==========================================

  editButton: {
    height: 46,
    borderRadius: 12,
    backgroundColor: "#248A3D",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,

    elevation: 2,
  },

  editButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },

  // ==========================================
  // CHECK-IN PELO PROFISSIONAL
  // ==========================================

  checkinButton: {
    minHeight: 46,
    borderRadius: 12,

    backgroundColor: "#FFFFFF",

    borderWidth: 2,
    borderColor: "#248A3D",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 24,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    elevation: 1,
  },

  checkinButtonText: {
    color: "#248A3D",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },

  // ==========================================
  // RESUMO
  // ==========================================

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    marginBottom: 28,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },

  summaryNumber: {
    fontSize: 34,
    fontWeight: "700",
    color: "#222",
    marginTop: 4,
  },

  // ==========================================
  // SEÇÕES
  // ==========================================

  sectionTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#222",
    marginBottom: 14,
    marginTop: 8,
  },

  // ==========================================
  // STATUS PRESENTE
  // ==========================================

  presentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 28,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,

    elevation: 2,
  },

  presentTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#248A3D",
  },

  presentDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    lineHeight: 20,
  },

  origemCheckin: {
    marginTop: 7,
    fontSize: 12,
    fontWeight: "600",
    fontStyle: "italic",
    color: "#777",
  },

  // ==========================================
  // STATUS AUSENTE
  // ==========================================

  absentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 28,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,

    elevation: 2,
  },

  absentTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#777",
  },

  // ==========================================
  // HISTÓRICO
  // ==========================================

  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    elevation: 2,
  },

  historyContent: {
    flex: 1,
    paddingRight: 12,
  },

  historyDate: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  historyType: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    lineHeight: 20,
  },

  historyTime: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
  },

  // ==========================================
  // REPOSIÇÃO
  // ==========================================

  reposicaoStatus: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#D97706",
  },

  reporButton: {
    marginTop: 12,
    minHeight: 40,
    paddingHorizontal: 14,

    borderWidth: 2,
    borderColor: "#D97706",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FFFFFF",
  },

  reporButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#D97706",
    textAlign: "center",
  },

  realizadaButton: {
    marginTop: 12,
    minHeight: 40,
    paddingHorizontal: 14,

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#248A3D",
  },

  realizadaButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },

  // ==========================================
  // LISTA VAZIA
  // ==========================================

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
  },

  emptyText: {
    fontSize: 14,
    color: "#777",
  },

  // ==========================================
  // MODAL
  // ==========================================

  modalOverlay: {
    flex: 1,

    backgroundColor: "rgba(0, 0, 0, 0.5)",

    justifyContent: "center",

    paddingHorizontal: 20,
  },

  modalCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    paddingHorizontal: 20,
    paddingVertical: 22,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,

    elevation: 8,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
  },

  modalAluno: {
    fontSize: 16,
    fontWeight: "700",
    color: "#248A3D",

    textAlign: "center",

    marginTop: 6,
  },

  modalSubtitle: {
    fontSize: 14,
    color: "#666",

    textAlign: "center",

    lineHeight: 20,

    marginTop: 8,
    marginBottom: 18,
  },

  // ==========================================
  // BOTÕES DE TIPO DE TREINO
  // ==========================================

  treinoButton: {
    minHeight: 45,

    borderWidth: 1,
    borderColor: "#DADADA",

    borderRadius: 10,

    paddingHorizontal: 14,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    marginBottom: 8,
  },

  treinoButtonSelected: {
    backgroundColor: "#248A3D",
    borderColor: "#248A3D",
  },

  treinoButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  treinoButtonTextSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // ==========================================
  // PERGUNTA COM / SEM PERSONAL
  // ==========================================

  modalQuestion: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",

    textAlign: "center",

    marginTop: 14,
    marginBottom: 10,
  },

  // ==========================================
  // COM PERSONAL
  // ==========================================

  personalButton: {
    minHeight: 46,

    borderRadius: 10,

    backgroundColor: "#248A3D",

    justifyContent: "center",
    alignItems: "center",
  },

  personalButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },

  // ==========================================
  // SEM PERSONAL
  // ==========================================

  semPersonalButton: {
    minHeight: 46,

    borderRadius: 10,

    backgroundColor: "#ECECEC",

    justifyContent: "center",
    alignItems: "center",

    marginTop: 10,
  },

  semPersonalButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },

  // ==========================================
  // BOTÃO DESABILITADO
  // ==========================================

  modalButtonDisabled: {
    opacity: 0.45,
  },

  // ==========================================
  // CANCELAR
  // ==========================================

  cancelButton: {
    minHeight: 42,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 8,
  },

  cancelButtonText: {
    color: "#777",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
});