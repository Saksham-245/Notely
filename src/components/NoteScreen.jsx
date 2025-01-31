import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MainContainer from "./MainContainer";
import CustomAppBar from "./CustomAppBar";
import { Appbar } from "react-native-paper";
import { useRouter, useNavigation } from "expo-router";
import NoteForm from "./NoteForm";
import { showMessage } from "react-native-flash-message";
import { deleteNote } from "../api/http";
import { AppColors } from "../colors/AppColors";

export default function NoteScreen({
  title,
  initialValues = { title: "", content: "" },
  onSubmit,
  submitButtonText,
  isLoading,
  error,
  id,
  resetOnUnmount = false,
  formRef,
}) {
  const router = useRouter();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: AppColors.scaffoldBackgroundColor,
            zIndex: 1,
          }}
        >
          <ActivityIndicator size="large" color={AppColors.buttonColor} />
        </View>
      );
    }
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }
    return (
      <NoteForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        id={id}
        isKeyboardVisible={isKeyboardVisible}
        submitButtonText={submitButtonText}
        formRef={formRef}
        resetOnUnmount={resetOnUnmount}
      />
    );
  };

  const handleDelete = async () => {
    try {
      const response = await deleteNote(id);
      if (response) {
        // Navigate back first
        router.back();

        // Then update params with a slight delay
        setTimeout(() => {
          router.setParams({ deletedNoteId: id });

          // Show success message
          showMessage({
            message: response?.message || "Note deleted successfully",
            type: "success",
            icon: "success",
            duration: 3000,
          });
        }, 100);
      }
    } catch (error) {
      showMessage({
        message: error?.message || "Failed to delete note",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    }
  };

  return (
    <MainContainer>
      <CustomAppBar
        title={title}
        titleStyle={styles.titleStyle}
        leftContent={
          <Appbar.Action
            icon={Platform.OS === "ios" ? "chevron-left" : "arrow-left"}
            color="#000"
            rippleColor={"transparent"}
            onPress={() => {
              // Reset form when navigating back
              if (resetOnUnmount && formRef?.current) {
                formRef.current.resetForm();
              }
              router.back();
            }}
            size={Platform.OS === "ios" ? 30 : 26}
          />
        }
        rightContent={
          <>
            {!id && (
              <Appbar.Action
                icon=""
                size={36}
                rippleColor="transparent"
                color="transparent"
                disabled={true}
              />
            )}
            {id && (
              <Appbar.Action
                icon="delete"
                color="#000"
                rippleColor={"transparent"}
                onPress={() => {
                  if (id) {
                    handleDelete();
                  }
                }}
                size={24}
              />
            )}
          </>
        }
      />
      {renderContent()}
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 16,
    fontFamily: "Nunito-Black",
  },
  loadingText: {
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
