import {
  StyleSheet,
  Dimensions,
} from "react-native";

const {
  width,
  height,
} = Dimensions.get("window");

export const style =
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor:
        "#6C63FF",

      justifyContent:
        "center",

      alignItems:
        "center",

      overflow:
        "hidden",
    },

    content: {
      alignItems:
        "center",

      justifyContent:
        "center",

      zIndex: 10,

      marginTop: -30,
    },

    // ==========================================
    // BRILHO SUPERIOR
    // ==========================================

    glowTop: {
      position:
        "absolute",

      width:
        width * 1.1,

      height:
        width * 1.1,

      borderRadius:
        width,

      backgroundColor:
        "#8E61FF",

      top:
        -width * 0.65,

      left:
        -width * 0.35,

      opacity:
        0.55,
    },

    // ==========================================
    // LOGO
    // ==========================================

    logoCircle: {
      width: 155,
      height: 155,

      borderRadius: 45,

      borderWidth: 10,
      borderColor: "#FFFFFF",

      justifyContent:
        "center",

      alignItems:
        "center",

      marginBottom: 25,

    },

    logoLetter: {
      color:
        "#FFFFFF",

      fontSize: 105,

      fontWeight:
        "700",

      lineHeight: 120,

      position:
        "absolute",

      left: 26,

      top: 7,
    },

    logoCheck: {
      color:
        "#FFFFFF",

      fontSize: 55,

      fontWeight:
        "700",

      position:
        "absolute",

      left: 52,

      top: 47,
    },

    // ==========================================
    // NOME
    // ==========================================

    nameContainer: {
      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "center",
    },

    namePonto: {
      color:
        "#FFFFFF",

      fontSize: 48,

      fontWeight:
        "700",
    },

    nameFit: {
      color:
        "#00C2FF",

      fontSize: 48,

      fontWeight:
        "700",
    },

    // ==========================================
    // TAGLINE
    // ==========================================

    taglineContainer: {
      flexDirection:
        "row",

      alignItems:
        "center",

      marginTop:
        14,
    },

    tagline: {
      color:
        "#FFFFFF",

      fontSize: 16,

      fontWeight:
        "500",

      marginHorizontal:
        10,
    },

    taglineLine: {
      width: 28,
      height: 2,

      backgroundColor:
        "#00C2FF",

      borderRadius: 10,
    },

    // ==========================================
    // ONDAS INFERIORES
    // ==========================================

    wave1: {
      position:
        "absolute",

      width:
        width * 1.8,

      height:
        height * 0.45,

      borderRadius:
        width,

      backgroundColor:
        "#4A90E2",

      bottom:
        -height * 0.25,

      left:
        -width * 0.35,

      transform: [
        {
          rotate:
            "-12deg",
        },
      ],

      opacity:
        0.65,
    },

    wave2: {
      position:
        "absolute",

      width:
        width * 1.5,

      height:
        height * 0.35,

      borderRadius:
        width,

      backgroundColor:
        "#00C2FF",

      bottom:
        -height * 0.24,

      right:
        -width * 0.55,

      transform: [
        {
          rotate:
            "15deg",
        },
      ],

      opacity:
        0.75,
    },
  });