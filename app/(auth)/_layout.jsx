import { Drawer } from "expo-router/drawer";
import React, { useCallback, useEffect, useRef } from "react";
import { AppColors } from "../../src/colors/AppColors";
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import PremiumIcon from "../../src/icons/premium_icon";
import EditIcon from "../../src/icons/edit_icon";
import LogoutIcon from "../../src/icons/logout_icon";
import { useAuth } from "../../src/context/AuthContext";
import { useBottomSheet } from "../../src/context/BottomSheetContext";

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
  const { userInfo, isLoading } = useAuth();
  const router = useRouter();
  const { openPremiumSheet } = useBottomSheet();
  const drawerRef = useRef(null);
  
  const handlePremiumPress = () => {
    // Use router to close drawer
    router.back();
    setTimeout(() => {
      openPremiumSheet();
    }, 300);
  };

  // Show loading state while initializing
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.buttonColor} />
      </View>
    );
  }

  // Handle case when userInfo is not available
  if (!userInfo) {
    return null;
  }

  const drawerItems = [
    {
      title: "Buy Premium",
      icon: <PremiumIcon />,
      onPress: handlePremiumPress,
    },
    {
      title: "Edit Profile",
      icon: <EditIcon />,
      onPress: () => router.push("/edit-profile"),
    },
    {
      title: "Logout",
      icon: <LogoutIcon />,
      onPress: () => {/* handle logout */},
    },
  ];

  useEffect(() => {
    openPremiumSheet();
  },[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Image
          source={{ 
            uri: userInfo?.profile_picture 
          }}
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
            activeOpacity={0.7}
          >
            <View style={styles.drawerItem}>
              {item.icon}
              <Text style={styles.drawerItemTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.scaffoldBackgroundColor,
  },
});
