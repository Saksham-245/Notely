import React from "react";
import { useRouter } from "expo-router";
import NoteScreen from "../../../src/components/NoteScreen";
import { createNote } from "../../../src/api/http";
import { showMessage } from "react-native-flash-message";
import { Keyboard } from "react-native";
import { useUserInfo } from "../../../src/hooks/useUserInfo";

export default function CreateNote() {
  const router = useRouter();

  const handleSubmit = async (values) => {
    Keyboard.dismiss();
    try {
      const response = await createNote(
        values.title,
        values.content,
        useUserInfo?.id
      );
      if (response?.s) {
        // Navigate back first
        router.back();
        
        // Then update params and show message
        setTimeout(() => {
          router.setParams({
            createdNoteId: response?.note?.id,
            timestamp: Date.now(),
          });
          showMessage({
            message: "Note created successfully",
            type: "success",
          });
        }, 100);
      }
    } catch (error) {
      showMessage({
        message: error?.message || "Failed to create note",
        type: "danger",
      });
    }
  };

  return (
    <NoteScreen
      title="Create Note"
      onSubmit={handleSubmit}
      submitButtonText="Create Note"
      resetOnUnmount={true}
    />
  );
}
