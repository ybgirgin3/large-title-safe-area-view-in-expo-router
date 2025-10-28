import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function CustomStackHeader({ navigation, route, options, back }: any) {
  const title = options?.title ?? route?.name ?? "";

  return (
    <View style={styles.container}>
      {back ? (
        <Pressable onPress={() => navigation?.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}

      <Text style={[styles.title, options?.headerLargeTitle && Platform.OS === "ios" ? styles.largeTitle : null]}>
        {title}
      </Text>

      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  backBtn: { width: 36, alignItems: "flex-start" },
  backText: { fontSize: 28 },
  spacer: { width: 36 },
  title: { fontSize: 17, fontWeight: "600" },
  largeTitle: { fontSize: 34, fontWeight: "700" },
});