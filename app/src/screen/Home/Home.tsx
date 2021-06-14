import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { clearAllData, healthCheck } from '../../api/server'
import { Button } from '@ben39053372/expo-theme'

export const Home = () => {

  const [status, setStatus] = useState<any>()

  const onHealthCheckClick = async () => {
    try {
      const res = await healthCheck()
      setStatus(res)
    } catch (err) {
      setStatus(undefined)
    }
    if (isDbOk()) Alert.alert("Server Health Ok!")
  }

  useEffect(() => {
    onHealthCheckClick()
  }, [])

  const isDbOk = () => status?.db_status?.ok

  const onClearPress = async () => {
    try {

      const res = await clearAllData()
      Alert.alert("Cleared!")
    } catch (err) {
      Alert.alert("error", JSON.stringify(err))
    }
  }

  return (
    <View style={styles.container}>
      <Button primary rounded style={{ alignSelf: "center" }} onPress={onHealthCheckClick}>Health Check</Button>
      <Text style={[styles.text, styles.title]}>Server Status</Text>
      <Text style={[styles.text, status ? styles.success : styles.fail]}>{status ? "ok" : "fail"}</Text>
      <Text style={[styles.text, styles.title]}>DB Status</Text>
      <Text style={[styles.text, isDbOk() ? styles.success : styles.fail]}>{isDbOk() ? "ok" : "fail"}</Text>
      <Text>{JSON.stringify(status, null, 2)}</Text>
      <Button error onPress={onClearPress} >Clear All Data</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  text: {
    textAlign: "center"
  },
  title: {
    color: "#44fc",
    fontSize: 26,
    fontWeight: "bold"
  },
  success: {
    color: "#3f3",
    fontWeight: "bold",
    fontSize: 20,
    textShadowColor: "#0005",
    textShadowOffset: {
      width: 1,
      height: 2
    },
    textShadowRadius: 3
  },
  fail: {
    color: "#f66"
  }
})