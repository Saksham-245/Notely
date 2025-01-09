import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { AppColors } from "../colors/AppColors";
import CustomOrangeButton from "./CustomOrangeButton";

export default function NoteForm({
  initialValues = { title: "", content: "" },
  onSubmit,
  submitButtonText = "Save Note",
  id,
  isKeyboardVisible,
  formRef,
  resetOnUnmount = false
}) {
  useEffect(() => {
    return () => {
      if (resetOnUnmount && formRef.current) {
        formRef.current.resetForm();
      }
    };
  }, [resetOnUnmount]);

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.content) {
      errors.content = "Content is required";
    }
    return errors;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
          innerRef={formRef}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            dirty,
          }) => (
            <View style={styles.contentContainer}>
              <View style={styles.formContainer}>
                <View style={[styles.formGroup, { marginBottom: 20 }]}>
                  <Text style={styles.formLabel}>Title</Text>
                  <TextInput
                    style={[
                      styles.formInput,
                      {
                        fontFamily: "Nunito-Bold",
                      },
                    ]}
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                    placeholder="Enter note title"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  />
                  {errors.title && touched.title && (
                    <Text style={styles.errorText}>{errors.title}</Text>
                  )}
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Content</Text>
                  <TextInput
                    style={[
                      styles.formInput,
                      {
                        fontFamily: "Nunito-Bold",
                        height: id && isKeyboardVisible ? 200 : isKeyboardVisible ? 180 : id && !isKeyboardVisible ? 510 : 520, // Reduced fixed height for update case
                      },
                    ]}
                    onChangeText={handleChange("content")}
                    onBlur={handleBlur("content")}
                    value={values.content}
                    placeholder="Enter note content"
                    multiline={true}
                    textAlignVertical="top"
                    scrollEnabled={true} // Enable scrolling for overflow content
                  />
                  {errors.content && touched.content && (
                    <Text style={styles.errorText}>{errors.content}</Text>
                  )}
                </View>
              </View>
                <View style={styles.buttonContainer}>
                  <CustomOrangeButton
                    title={submitButtonText}
                    onPress={handleSubmit}
                    disabled={!isValid || !dirty}
                  />
                </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    display: "flex",
  },
  formGroup: {},
  formLabel: {
    fontSize: 14,
    fontFamily: "Nunito-Bold",
    color: AppColors.subTextColor,
  },
  formInput: {
    borderRadius: 10,
    paddingTop: 6,
    fontFamily: "Nunito-Bold",
  },
  contentInput: {
    height: "100%",
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Nunito-Bold",
    marginTop: 5,
    marginLeft: 0,
  },
  buttonContainer: {
    paddingHorizontal: 70,
    paddingBottom: 20,
    marginTop: "auto",
  },
});
