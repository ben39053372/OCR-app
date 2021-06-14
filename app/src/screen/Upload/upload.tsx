import React, { useState, useEffect } from "react";
import {
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
import { Button } from "@ben39053372/expo-theme";
import * as ImageManipulator from 'expo-image-manipulator';

export function Upload() {
  const [image, setImage] = useState<string | undefined>();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    quality: 0.6,
  };

  const resizeImage = async (uri: string) => {
    return await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 700 } }],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
    )
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(uploadConfig);
    if (!result.cancelled) {
      const photo = await resizeImage(result.uri)
      setImage(photo.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync(uploadConfig);
    if (!result.cancelled) {
      const photo = await resizeImage(result.uri)
      setImage(photo.uri);
    }
  };

  const submit = async () => {
    if (!image) return;
    setLoading(true);
    try {
      setMessage("Uploading Image");
      const res = await uploadImage(image);
      setMessage("OCR ing...");
      const ocrResult = await sendOCR(res.secure_url);
      setResult(ocrResult.visionResult);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  const nextLine = `
  `;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {image && (
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={styles.image}
          />
        )}
        {image &&
          (loading ? (
            <>
              <ActivityIndicator />
              <Text>{message}</Text>
            </>
          ) : (
            <Button
              primary
              rounded
              style={{ margin: 5 }}
              disabled={!image}
              onPress={submit}
            >
              Upload photo
            </Button>
          ))}
        <ScrollView style={{ width: "100%" }}>
          <Text>{JSON.stringify(result)?.replace(/\\n/g, nextLine)}</Text>
        </ScrollView>
      </View>
      <View style={styles.buttonView}>
        <Button primary rounded onPress={pickImage}>
          Pick Image
        </Button>
        <Button secondary rounded onPress={takePhoto}>
          Take Photo
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  buttonView: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  image: { width: "100%", height: "60%" },
});
