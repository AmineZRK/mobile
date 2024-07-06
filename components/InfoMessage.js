import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function InfoMessage() {
  return (
    <View className="bg-yellow-50 p-6 mt-8 rounded-3xl">
      <View className="flex flex-row justify-start items-center gap-1">
        {/* icon */}
        <View className="justify-center items-center bg-yellow-200  rounded-full w-12 h-12 ">
          <FontAwesome6 name="nfc-symbol" size={25} color="#ca8a04" />
        </View>
        <Text className="text-lg font-bold ">NFC</Text>
      </View>
      <Text className="text-yellow-700  mt-2 px-4 py-2">
        Cette fonctionnalité vous permettra de communiquer avec un appareil NFC
        et permet d'authentifier facilement et en toute sécurité. Pour
        l'essayer, vous aurez besoin d'un appareil compatible NFC.
      </Text>
    </View>
  );
}