import LargeTitleSafeArea from "@/components/large-header-scroll-view";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import { BigStationCardListMock } from "@/constants/mockdata";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

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
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <BigStationCardList data={BigStationCardListMock} />
      </View>
    </LargeTitleSafeArea>
  );
}

// components
const BigStationCardList = ({ data }: { data: any }) => {
  const BigStationCardRenderItem = ({ item }: { item: any }) => {
    console.log(item);

    return (
      <View
        style={{
          width: 300,
          height: 400,
          // backgroundColor: "purple",
          // borderRadius: radius,
          marginRight: 15,
        }}
      >
        {/* image background */}
        <View
          style={{
            width: "100%",
            height: "80%",
            backgroundColor: item.imageBackground,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        ></View>

        {/* title */}
        <View
          style={{
            width: "100%",
            height: "20%",
            backgroundColor: item.titleBackground,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,

            // child
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            numberOfLines={2}
            style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
          >
            {item.title}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      style={{ paddingLeft: 15 }}
      showsHorizontalScrollIndicator={false}
      renderItem={BigStationCardRenderItem}
      horizontal={true}
    />
  );
};

