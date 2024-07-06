import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import Scan from "../components/Scan";
import InfoMessage from "../components/InfoMessage";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="dark" />

      <View className="flex-1 p-4">
        {/* title */}
        <Text className="text-2xl font-black  mt-5 pt-6">Authentification</Text>

        {/* messagage info  */}
        <InfoMessage />

        {/* scan */}
        <Scan />
      </View>
    </SafeAreaView>
  );
}