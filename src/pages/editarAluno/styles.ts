import {
  StyleSheet,
} from "react-native";

export const style =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#F5F5F5",
    },

    contentContainer: {
      paddingHorizontal: 20,
      paddingTop: 55,
      paddingBottom: 50,
    },

    loadingContainer: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
      backgroundColor:
        "#F5F5F5",
    },

    loadingText: {
      marginTop: 10,
      fontSize: 15,
      color: "#666",
    },

    backButton: {
      alignSelf:
        "flex-start",
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
      lineHeight: 20,
    },

    formCard: {
      backgroundColor:
        "#FFFFFF",
      borderRadius: 14,
      padding: 20,

      shadowColor: "#000",

      shadowOffset: {
        width: 0,
        height: 2,
      },

      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },

    label: {
      fontSize: 14,
      fontWeight: "600",
      color: "#444",
      marginBottom: 8,
    },

    labelSpacing: {
      fontSize: 14,
      fontWeight: "600",
      color: "#444",
      marginBottom: 8,
      marginTop: 18,
    },

    input: {
      minHeight: 50,
      borderWidth: 1,
      borderColor:
        "#DADADA",
      borderRadius: 10,
      paddingHorizontal: 14,
      fontSize: 16,
      color: "#222",
      backgroundColor:
        "#FFFFFF",
    },

    // ==========================================
    // CAMPOS DE SENHA COM OLHO
    // ==========================================

    passwordInputContainer: {
      minHeight: 50,
      borderWidth: 1,
      borderColor:
        "#DADADA",
      borderRadius: 10,
      backgroundColor:
        "#FFFFFF",
      flexDirection:
        "row",
      alignItems:
        "center",
    },

    passwordInput: {
      flex: 1,
      minHeight: 50,
      paddingLeft: 14,
      paddingRight: 5,
      fontSize: 16,
      color: "#222",
    },

    eyeButton: {
      width: 48,
      height: 50,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    helperText: {
      marginTop: 7,
      fontSize: 12,
      color: "#777",
      lineHeight: 17,
    },

    separator: {
      height: 1,
      backgroundColor:
        "#E8E8E8",
      marginTop: 28,
      marginBottom: 24,
    },

    passwordTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#222",
    },

    passwordDescription: {
      marginTop: 7,
      fontSize: 13,
      color: "#666",
      lineHeight: 19,
    },

    saveButton: {
      minHeight: 50,
      marginTop: 28,
      borderRadius: 12,
      backgroundColor:
        "#248A3D",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    saveButtonDisabled: {
      opacity: 0.6,
    },

    saveButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
      textAlign:
        "center",
    },
  });