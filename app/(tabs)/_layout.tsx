import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Foundation } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";

// TABS
export default function TabLayout() {
  const colorScheme = useColorScheme();

  // vars
  const tabBarIconSize = 30;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        animation: "fade",

        // styles
        tabBarStyle: {
          height: 100,
          backgroundColor: "#ffffff7c",
          borderTopWidth: 0,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        },
        tabBarIconStyle: {
          // marginBottom: 5,
          margin: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },

        // .systemThinMaterial
        tabBarBackground: () => (
          <BlurView
            tint={colorScheme === "dark" ? "dark" : "light"}
            intensity={100}
            style={{ flex: 1 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="homescreen"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Foundation size={tabBarIconSize} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="newsongs"
        options={{
          title: "New",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={tabBarIconSize}
              name="square.grid.2x2.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="radio"
        options={{
          title: "Radio",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={tabBarIconSize}
              name="dot.radiowaves.left.and.right"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="archive"
        options={{
          title: "Archive",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={tabBarIconSize}
              name="music.note.list"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={tabBarIconSize}
              name="magnifyingglass"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
