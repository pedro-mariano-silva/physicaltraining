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
    marginBottom: 24,
  },

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

  sectionTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#222",
    marginBottom: 14,
    marginTop: 8,
  },

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
  },

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

  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    elevation: 2,
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
  },

  historyTime: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
  },

  emptyText: {
    fontSize: 14,
    color: "#777",
  },
});