import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, Image, StyleSheet, Pressable, ScrollView, SafeAreaView, View } from 'react-native'
import { Collapsible } from '@ben39053372/expo-theme'

export const Result = () => {
  const route = useRoute()
  const params = route.params as {
    _id?: string
    imageUrl?: string
    visionResult?: string
    tesseractResult?: string
  }

  const [visionApiResultOpen, setVisionApiResultOpen] = useState(false)
  const [tesseractResultOpen, setTesseractResultOpen] = useState(false)

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Image source={{ uri: params?.imageUrl || "" }} style={{ width: "100%", height: 300 }} resizeMode="contain" />

      <ScrollView>

        <Pressable style={styles.title} onPress={() => setVisionApiResultOpen(s => !s)}>
          <Text style={styles.titleText}>Vision API Result</Text>
        </Pressable>

        <Collapsible opened={visionApiResultOpen} animationConfig={{ duration: 400 }}>
          <Text>
            {params.visionResult}
          </Text>
        </Collapsible>

        <Pressable style={styles.title} onPress={() => setTesseractResultOpen(s => !s)}>
          <Text style={styles.titleText}>
            Tesseract Result
          </Text>
        </Pressable>

        <Collapsible opened={tesseractResultOpen} animationConfig={{ duration: 400 }}>
          <Text>
            {params.tesseractResult}
          </Text>
        </Collapsible>

      </ScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  title: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
    backgroundColor: "#049d",
  },
  titleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  }
})
