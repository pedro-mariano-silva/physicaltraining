import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  style,
} from "./styles";

export default function Splash() {
  return (
    <View style={style.container}>
      <View style={style.glowTop} />

      <View style={style.content}>
        <View style={style.logoCircle}>
          <Text style={style.logoLetter}>
            P
          </Text>

          <Text style={style.logoCheck}>
            ✓
          </Text>
        </View>

        <View style={style.nameContainer}>
          <Text style={style.namePonto}>
            Ponto
          </Text>

          <Text style={style.nameFit}>
            Fit
          </Text>
        </View>

        <View style={style.taglineContainer}>
          <View style={style.taglineLine} />

          <Text style={style.tagline}>
            Seu treino, sua presença.
          </Text>

          <View style={style.taglineLine} />
        </View>
      </View>

      <View style={style.wave1} />
      <View style={style.wave2} />
    </View>
  );
}