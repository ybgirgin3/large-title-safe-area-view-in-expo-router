import LargeTitleSafeArea from "@/components/large-header-scroll-view";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <LargeTitleSafeArea
      title="Home"
      subtitle="Homeee"
      headerStyle={{ backgroundColor: "#ffffff56" }}
      titleStyle={{ color: "black" }}
      titleStyleDark={{ color: "white" }}
      // subtitleStyle={{color: "black"}}
      headerRight={
        <Pressable
          onPress={() => {
            console.log("press gear");
          }}
        >
          <IconSymbol name="person.crop.circle" color="red" size={32} />
        </Pressable>
      }
    >
      <View style={{ width: "100%", height: 300, backgroundColor: "purple" }}>
        <Text>HomeScreeennnnn</Text>
      </View>
      <View style={{ width: "100%", height: 300, backgroundColor: "gray" }}>
        <Text>HomeScreeennnnn</Text>
      </View>
      <View style={{ width: "100%", height: 300, backgroundColor: "brown" }}>
        <Text>HomeScreeennnnn</Text>
      </View>
      <View style={{ width: "100%", height: 300, backgroundColor: "yellow" }}>
        <Text>HomeScreeennnnn</Text>
      </View>
      <View style={{ width: "100%", height: 300, backgroundColor: "yellow" }}>
        <Text>HomeScreeennnnn</Text>
      </View>
      <View style={{ width: "100%", height: 300, backgroundColor: "yellow" }}>
        <Text>HomeScreeennnnn</Text>
      </View>
    </LargeTitleSafeArea>
  );
}
