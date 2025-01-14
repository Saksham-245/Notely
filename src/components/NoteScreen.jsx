import React, { useEffect, useState } from "react";
import { Keyboard, Platform, StyleSheet, Text } from "react-native";
import MainContainer from "./MainContainer";
import CustomAppBar from "./CustomAppBar";
import { Appbar } from "react-native-paper";
import { useRouter, useNavigation } from "expo-router";
import NoteForm from "./NoteForm";
import { showMessage } from "react-native-flash-message";
import { deleteNote } from "../api/http";

export default function NoteScreen({
  title,
  initialValues = { title: "", content: "" },
  onSubmit,
  submitButtonText,
  isLoading,
  error,
  id,
  resetOnUnmount = false,
}) {
  const router = useRouter();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const formRef = React.useRef(null);

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
      return <Text style={styles.loadingText}>Loading...</Text>;
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
          });
        }, 100);
      }
    } catch (error) {
      showMessage({
        message: error?.message || "Failed to delete note",
        type: "danger",
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
              formRef.current?.resetForm();
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
