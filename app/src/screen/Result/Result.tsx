import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, ListRenderItem } from 'react-native'
import { getAllOCR } from '../../api/server'

const ListItem: ListRenderItem<any> = ({ item }) => {
  return (
    <View>
      <Text>
        {JSON.stringify(item)}
      </Text>
    </View>
  )
}

export const Result = () => {

  const [allOCRData, setAllOCRData] = useState()

  useEffect(() => {
    (async () => {
      setAllOCRData(await getAllOCR())
    })()
  }, [])

  return (
    <SafeAreaView>
      <FlatList data={allOCRData} renderItem={ListItem} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {

  },

})