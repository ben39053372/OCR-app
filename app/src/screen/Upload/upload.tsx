import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../api/cloudinary";
import { sendOCR } from "../../api/server";

export function Upload() {
  const [image, setImage] = useState<string | undefined>();
  const [url, setUrl] = useState<any>();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status: mediaLibPermissionStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: cameraPermissionStatus } =
          await ImagePicker.requestCameraPermissionsAsync();
        if (
          mediaLibPermissionStatus !== "granted" ||
          cameraPermissionStatus !== "granted"
        ) {
          Alert.alert(
            "Sorry, we need camera or camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  const uploadConfig: ImagePicker.ImagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    exif: true,
    quality: 0.6,
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(uploadConfig);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync(uploadConfig);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submit = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const res = await uploadImage(image);
      setUrl(res.secure_url);
      const ocrResult = await sendOCR(res.secure_url);
      console.log(ocrResult);
      setResult(ocrResult.visionResult);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      // setImage(undefined);
    }
  };

  const nextLine = `
  `;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.buttonView}>
          <Button title="Pick image" onPress={pickImage} />
          <Button title="Take Photo" onPress={takePhoto} />
        </View>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        {/* <Text>{url}</Text> */}
        {image &&
          (loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              title="Upload"
              color={!image ? "#888" : "blue"}
              disabled={!image}
              onPress={submit}
            />
          ))}
        <ScrollView style={{ width: "100%" }}>
          <Text>{JSON.stringify(result)?.replace(/\\n/g, nextLine)}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  buttonView: {
    flexDirection: "row",
  },
  image: { width: "100%", height: "60%" },
});
