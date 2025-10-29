import React from "react";
import {
  Dimensions,
  FlatList,
  FlatListProps,
  ViewStyle
} from "react-native";

type SnappingProps<ItemT> = FlatListProps<ItemT> & {
  itemWidth: number;
  spacingBetweenItems?: number;
  enableSnapping?: boolean;
  snapToAlignment?: "start" | "center" | "end";
  contentContainerStyle?: ViewStyle | ViewStyle[];
  centerFirstAndLast?: boolean; // yeni: ilk/son öğeyi ortala (default true)
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function SnappingFlatlistInner<ItemT>(
  props: SnappingProps<ItemT>,
  ref: React.Ref<FlatList<ItemT>>
) {
  const {
    itemWidth,
    spacingBetweenItems = 0,
    enableSnapping = true,
    snapToAlignment = "center",
    horizontal = true,
    contentContainerStyle,
    getItemLayout,
    snapToInterval,
    decelerationRate,
    contentInsetAdjustmentBehavior,
    centerFirstAndLast = true,
    ...rest
  } = props;

  const snapIntervalCalc = itemWidth + spacingBetweenItems;
  const shouldSnap = enableSnapping && horizontal;

  const resolvedSnapToInterval =
    snapToInterval ?? (shouldSnap ? snapIntervalCalc : undefined);

  const resolvedDeceleration = decelerationRate ?? (shouldSnap ? "fast" : undefined);

  // side padding sadece centerFirstAndLast true ise hesaplanır; false ise flex-start davranışı olur
  const sidePadding = centerFirstAndLast ? Math.max(0, (SCREEN_WIDTH - itemWidth) / 2) : 0;

  const mergedContentContainerStyle = [
    { paddingLeft: horizontal ? sidePadding : 0, paddingRight: horizontal ? sidePadding : 0 },
    contentContainerStyle,
  ];

  const resolvedGetItemLayout =
    getItemLayout ??
    (shouldSnap
      ? (_data: any, index: number) => ({
          length: snapIntervalCalc,
          offset: snapIntervalCalc * index + (centerFirstAndLast ? 0 : 0), // offset hesaplaması snapInterval bazlı
          index,
        })
      : undefined);

  return (
    <FlatList
      ref={ref}
      horizontal={horizontal}
      snapToInterval={resolvedSnapToInterval}
      snapToAlignment={shouldSnap ? snapToAlignment : undefined}
      decelerationRate={resolvedDeceleration as any}
      contentContainerStyle={mergedContentContainerStyle}
      getItemLayout={resolvedGetItemLayout}
      contentInsetAdjustmentBehavior={contentInsetAdjustmentBehavior ?? "automatic"}
      {...(rest as FlatListProps<ItemT>)}
    />
  );
}

const SnappingFlatlist = React.forwardRef(SnappingFlatlistInner) as <T>(
  p: SnappingProps<T> & { ref?: React.Ref<FlatList<T>> }
) => React.ReactElement;

export default SnappingFlatlist;

/*
Usage:

<SnappingFlatlist
  data={data}
  renderItem={renderItem}
  keyExtractor={...}
  itemWidth={350}
  spacingBetweenItems={20}
  centerFirstAndLast={false} // ilk öğe flex-start başlasın
/>
*/