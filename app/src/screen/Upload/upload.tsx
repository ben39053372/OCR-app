import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export function Upload() {
  const [image, setImage] = useState<string>(null!);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: mediaLibPermissionStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: cameraPermissionStatus } = await ImagePicker.requestCameraPermissionsAsync()
        if (mediaLibPermissionStatus !== 'granted' || cameraPermissionStatus !== "granted") {
          alert('Sorry, we need camera or camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    })
    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const submit = async () => {
    const data = new FormData()
    // data.append("file",) 
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <Button title="Pick image" onPress={pickImage} />
        <Button title="Take Photo" onPress={takePhoto} />
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text>{image}</Text>
      <Button title="Upload" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  buttonView: {
    flexDirection: "row"
  },
  image: { width: "100%", height: "60%" }

})