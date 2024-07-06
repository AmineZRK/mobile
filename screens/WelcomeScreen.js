import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import welcomeImage from "../assets/welcome-min.jpg";
import { LinearGradient } from "expo-linear-gradient";

import { useNavigation } from "@react-navigation/native";
import { hp } from "../helpers/common";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1">
      <StatusBar style="dark" />

      <Image
        className="w-screen h-screen"
        source={welcomeImage}
        resizeMode="cover"
      />

      {/* linear gradient */}
      <View>
        <LinearGradient
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: hp(50),
          }}
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* content */}
        <View className=" flex justify-center items-center absolute bottom-0 w-full p-4 pb-10">
          <Text className="text-5xl font-extrabold text-gray-800">ScanTag</Text>

          <Text className="text-xl italic text-gray-800">
            #1 application d'authentification NFC
          </Text>

          <View className="w-full">
            <Pressable
              className="w-full bg-cyan-500 p-6 mt-8 mb-4 rounded-full"
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text className="text-center text-white text-2xl font-bold">
                Commencer
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}