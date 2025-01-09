import React from "react";
import {
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
import CustomAppBar from "../../src/components/CustomAppBar";
import MainContainer from "../../src/components/MainContainer";
import { AppColors } from "../../src/colors/AppColors";
import CustomOrangeButton from "../../src/components/CustomOrangeButton";
import TextButton from "../../src/components/TextButton";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { isValidEmail, isValidName, isValidPassword } from "../../src/utils/Utils";

export default function SignUp() {
  const router = useRouter();
  const validate = (values) => {
    const errors = {};
    if (!values.fullName || !isValidName(values.fullName)) {
      errors.fullName = "Full name must be at least 3 characters";
    }
    if (!values.email || !isValidEmail(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.password || !isValidPassword(values.password)) {
      errors.password = "Password must be at least 8 characters";
    }
    return errors;
  };
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <CustomAppBar titleStyle={{ textTransform: "uppercase" }} />
      <MainContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <View style={styles.contentContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Create a free account</Text>
              <Text style={styles.subtitle}>
                Join Notely for free. Create and share unlimited notes with your
                friends.
              </Text>
            </View>

            <Formik
              initialValues={{ fullName: "", email: "", password: "" }}
              validate={validate}
              onSubmit={(values) => console.log(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
                values,
                dirty,
                isValid,
              }) => (
                <>
                  <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={styles.formContainer}>
                      <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Full Name</Text>
                        <TextInput
                          style={[
                            styles.formInput,
                            {
                              borderWidth:
                                errors.fullName && touched.fullName ? 1 : 0,
                              borderColor:
                                errors.fullName && touched.fullName ? "red" : null,
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
                              borderWidth: errors.email && touched.email ? 1 : 0,
                              borderColor:
                                errors.email && touched.email ? "red" : null,
                            },
                          ]}
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          value={values.email}
                          keyboardType="email-address"
                          placeholder="Enter your email"
                        />
                        {errors.email && touched.email && (
                          <Text style={styles.errorText}>{errors.email}</Text>
                        )}
                      </View>
                      <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Password</Text>
                        <TextInput
                          style={[
                            styles.formInput,
                            {
                              borderWidth:
                                errors.password && touched.password ? 1 : 0,
                              borderColor:
                                errors.password && touched.password ? "red" : null,
                            },
                          ]}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          value={values.password}
                          secureTextEntry={true}
                          placeholder="Enter your password"
                        />
                        {errors.password && touched.password && (
                          <Text style={styles.errorText}>{errors.password}</Text>
                        )}
                      </View>
                    </View>
                  </ScrollView>
                  <View style={styles.buttonContainer}>
                    <CustomOrangeButton
                      title="Create Account"
                      onPress={handleSubmit}
                      disabled={!isValid || !dirty}
                    />
                    <TextButton
                      onPress={() => router.push("/login")}
                      title={"Already have an account?"}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </MainContainer>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: "15%",
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Nunito-Black",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Nunito-Bold",
    color: AppColors.subTextColor,
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontFamily: "Nunito-Bold",
    color: AppColors.subTextColor,
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
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Nunito-Bold",
    marginTop: 5,
    marginLeft: 6,
  },
  buttonContainer: {
    paddingHorizontal: 70,
    paddingVertical: 20,
    backgroundColor: "transparent",
  },
  contentContainer: {
    flex: 1,
  },
});
