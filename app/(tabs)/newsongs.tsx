import LargeTitleSafeArea from "@/components/large-header-scroll-view";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import { NewSongsFlatListMock } from "@/constants/mockdata";
import { Colors } from "@/constants/theme";
import React from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  Text,
  useColorScheme,
  View
} from "react-native";

const newsongs = () => {
  const colorscheme = useColorScheme();
  const textColor = Colors[colorscheme ?? "light"].text;
  return (
    <LargeTitleSafeArea
      title="New"
      headerStyle={{
        //  backgroundColor: "#ffffff56"
        backgroundColor: Colors[colorscheme ?? "light"].headerBackgroundColor,
      }}
      titleStyle={{ color: Colors[colorscheme ?? "light"].text }}
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
          // paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <NewSongsFlatList data={NewSongsFlatListMock} />
      </View>
    </LargeTitleSafeArea>
  );
};

export default newsongs;

// components

const NewSongsFlatList = ({ data }: { data: any }) => {
  const colorscheme = useColorScheme();
  const textcolor = Colors[colorscheme ?? "light"].text;
  const ITEM_WIDTH = 370
  const SPACING = 20
  const SNAPPING = ITEM_WIDTH + SPACING

  const renderItem = ({ item }: { item: any }) => {
    return (
      <>
        {/* container */}
        <View
          style={{
            width: ITEM_WIDTH,
            height: 200,
            // backgroundColor: "wheat",
            borderRadius: 20,
            marginRight: SPACING,
          }}
        >
          {/* item headers */}
          <View style={{ width: "100%", height: 80 }}>
            <Text style={{ color: textcolor, opacity: 0.6 }}>
              {item.listType}
            </Text>
            <Text style={{ color: textcolor, fontSize: 18 }}>
              {item.listName}
            </Text>
            <Text style={{ color: textcolor, fontSize: 20, opacity: 0.6 }}>
              {item.listOwner}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: "70%",
              backgroundColor: item.imageBackground,
              // backgroundColor: "lightblue",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            {/* <Text>IM</Text> */}
          </View>
          <View
            style={{
              width: "100%",
              height: "30%",
              backgroundColor: item.imageBackground,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 10,
            }}
          >
            <Text style={{ color: item.titleColor }}>{item.title}</Text>
          </View>
        </View>
      </>
    );
  };
  return (
    <>
      <FlatList
        data={data}
        snapToInterval={SNAPPING} // her kartın genişliği kadar snap
        decelerationRate="fast"
        disableIntervalMomentum={true}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingHorizontal: (Dimensions.get("screen").width - SNAPPING) / 2,
        }}
        style={{ height: 300 }}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        horizontal={true}
      />
    </>
  );
};
