import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
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

  header: {
    marginBottom: 25,
  },

  welcomeText: {
    fontSize: 17,
    color: "#666",
  },

  professionalName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginTop: 2,
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 7,
  },

  summaryContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  summaryNumber: {
    fontSize: 30,
    fontWeight: "700",
    color: "#222",
  },

  summaryLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#222",
    marginBottom: 14,
    marginTop: 10,
  },

  checkinCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,

    elevation: 2,
  },

  checkinHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 19,
    fontWeight: "700",
    color: "#444",
  },

  checkinInfo: {
    flex: 1,
    marginLeft: 12,
  },

  studentName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },

  checkinType: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },

  timeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
  },

  timeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },

  studentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,

    elevation: 2,
  },

  studentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  studentInfo: {
    flex: 1,
    marginLeft: 12,
  },

  presentText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#248A3D",
    marginTop: 5,
  },

  absentText: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },

  studentDetails: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  emptyText: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },

  updateButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#4DA953",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  logoutButton: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CCC",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  logoutButtonText: {
    color: "#555",
    fontSize: 15,
    fontWeight: "700",
  },

addStudentButton: {
  height: 52,
  backgroundColor: "#222",
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
  marginBottom: 25,
},

addStudentButtonText: {
  color: "#FFFFFF",
  fontSize: 15,
  fontWeight: "700",
},
});