import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomAppBar from "../src/components/CustomAppBar";
import { AppColors } from "../src/colors/AppColors";
import CustomOrangeButton from "../src/components/CustomOrangeButton";
import TextButton from "../src/components/TextButton";
import { useRouter } from "expo-router";
import MainContainer from "../src/components/MainContainer";
import { useAuth } from "../src/context/AuthContext";

export default function Index() {
  const router = useRouter();
  const { setLoginRoute } = useAuth();

  const handleLoginPress = async () => {
    await setLoginRoute(true);
    router.push("/login");
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomAppBar
        title="Notely"
        titleStyle={{ textTransform: "uppercase" }}
      />
      <MainContainer
        mainContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/onboarding.png")}
          style={styles.logo}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            World's Safest And Largest Digital Notebook
          </Text>
          <Text style={styles.subtitle}>
            Notely is the world's safest, largest and intelligent digital
            notebook. Join over 10M+ users already using Notely.
          </Text>
        </View>
      </MainContainer>
      <View style={styles.buttonContainer}>
        <CustomOrangeButton
          title="Get Started"
          onPress={() => router.push("/signup")}
        />
        <TextButton
          onPress={handleLoginPress}
          title={"Already have an account?"}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 288,
    height: 217,
  },
  textContainer: {
    width: 308,
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    color: AppColors.textColor,
    textAlign: "center",
    fontFamily: 'Nunito-Black'
  },
  subtitle: {
    fontFamily: 'Nunito-Bold',
    marginTop: 10,
    fontSize: 16,
    color: AppColors.subTextColor,
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 100,
  },
});
