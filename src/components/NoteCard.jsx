import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AppColors } from "../colors/AppColors";

export default function NoteCard({ item, onPress, index = 0 }) {
  const isLarge = typeof index === 'number' ? index % 3 === 0 : false;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        isLarge ? styles.largeCard : styles.smallCard,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View style={styles.contentContainer}>
        <Text
          style={[styles.title, isLarge && styles.largeTitle]}
          numberOfLines={isLarge ? 3 : 2}
        >
          {item.title}
        </Text>
        <Text style={styles.content} numberOfLines={isLarge ? 8 : 3}>
          {item.content}
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.date}>
          {new Date(item.updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 8,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flex: 1,
  },
  smallCard: {
    minHeight: 150,
  },
  largeCard: {
    minHeight: 250,
  },
  contentContainer: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "Nunito-Black",
    color: AppColors.textColor,
    marginBottom: 8,
  },
  largeTitle: {
    fontSize: 18,
  },
  content: {
    fontSize: 14,
    fontFamily: "Nunito-Bold",
    color: AppColors.subTextColor,
    lineHeight: 20,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    padding: 12,
  },
  date: {
    fontSize: 12,
    fontFamily: "Nunito-Bold",
    color: AppColors.subTextColor,
  },
});
