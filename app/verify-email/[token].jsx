import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { verifyEmail } from '../../src/api/http';
import { useAuth } from '../../src/context/AuthContext';
import { showMessage } from "react-native-flash-message";
import LoadingScreen from '../../src/components/LoadingScreen';

export default function VerifyEmail() {
  const { token } = useLocalSearchParams();
  const router = useRouter();
  const { setLogin } = useAuth();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const response = await verifyEmail(token);

        if (response?.s) {
          // Structure the user data properly
          const userInfo = {
            id: response?.data?.user?.id,
            username: response?.data?.user?.username,
            email: response?.data?.user?.email,
            profileImageUrl: response?.data?.user?.profileImageUrl,
            token: response?.data?.token,
            expiresIn: response?.data?.expiresIn
          };

          // Set login with the complete user info
          const loginSuccess = await setLogin(userInfo);

          if (loginSuccess) {
            showMessage({
              message: response.message || "Email verified successfully",
              type: "success",
              icon: "success",
              duration: 3000,
            });

            // Navigate to home after successful login
            router.replace("/(auth)/home");
          } else {
            throw new Error("Failed to set login information");
          }
        } else {
          throw new Error(response?.message || "Verification failed");
        }
      } catch (error) {
        console.error('Verification error:', error);
        showMessage({
          message: error?.message || "Email verification failed",
          type: "danger",
          icon: "danger",
          duration: 3000,
        });
        router.replace("/login");
      }
    };

    if (token) {
      handleVerification();
    }
  }, [token]);

  return <LoadingScreen />;
}
