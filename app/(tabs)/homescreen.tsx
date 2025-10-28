import LargeTitleSafeArea from "@/components/large-header-scroll-view";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import { BigStationCardListMock, LastPlayedMock } from "@/constants/mockdata";
import React from "react";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <LargeTitleSafeArea
      title="Home"
      headerStyle={{ backgroundColor: "#ffffff56" }}
      titleStyle={{ color: "black" }}
      titleStyleDark={{ color: "white" }}
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
      {/* full screen */}
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          // backgroundColor: "green",
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <BigStationCardList data={BigStationCardListMock} />
        <LastPlayed data={LastPlayedMock} />
        <MetalRecommended data={LastPlayedMock} />
      </View>
    </LargeTitleSafeArea>
  );
}

// components
const BigStationCardList = ({ data }: { data: any }) => {
  const colorscheme = useColorScheme();
  const textcolor = colorscheme === "dark" ? "white" : "black";

  const BigStationCardRenderItem = ({ item }: { item: any }) => {
    return (
      <View>
        {/* subtitle */}
        <View style={{ paddingBottom: 5 }}>
          <Text style={{ opacity: 0.6, fontSize: 14, color: textcolor }}>
            {item.subtitle}
          </Text>
        </View>
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
      </View>
    );
  };

  return (
    <>
      <View style={{ width: "90%", paddingLeft: 15, marginBottom: 5 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: textcolor }}>
          Special Songs For You
        </Text>
      </View>
      <FlatList
        data={data}
        style={{ paddingLeft: 15 }}
        showsHorizontalScrollIndicator={false}
        renderItem={BigStationCardRenderItem}
        horizontal={true}
      />
    </>
  );
};

// Last Played
const LastPlayed = ({ data }: { data: any }) => {
  const colorscheme = useColorScheme();
  const textColor = colorscheme === "dark" ? "white" : "black";

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View
        style={{
          width: 150,
          height: 150,
          borderRadius: 10,
          marginTop: 20,
          margin: 10,
          // backgroundColor: item.imageBackground,
        }}
      >
        {/* image background */}
        <View
          style={{
            backgroundColor: item.imageBackground,
            width: "100%",
            height: "80%",
            borderRadius: 10,
          }}
        ></View>
        <View
          style={{ width: "100%", height: "20%", justifyContent: "center" }}
        >
          <Text style={{ fontWeight: "600", color: textColor }}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <View
        style={{
          width: "100%",
          marginTop: 10,
          height: 50,
          // backgroundColor: "purple",
          justifyContent: "center",
          paddingHorizontal: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: textColor }}>
            Last Played
          </Text>
          <TouchableOpacity
            onPress={() => {}}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={{ marginLeft: 5 }}
          >
            <IconSymbol name="chevron.right" color={textColor} size={15} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        style={{ paddingLeft: 5 }}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        horizontal={true}
      />
    </>
  );
};

// Metal (personal recommended)

const MetalRecommended = ({ data }: { data: any }) => {
  const colorscheme = useColorScheme();
  const textColor = colorscheme === "dark" ? "white" : "black";

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View
        style={{
          width: 150,
          height: 150,
          borderRadius: 10,
          marginTop: 20,
          margin: 10,
          // backgroundColor: item.imageBackground,
        }}
      >
        {/* image background */}
        <View
          style={{
            backgroundColor: item.imageBackground,
            width: "100%",
            height: "80%",
            borderRadius: 10,
          }}
        ></View>
        <View
          style={{ width: "100%", height: "20%", justifyContent: "center" }}
        >
          <Text style={{ fontWeight: "600", color: textColor }}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <View
        style={{
          width: "100%",
          marginTop: 10,
          height: 50,
          // backgroundColor: "purple",
          justifyContent: "center",
          paddingHorizontal: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: textColor }}>
            Last Played
          </Text>
          <TouchableOpacity
            onPress={() => {}}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={{ marginLeft: 5 }}
          >
            <IconSymbol name="chevron.right" color={textColor} size={15} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        style={{ paddingLeft: 5 }}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        horizontal={true}
      />
    </>
  );
};