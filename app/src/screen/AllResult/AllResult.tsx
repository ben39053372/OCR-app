import { useNavigation } from "@react-navigation/native";
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
import { Route } from "../../route"

const Header = () => {
  return (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderText}>All OCR Result</Text>
    </View>
  );
};

const Empty = () => {
  return (
    <View style={styles.listEmpty}>
      <Text style={styles.listEmptyText}>
        Not Result Here...
      </Text>
    </View>
  )
}

const Footer = () => {
  return (
    <View style={styles.listFooter}>
      <Text style={styles.listFooterText}>End of List</Text>
    </View>
  );
};

const ListItem: ListRenderItem<{ imageUrl: string, date: string }> = ({ item }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate(Route.Result, { ...item })} style={styles.listItem}>
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: "auto", height: 200 }}
        resizeMode="contain"
      />
      <Text>{item.date}</Text>
    </TouchableOpacity>
  );
};

export const AllResult = () => {
  const [allOCRData, setAllOCRData] = useState();
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    setLoading(true);
    const data = await getAllOCR();
    setAllOCRData(data.data);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allOCRData}
        numColumns={2}
        renderItem={(props) => <ListItem {...props} />}
        initialNumToRender={10}
        ListHeaderComponent={Header}
        ListEmptyComponent={Empty}
        ListFooterComponent={Footer}
        keyExtractor={(item) => item._id}
        onRefresh={fetchData}
        refreshing={loading}
        onEndReached={fetchData}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "#0009",
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    padding: 10
  },
  listFooter: {
    padding: 10
  },
  listHeaderText: {
    fontWeight: "bold", fontSize: 20
  },
  listEmpty: {
    padding: 10
  },
  listEmptyText: {
    fontWeight: "bold",
    fontSize: 22
  },
  listFooterText: {
    fontWeight: "bold", fontSize: 20
  },
  listItem: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignContent: "center",
  },
});
