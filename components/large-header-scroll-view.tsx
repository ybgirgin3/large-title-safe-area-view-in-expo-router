import { useColorScheme } from "@/hooks/use-color-scheme";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type LargeTitleSafeAreaProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerMax?: number;
  headerMin?: number;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  titleStyleDark?: TextStyle;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  bottomTabBarHeight?: number;
};

const LargeTitleSafeArea = ({
  title,
  subtitle,
  children,
  headerMax,
  headerMin,
  headerStyle,
  titleStyle,
  headerLeft,
  headerRight,
  bottomTabBarHeight,
}: LargeTitleSafeAreaProps) => {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();


  const HEADER_MAX = headerMax ? headerMax : 150;
  const HEADER_MIN = headerMin ? headerMin : 100;
  const SCROLL_RANGE = HEADER_MAX - HEADER_MIN;
  const LARGE_FONT_SIZE = 32;
  const SMALL_FONT_SIZE = 17

  // choose styles
  // const selectedTitleStyle =
  //   colorScheme === "dark" ? titleStyleDark : titleStyle;

  const SIDE_TOP = insets.top + Math.max(0, (HEADER_MIN - insets.top) / 2) - 18;
  const BOTTOM_TAB_BAR_HEIGHT = typeof bottomTabBarHeight === "number" ? bottomTabBarHeight : 100; // default fallback
  const contentPaddingBottom = insets.bottom + BOTTOM_TAB_BAR_HEIGHT;

  /// * ANIMATIONS
  // shared value
  const scrollY = useSharedValue(0);

  // scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // animated header height
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, SCROLL_RANGE],
      [HEADER_MAX, HEADER_MIN],
      Extrapolate.CLAMP
    );
    return {
      height,
    };
  });

  // büyük başlık için opacity + transform + FONT SIZE interpolate
  const largeTitleAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, SCROLL_RANGE * 0.6, SCROLL_RANGE],
      [1, 0.3, 0],
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [0, SCROLL_RANGE],
      [0, -12],
      Extrapolate.CLAMP
    );
    const fontSize = interpolate(
        scrollY.value,
        [0, SCROLL_RANGE],
        [LARGE_FONT_SIZE, SMALL_FONT_SIZE],
        Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
      fontSize,
    };
  });

  // subtitle tamamen kaybolsun daha erken
  const subtitleAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, SCROLL_RANGE * 0.4, SCROLL_RANGE],
      [1, 0.2, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  // küçük ortalanmış başlık: sadece min boyuta yaklaşınca göster
  const smallTitleAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [SCROLL_RANGE * 0.5, SCROLL_RANGE],
      [0, 1],
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [0, SCROLL_RANGE],
      [6, 25],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <>
      <Animated.View style={[styles.header, headerAnimatedStyle, headerStyle]}>
        <BlurView
          tint={colorScheme === "dark" ? "dark" : "light"}
          intensity={100}
          style={StyleSheet.absoluteFill}
        />
        {/* centered small title (shows when header is collapsed) */}
        <Animated.View
          style={[styles.smallTitleContainer, smallTitleAnimatedStyle]}
        >
          <Text style={[styles.smallTitleText, titleStyle]}>
            {title}
          </Text>
        </Animated.View>

        <SafeAreaView edges={["top"]} style={styles.safeArea}>
          <Animated.Text
            /* order matters: base styles, user-provided static styles, then animated style
               so animated fontSize overrides any static fontSize user passed in */
            style={[styles.title, titleStyle as any, largeTitleAnimatedStyle]}
          >
            {title}
          </Animated.Text>
          {/* {subtitle ? (
            <Animated.Text
              style={[
                styles.subtitle,
                subtitleAnimatedStyle,
                selectedSubTitleStye,
              ]}
            >
              {subtitle}
            </Animated.Text>
          ) : null} */}
        </SafeAreaView>
      </Animated.View>

      {/* SOL ve SAĞ elemanlar - header animasyonundan bağımsız, fixed position */}
      {headerLeft ? (
        <View style={[styles.sideContainer, { left: 12, top: SIDE_TOP }]}>
          {headerLeft}
        </View>
      ) : null}
      {headerRight ? (
        <View style={[styles.sideContainer, { right: 12, top: SIDE_TOP }]}>
          {headerRight}
        </View>
      ) : null}

      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX, paddingBottom: contentPaddingBottom }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        // iOS: içerik içeriğinin sistem çubukları tarafından taşınmasını sağlamak için
        contentInsetAdjustmentBehavior={"never"}
      >
        {children}
      </Animated.ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "red",
    zIndex: 10,
    elevation: 10,
    overflow: "hidden",
  },
  safeArea: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    marginTop: 4,
  },

  // small centered title styles (tabbar header benzeri)
  smallTitleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    // pointerEvents none so it doesn't block touches
    pointerEvents: "none",
  },
  smallTitleText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
  sideContainer: {
    position: "absolute",
    zIndex: 20,
    // yükseklik/width yok, içindeki butonun kendi ölçüsünü kullanır
  },
});

export default LargeTitleSafeArea;
