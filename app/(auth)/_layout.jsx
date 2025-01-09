import { Drawer } from "expo-router/drawer";
import React, { useCallback, useRef, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { AppColors } from "../../src/colors/AppColors";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import PremiumIcon from "../../src/icons/premium_icon";
import EditIcon from "../../src/icons/edit_icon";
import LogoutIcon from "../../src/icons/logout_icon";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useUserInfo } from "../../src/hooks/useUserInfo";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: AppColors.scaffoldBackgroundColor,
        },
        drawerLabelStyle: {
          fontFamily: "Nunito-Bold",
        },
      }}
    />
  );
}

function DrawerContent() {
  const { userInfo, getUserInfo } = useUserInfo();
  const router = useRouter();
  const bottomSheetModalRef = useRef(null);
  
  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [])
  );

  useEffect(() => {
    getUserInfo();
  }, [userInfo?.name, userInfo?.email, userInfo?.profile_picture]);

  const handlePresentModalPress = useCallback(() => {
    // navigation.toggleDrawer();
    bottomSheetModalRef.current?.present();
  }, []);

  const drawerItems = [
    {
      title: "Buy Premium",
      icon: <PremiumIcon />,
      onPress: handlePresentModalPress,
    },
    {
      title: "Edit Profile",
      icon: <EditIcon />,
      onPress: () => router.push("/edit-profile"),
    },
    {
      title: "Logout",
      icon: <LogoutIcon />,
    },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: userInfo?.profile_picture }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.username}>{userInfo?.name}</Text>
              <Text style={styles.email}>{userInfo?.email}</Text>
            </View>
          </View>
          <View style={styles.drawerContainer}>
            {drawerItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                activeOpacity={1}
              >
                <View style={styles.drawerItem}>
                  {item.icon}
                  <Text style={styles.drawerItemTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={["100%"]}
            backgroundStyle={{ backgroundColor: AppColors.scaffoldBackgroundColor }}
            enablePanDownToClose={true}
            index={0}
          >
            <View style={styles.bottomSheetContent}>
              <Text style={styles.premiumTitle}>Premium Features</Text>
              {/* Add your premium content here */}
            </View>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: "cover",
  },
  textContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: 24,
    fontFamily: "Nunito-Black",
    marginBottom: 6,
  },
  email: {
    fontSize: 14,
    fontFamily: "Nunito-Bold",
    color: AppColors.subTextColor,
  },
  drawerContainer: {
    marginTop: 40,
    marginHorizontal: 30,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  drawerItemTitle: {
    fontSize: 16,
    fontFamily: "Nunito-Bold",
    marginLeft: 10,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
  premiumTitle: {
    fontSize: 24,
    fontFamily: "Nunito-Black",
    textAlign: "center",
    marginBottom: 20,
  },
});
