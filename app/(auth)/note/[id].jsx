import React from "react";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { getNoteById, updateNote } from "../../../src/api/http";
import NoteScreen from "../../../src/components/NoteScreen";
import { showMessage } from "react-native-flash-message";

export default function ViewNote() {
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchNote = async () => {
    setIsLoading(true);
    try {
      const response = await getNoteById(id);
      setNote(response?.data?.note);
      setError(null);
    } catch (error) {
      console.error("Error fetching note:", error);
      setError("Failed to load note");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNote();
    }, [id])
  );

  const handleSubmit = async (values) => {
    try {
      const response = await updateNote(id, values.title, values.content);
      if (response?.s) {
        // Navigate back
        router.back();

        // Then update params and show message
        setTimeout(() => {
          router.setParams({
            createdNoteId: response?.data?.id,
            timestamp: Date.now(),
          });

          showMessage({
            message: response?.message,
            type: "success",
            icon: "success",
            duration: 3000,
          });
        }, 100);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <NoteScreen
      title="Edit Note"
      initialValues={
        note
          ? {
              title: note?.title,
              content: note?.content,
            }
          : {}
      }
      onSubmit={handleSubmit}
      id={id}
      submitButtonText="Update Note"
      isLoading={isLoading}
      error={error}
    />
  );
}
