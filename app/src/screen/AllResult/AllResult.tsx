import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import { getAllOCR } from "../../api/server";

const Header = () => {
  return <View><Text>All OCR Result</Text></View>
}

export const AllResult = () => {
  const [allOCRData, setAllOCRData] = useState();

  const setData = async () => {
    const data = await getAllOCR();
    console.log(data.data);
    setAllOCRData(data.data);
  }

  useEffect(() => {
    (async () => {
      await setData()
    })();
  }, []);

  const ListItem: ListRenderItem<any> = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity style={{ height: 100, width: "100%" }}>

        <View style={{ padding: 5, backgroundColor: "#3499" }}>
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allOCRData}
        numColumns={2}
        renderItem={ListItem}
        initialNumToRender={10}
        ListHeaderComponent={Header}
        keyExtractor={(item) => item._id}
        // columnWrapperStyle={{ margin: 1 }}
        onEndReached={setData}
        ItemSeparatorComponent={() => <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#0009" }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0005",
  },
});
