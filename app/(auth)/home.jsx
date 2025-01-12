import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import MainContainer from "../../src/components/MainContainer";
import CustomAppBar from "../../src/components/CustomAppBar";
import { Appbar, FAB, TextInput } from "react-native-paper";
import DrawerIcon from "../../src/icons/drawer_icon";
import SearchIcon from "../../src/icons/search_icon";
import { useEffect, useState, useRef } from "react";
import { AppColors } from "../../src/colors/AppColors";
import CustomOrangeButton from "../../src/components/CustomOrangeButton";
import TextButton from "../../src/components/TextButton";
import { getAllNotes, searchNotes } from "../../src/api/http";
import { MasonryFlashList } from "@shopify/flash-list";
import NoteCard from "../../src/components/NoteCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useUserInfo } from "../../src/hooks/useUserInfo";

export default function Home() {
  const [openSearch, setOpenSearch] = useState(false);
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isFocused, setIsFocused] = useState(true);

  const router = useRouter();
  const { userInfo } = useUserInfo();

  const [notes, setNotes] = useState([]);
  const deletedNoteIdsRef = useRef(new Set());
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const params = useLocalSearchParams();

  const fetchNotes = async (isLoadingMore = false, pageToFetch = 1) => {
    if (!userInfo?.id) return;

    const loadingState = isLoadingMore ? setIsLoadingMore : setIsLoading;
    loadingState(true);

    try {
      const response = await getAllNotes(pageToFetch);
      const newNotes = response?.data || [];
      setTotalPages(response?.last_page || 1);
      setHasMore(pageToFetch < (response?.last_page || 1));

      const filteredNotes = newNotes.filter(
        (note) => !deletedNoteIdsRef.current.has(note.id.toString())
      );

      setNotes((prev) => {
        if (isLoadingMore) {
          return [...prev, ...filteredNotes];
        }
        return filteredNotes;
      });
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      loadingState(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsFocused(true);
      if (notes.length === 0) {
        setPage(1);
        setHasMore(true);
        setCanLoadMore(false);
        setIsLoadingMore(false);
        fetchNotes(false, 1);
      }
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {
      setIsFocused(false);
    });

    return () => {
      unsubscribe();
      unsubscribeBlur();
    };
  }, [navigation, notes.length]);

  const loadMore = async () => {
    if (
      !isFocused ||
      !canLoadMore ||
      isLoadingMore ||
      !hasMore ||
      isRefreshing ||
      isLoading
    )
      return;

    const nextPage = page + 1;
    if (nextPage > totalPages) {
      setHasMore(false);
      return;
    }

    setIsLoadingMore(true);

    try {
      await fetchNotes(true, nextPage);
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more notes:", error);
    } finally {
      setIsLoadingMore(false);
      setCanLoadMore(false);
    }
  };

  useEffect(() => {
    if (userInfo?.id) {
      fetchNotes(false, 1);
    }
  }, [userInfo?.id]);

  useEffect(() => {
    if (params?.deletedNoteId) {
      const noteId = params.deletedNoteId.toString();

      deletedNoteIdsRef.current.add(noteId);

      setNotes((prevNotes) => {
        const filteredNotes = prevNotes.filter(
          (note) => note.id.toString() !== noteId
        );
        return filteredNotes;
      });

      setRefreshKey((prev) => prev + 1);

      setTimeout(() => {
        router.setParams({ deletedNoteId: null });
      }, 100);
    }
  }, [params?.deletedNoteId]);

  useEffect(() => {
    if (params?.createdNoteId) {
      const fetchLatestNote = async () => {
        if (!userInfo?.id) return;

        try {
          const response = await getAllNotes(1);
          const newNotes = response?.data || [];

          const newNote = newNotes.find(
            (note) => note.id.toString() === params.createdNoteId.toString()
          );

          if (newNote) {
            setNotes((prevNotes) => {
              const filteredNotes = prevNotes.filter(
                (note) => note.id.toString() !== params.createdNoteId.toString()
              );
              return [newNote, ...filteredNotes];
            });
            setRefreshKey((prev) => prev + 1);
          }
        } catch (error) {
          console.error("Error fetching new note:", error);
        }
      };

      fetchLatestNote();

      setTimeout(() => {
        router.setParams({ createdNoteId: null });
      }, 100);
    }
  }, [params?.createdNoteId]);

  const renderItem = ({ item }) => (
    <NoteCard
      item={item}
      onPress={() => {
        router.push({
          pathname: "/note/[id]",
          params: { id: item.id },
        });
      }}
    />
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="small" color={AppColors.buttonColor} />
      </View>
    );
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setIsLoading(true);
      setHasMore(true);
      setCanLoadMore(false);
      setNotes([]);
      setIsLoadingMore(false);
      setPage(1);
      setTotalPages(1);
      deletedNoteIdsRef.current.clear();

      await new Promise((resolve) => setTimeout(resolve, 100));

      await fetchNotes(false, 1);
    } catch (error) {
      console.error("Error during refresh:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      await fetchNotes(false, 1);
      return;
    }

    setIsLoading(true);
    try {
      const response = await searchNotes(searchQuery);
      if (response?.notes) {
        setNotes(response.notes.data || []);
        setTotalPages(response.notes?.last_page || 1);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error searching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <MainContainer mainContainerStyle={{ flex: 1 }}>
          {!openSearch && (
            <CustomAppBar
              title={notes.length > 0 ? "Recent Notes" : "All Notes"}
              titleStyle={{ fontSize: 16, fontFamily: "Nunito-Black" }}
              leftContent={
                <Appbar.Action
                  icon={DrawerIcon}
                  rippleColor={"transparent"}
                  style={{ marginTop: Platform.OS === "ios" ? 20 : 16 }}
                  onPress={() => navigation.toggleDrawer()}
                  size={Platform.OS === "ios" ? 30 : 28}
                />
              }
              rightContent={
                <Appbar.Action
                  icon={SearchIcon}
                  rippleColor={"transparent"}
                  onPress={() => {
                    setOpenSearch(true);
                  }}
                />
              }
            />
          )}
          {openSearch && (
            <CustomAppBar
              title="Search"
              showContent={true}
              appContent={
                <View style={{ width: "100%", marginTop: -10 }}>
                  <TextInput
                    placeholder="Enter a keyword"
                    mode="outlined"
                    style={styles.searchInput}
                    cursorColor="#000"
                    contentStyle={styles.searchInputText}
                    onChangeText={(text) => {
                      setSearchQuery(text);
                      const timeoutId = setTimeout(() => {
                        handleSearch();
                      }, 500);
                      return () => clearTimeout(timeoutId);
                    }}
                    right={
                      <TextInput.Icon
                        icon="close"
                        style={{ marginTop: 30 }}
                        color={"#000"}
                        rippleColor={"transparent"}
                        onPress={() => {
                          if (searchQuery.trim()) {
                            setOpenSearch(false);
                            setSearchQuery("");
                            setNotes([]);
                            fetchNotes(false, 1);
                          } else {
                            setOpenSearch(false);
                          }
                        }}
                      />
                    }
                    outlineColor="transparent"
                    activeOutlineColor="transparent"
                  />
                </View>
              }
              leftContent={null}
              rightContent={null}
            />
          )}
          {isLoading && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                size="large"
                color={AppColors.buttonColor}
              />
            </View>
          )}
          {!isLoading && notes.length > 0 && (
            <MasonryFlashList
              data={notes}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
              estimatedItemSize={6}
              keyExtractor={(item) => `note-${item.id}-${refreshKey}`}
              extraData={[notes.length, refreshKey]}
              disableAutoLayout={true}
              onEndReached={() => {
                if (
                  isFocused &&
                  !isRefreshing &&
                  !isLoading &&
                  !isLoadingMore
                ) {
                  setCanLoadMore(true);
                }
              }}
              onEndReachedThreshold={0.2}
              onMomentumScrollEnd={() => {
                if (
                  isFocused &&
                  canLoadMore &&
                  !isRefreshing &&
                  !isLoading &&
                  !isLoadingMore
                ) {
                  loadMore();
                }
              }}
              ListFooterComponent={renderFooter}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                />
              }
            />
          )}
          {!isLoading && !searchQuery && notes.length === 0 && (
            <>
              <View style={styles.noData}>
                {/* No Data */}
                <Image source={require("../../assets/images/no_data.png")} />
                <View style={{ height: 25 }} />
                <View style={styles.textContainer}>
                  <Text style={styles.textTitle}>Create Your First Note</Text>
                  <Text style={styles.textSubtitle}>
                    Add a note about anything (your thoughts on climate change,
                    or your history essay) and share it with the world.
                  </Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <CustomOrangeButton
                  title="Create Note"
                  onPress={() => router.push("/create-note")}
                  buttonStyle={{ textTransform: "capitalize" }}
                />
                <TextButton
                  onPress={() => router.push("/import-notes")}
                  title={"Import Notes"}
                />
              </View>
            </>
          )}
          {!isLoading && searchQuery && notes.length === 0 && (
            <View style={styles.noData}>
              <Text style={styles.noDataText}>No results found</Text>
            </View>
          )}
          {notes.length > 0 && (
            <FAB
              icon="plus"
              color="#fff"
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                backgroundColor: AppColors.buttonColor,
              }}
              onPress={() => router.push("/create-note")}
            />
          )}
        </MainContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    backgroundColor: AppColors.scaffoldBackgroundColor,
    color: "#000",
    fontFamily: "Nunito-Black",
    fontSize: 16,
  },
  searchInputText: {
    fontFamily: "Nunito-Black",
    fontSize: 16,
    color: "#000",
  },
  noData: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  noDataText: {
    fontFamily: "Nunito-Black",
    fontSize: 20,
    color: "#000",
    textAlign: "center",
  },
  textContainer: {
    paddingHorizontal: 40,
  },
  textTitle: {
    fontFamily: "Nunito-Black",
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  textSubtitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 70,
    paddingBottom: 20,
    marginTop: "auto",
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
});
