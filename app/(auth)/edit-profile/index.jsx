import React, { useRef, useState } from "react";
import MainContainer from "../../../src/components/MainContainer";
import CustomAppBar from "../../../src/components/CustomAppBar";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar } from "react-native-paper";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import CustomOrangeButton from "../../../src/components/CustomOrangeButton";
import { uploadImage } from "../../../src/api/http";
import { showMessage } from "react-native-flash-message";
import * as ImageManipulator from "expo-image-manipulator";
import { useAuth } from "../../../src/context/AuthContext";
import { AppColors } from "../../../src/colors/AppColors";
import { normalizeImageUrl } from "../../../src/utils/Utils";

export default function EditProfile() {
  const router = useRouter();
  const { userInfo, updateUserInfo } = useAuth();
  const [imageLoading, setImageLoading] = useState(false);
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImagePicker = async (setFieldValue) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 1000, height: 1000 } }],
          { compress: 0.7, format: "jpeg" }
        );

        const response = await uploadImage(manipulatedImage.uri);
        setImageLoading(true);
        if (response.s) {
          setFieldValue("profile_picture", response?.data?.profileImageUrl);
          setImageLoading(false);
          showMessage({
            message: response?.message,
            type: "success",
            icon: "success",
            duration: 3000,
          });
        } else {
          setImageLoading(false);
          showMessage({
            message: response?.message,
            type: "danger",
            icon: "danger",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      showMessage({
        message: error?.message || "An error occurred while processing the image",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    if (!formRef.current?.dirty) {
      return;
    }

    // Additional validation before submission
    if (values.fullName.length < 3) {
      showMessage({
        message: "Username must be at least 3 characters",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Only send changed values to the API
      const changedValues = {};
      if (values.fullName !== userInfo.username && values.fullName.length >= 3) {
        changedValues.fullName = values.fullName;
      }
      if (values.email !== userInfo.email) {
        changedValues.email = values.email;
      }
      if (values.profile_picture !== userInfo.profileImageUrl) {
        changedValues.profile_picture = values.profile_picture;
      }

      const response = await updateUserInfo(
        userInfo?.id,
        values.fullName,
        values.email,
        values.profile_picture
      );

      if (response.s) {
        showMessage({
          message: response.message,
          type: "success",
          icon: "success",
          duration: 3000,
        });

        formRef.current?.resetForm({
          values: {
            fullName: values.fullName,
            email: values.email,
            profile_picture: values.profile_picture
          },
          isDirty: false
        });
      } else {
        showMessage({
          message: 'Profile update failed',
          type: "danger",
          icon: "danger",
          duration: 3000,
        });
      }
    } catch (error) {
      showMessage({
        message: error.message || "An error occurred",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!userInfo) {
    return (
      <MainContainer>
        <ActivityIndicator size="large" color={AppColors.buttonColor} />
      </MainContainer>
    );
  }

  const validateForm = (values) => {
    const errors = {};

    // Username validation (minimum 3 characters)
    if (!values.fullName) {
      errors.fullName = "Full name is required";
    } else if (values.fullName.length < 3) {
      errors.fullName = "Full name must be at least 3 characters";
    }

    // Email validation
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!values.email.includes('@')) {
      errors.email = "Please enter a valid email address";
    }

    // Profile picture validation
    if (!values.profile_picture) {
      errors.profile_picture = "Profile picture is required";
    }

    return errors;
  };

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <MainContainer>
        <CustomAppBar
          title="Edit Profile"
          titleStyle={styles.titleStyle}
          showContent={false}
          leftContent={
            <Appbar.Action
              icon={Platform.OS === "ios" ? "chevron-left" : "arrow-left"}
              onPress={() => {
                formRef.current.resetForm();
                router.back();
              }}
              rippleColor="transparent"
              color="#000"
              size={Platform.OS === "ios" ? 30 : 26}
            />
          }
          rightContent={
            <Appbar.Action
              icon=""
              size={36}
              rippleColor="transparent"
              color="transparent"
              disabled={true}
            />
          }
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <Formik
              enableReinitialize={false}
              innerRef={formRef}
              validate={validateForm}
              initialValues={{
                fullName: userInfo?.username || "",
                email: userInfo?.email || "",
                profile_picture: userInfo?.profileImageUrl || "",
              }}
              onSubmit={handleSubmit}
            >
              {(formikProps) => {
                const {
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  values,
                  errors,
                  dirty,
                  isValid,
                  touched,
                  setFieldValue,
                } = formikProps;

                return (
                  <>
                    <ScrollView
                      style={{ flex: 1 }}
                      showsVerticalScrollIndicator={false}
                    >
                      <View style={styles.formContainer}>
                        <View style={styles.formGroup}>
                          {imageLoading ? (
                            <ActivityIndicator size="large" color={AppColors.buttonColor} />
                          ) : (
                            <TouchableOpacity
                              onPress={() => handleImagePicker(setFieldValue)}
                            >
                              <Image
                                source={{
                                  uri: normalizeImageUrl(values.profile_picture),
                                }}
                                style={[styles.profileImage, { backgroundColor: '#f0f0f0' }]}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                        <View style={styles.formGroup}>
                          <Text style={styles.formLabel}>Full Name</Text>
                          <TextInput
                            style={[
                              styles.formInput,
                              {
                                borderWidth:
                                  errors.fullName && touched.fullName ? 1 : 0,
                                borderColor:
                                  errors.fullName && touched.fullName
                                    ? "red"
                                    : null,
                              },
                            ]}
                            onChangeText={handleChange("fullName")}
                            onBlur={handleBlur("fullName")}
                            value={values.fullName}
                            placeholder="Enter your full name"
                          />
                          {errors.fullName && touched.fullName && (
                            <Text style={styles.errorText}>{errors.fullName}</Text>
                          )}
                        </View>
                        <View style={styles.formGroup}>
                          <Text style={styles.formLabel}>Email</Text>
                          <TextInput
                            style={[
                              styles.formInput,
                              {
                                borderWidth:
                                  errors.email && touched.email ? 1 : 0,
                                borderColor:
                                  errors.email && touched.email ? "red" : null,
                              },
                            ]}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            disabled={true}
                            keyboardType="email-address"
                            placeholder="Enter your email"
                          />
                          {errors.email && touched.email && (
                            <Text style={styles.errorText}>{errors.email}</Text>
                          )}
                        </View>
                      </View>
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                      <CustomOrangeButton
                        disabled={!isValid || !dirty || isSubmitting}
                        title={isSubmitting ? "Updating..." : "Update"}
                        onPress={handleSubmit}
                      />
                    </View>
                  </>
                );
              }}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </MainContainer>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 16,
    fontFamily: "Nunito-Black",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontFamily: "Nunito-Black",
  },
  formInput: {
    borderRadius: 5,
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: Platform.OS === "ios" ? 16 : 12,
    paddingHorizontal: 10,
    fontFamily: "Nunito-Bold",
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Nunito-Bold",
    marginTop: 5,
    marginLeft: 6,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    paddingBottom: 0,
    backgroundColor: "transparent",
  },
});
