import React, { useRef } from 'react';
import { useRouter } from "expo-router";
import NoteScreen from "../../../src/components/NoteScreen";
import { createNote } from "../../../src/api/http";
import { showMessage } from "react-native-flash-message";
import { Keyboard } from "react-native";

export default function CreateNote() {
  const router = useRouter();
  const formRef = useRef(null);

  const handleSubmit = async (values) => {
    Keyboard.dismiss();
    try {
      const response = await createNote(values.title, values.content);
      if (response?.s) {
        const noteId = response?.data?.note?.id || response?.note?.id;

        showMessage({
          message: "Note created successfully",
          type: "success",
          icon: "success",
          duration: 3000,
        });

        // Reset form
        if (formRef.current) {
          formRef.current.resetForm();
        }

        // Update params and navigate back
        await router.replace({
          pathname: "/home",
          params: {
            createdNoteId: noteId,
            timestamp: Date.now()
          }
        });
      }
    } catch (error) {
      showMessage({
        message: error?.message || "Failed to create note",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    }
  };

  return (
    <NoteScreen
      title="Create Note"
      onSubmit={handleSubmit}
      submitButtonText="Create Note"
      resetOnUnmount={true}
      formRef={formRef}
    />
  );
}
