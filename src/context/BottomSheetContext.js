import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
  useMemo,
} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AppColors } from "../colors/AppColors";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import CloseIcon from "../icons/close_icon";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckIcon from "../icons/check_icon";
import CustomOrangeButton from "../components/CustomOrangeButton";
import TextButton from "../components/TextButton";

const BottomSheetContext = createContext(null);

export function BottomSheetProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(1000);

  const pricingPlans = {
    annual: {
      price: 79.99,
      period: 'year',
      label: 'Annual'
    },
    monthly: {
      price: 7.99,
      period: 'month',
      label: 'Monthly'
    }
  };

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const openPremiumSheet = useCallback(() => {
    setIsOpen(true);
    opacity.value = withTiming(1, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
    translateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
      mass: 0.5,
      velocity: 8,
    });
  }, []);

  const closePremiumSheet = useCallback(() => {
    opacity.value = withTiming(0, {
      duration: 200,
      easing: Easing.in(Easing.ease),
    });
    translateY.value = withSpring(
      300,
      {
        damping: 15,
        stiffness: 150,
        mass: 0.5,
        velocity: 8,
      },
      () => {
        runOnJS(setIsOpen)(false);
      }
    );
  }, []);

  const points = [
    {
      title: "Save unlimited notes to a single project",
    },
    {
      title: "Create unlimited projects and teams",
    },
    {
      title: "Daily backups to keep your data safe",
    },
  ];

  return (
    <BottomSheetContext.Provider
      value={{ openPremiumSheet, closePremiumSheet }}
    >
      {children}
      {isOpen && (
        <Animated.View style={[styles.overlay, overlayStyle]}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={closePremiumSheet}
          />
          <Animated.View style={[styles.container, containerStyle]}>
            <SafeAreaView style={{ flex: 1, marginTop: -30 }}>
              <View style={styles.contentContainer}>
                <View style={styles.header}>
                  <Text style={styles.title}>Notely Premium</Text>
                  <TouchableOpacity
                    onPress={closePremiumSheet}
                    activeOpacity={1}
                    style={styles.closeButton}
                  >
                    <CloseIcon />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 20,
                    flexDirection: "column",
                  }}
                >
                  <Image
                    source={require("../../assets/images/subscription.png")}
                  />
                  <View style={{ marginTop: 20 }}>
                    <Text style={styles.descriptionText}>
                      Start Using Notely with Premium Benefits
                    </Text>
                    <View style={{ marginTop: 30 }}>
                      {points.map((point, index) => (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 20,
                            gap: 10,
                          }}
                          key={index}
                        >
                          <CheckIcon style={{ marginTop: 6 }} />
                          <Text style={styles.pointText}>{point.title}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 50 }}>
                  <View style={styles.pricingContainer}>
                    {Object.entries(pricingPlans).map(([key, plan]) => (
                      <TouchableOpacity
                        key={key}
                        activeOpacity={1}
                        style={[
                          styles.pricingOption,
                          selectedPlan === key && styles.selectedPricingOption
                        ]}
                        onPress={() => setSelectedPlan(key)}
                      >
                        <Text style={[
                          styles.pricingLabel,
                          selectedPlan === key && styles.selectedPricingLabel
                        ]}>
                          {plan.label}
                        </Text>
                        <Text style={[
                          styles.pricingPrice,
                          selectedPlan === key && styles.selectedPricingLabel
                        ]}>
                          ${plan.price}
                        </Text>
                        <Text style={[
                          styles.pricingPeriod,
                          selectedPlan === key && styles.selectedPricingLabel
                        ]}>
                          per {plan.period}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <CustomOrangeButton
                  title="Subscribe"
                //   onPress={() => router.push("/signup")}
                />
                <TextButton
                //   onPress={() => router.push("/login")}
                  title={"Restore Purchase"}
                />
              </View>
            </SafeAreaView>
          </Animated.View>
        </Animated.View>
      )}
    </BottomSheetContext.Provider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
    position: "relative",
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.scaffoldBackgroundColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  contentContainer: {
    padding: 24,
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontFamily: "Nunito-Black",
    flex: 1,
    textAlign: "center",
    color: AppColors.textColor,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: "100%",
  },
  descriptionText: {
    fontFamily: "Nunito-Black",
    fontSize: 24,
    color: AppColors.textColor,
    textAlign: "center",
  },
  pointText: {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    color: AppColors.subTextColor,
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 60,
  },
  pricingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  pricingOption: {
    flex: 1,
    padding: 16,
    paddingVertical: 30,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: 'transparent',
  },
  selectedPricingOption: {
    borderColor: '#F47F6B',
    backgroundColor: '#fff',
    borderWidth: 6,
  },
  pricingLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: AppColors.subTextColor,
    marginBottom: 8,
  },
  pricingPrice: {
    fontFamily: 'Nunito-Black',
    fontSize: 28,
    color: AppColors.textColor,
    marginBottom: 4,
  },
  pricingPeriod: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 14,
    color: AppColors.subTextColor,
  },
  selectedPricingLabel: {
    color: AppColors.primaryColor,
  },
});

export const useBottomSheet = () => useContext(BottomSheetContext);
