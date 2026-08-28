import {
  StyleSheet,
} from "react-native";

export const style =
  StyleSheet.create({
    keyboardContainer: {
      flex: 1,
      backgroundColor:
        "#F5F5F5",
    },

    container: {
      flex: 1,
      backgroundColor:
        "#F5F5F5",
    },

    contentContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 70,
      paddingBottom: 40,
      justifyContent:
        "center",
    },

    header: {
      marginBottom: 24,
    },

    title: {
      fontSize: 30,
      fontWeight: "700",
      color: "#222",
    },

    subtitle: {
      fontSize: 15,
      color: "#777",
      marginTop: 8,
      lineHeight: 21,
    },

    card: {
      backgroundColor:
        "#FFFFFF",
      borderRadius: 16,
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

    infoBox: {
      backgroundColor:
        "#F1F8F3",
      borderRadius: 12,
      padding: 14,
      marginBottom: 22,
    },

    infoTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: "#248A3D",
    },

    infoText: {
      fontSize: 13,
      color: "#555",
      lineHeight: 19,
      marginTop: 5,
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
      marginTop: 20,
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

    helperText: {
      fontSize: 12,
      color: "#777",
      marginTop: 7,
      lineHeight: 17,
    },

    button: {
      minHeight: 52,
      marginTop: 28,
      borderRadius: 12,
      backgroundColor:
        "#248A3D",
      justifyContent:
        "center",
      alignItems: "center",
    },

    buttonDisabled: {
      opacity: 0.6,
    },

    buttonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
      textAlign: "center",
    },
  });