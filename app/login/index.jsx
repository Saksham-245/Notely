import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import CustomAppBar from "../../src/components/CustomAppBar";
import MainContainer from "../../src/components/MainContainer";
import { AppColors } from "../../src/colors/AppColors";
import { Formik } from "formik";
import CustomOrangeButton from "../../src/components/CustomOrangeButton";
import TextButton from "../../src/components/TextButton";
import { useRouter } from "expo-router";
import { isValidEmail, isValidPassword } from "../../src/utils/Utils";
import { login, setAuthToken } from "../../src/api/http";
import { showMessage } from "react-native-flash-message";
import { useAuth } from "../../src/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { setLogin, setLogout } = useAuth();

  const validate = (values) => {
    const errors = {};
    if (!values.email || !isValidEmail(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.password || !isValidPassword(values.password)) {
      errors.password = "Password must be at least 8 characters";
    }
    return errors;
  };

  const handleLogin = async (values) => {
    try {
      const response = await login(values.email, values.password);            
      if (response?.s && response?.token) {
        const userInfo = {
          ...response.user,
          token: response.token
        };        
        setAuthToken(response.token);
        setLogin(userInfo);
        router.replace("/(auth)/home");
      } else {
        showMessage({
          message: response.message,
          type: "danger",
        });

      }
    } catch (error) {
      showMessage({
        message: error.message,
        type: "danger",
      });
    } 
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
      style={{ flex: 1 }}
    >
      <CustomAppBar titleStyle={{ textTransform: "uppercase" }} />
      <MainContainer>
        <View>
          <Text style={styles.title}>Login to your account</Text>
          <Text style={styles.subtitle}>
            Welcome back! Login to your account to continue.
          </Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={validate}
              onSubmit={handleLogin}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                dirty,
                touched,
                isValid,
              }) => (
                <View style={styles.contentContainer}>
                  <View style={styles.formContainer}>
                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Email</Text>
                      <TextInput
                        style={[
                          styles.formInput,
                          {
                            borderWidth: errors.email && touched.email ? 1 : 0,
                            borderColor:
                              errors.email && touched.email ? "red" : null,
                            color: errors.email && touched.email && "red",
                          },
                        ]}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Enter your email"
                        placeholderTextColor={
                          errors.email && touched.email ? "red" : "gray"
                        }
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
                              errors.password && touched.password
                                ? "red"
                                : null,
                            color:
                              errors.password && touched.password
                                ? "red"
                                : "black",
                          },
                        ]}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        secureTextEntry={true}
                        placeholder="Enter your password"
                        placeholderTextColor={
                          errors.password && touched.password
                            ? "red"
                            : "gray"
                        }
                      />
                      {errors.password && touched.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.buttonContainer}>
                    <CustomOrangeButton
                      title="Login"
                      onPress={handleSubmit}
                      disabled={!dirty || !isValid}
                    />
                    <TextButton
                      onPress={() => router.push("/signup")}
                      title={"Don't have an account?"}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </MainContainer>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexWrap: "wrap",
    color: AppColors.subTextColor,
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
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
  contentContainer: {
    flex: 1,
    display: "flex",
  },
  buttonContainer: {
    paddingHorizontal: 70,
    paddingBottom: 20,
    marginTop: "auto",
  },
});
