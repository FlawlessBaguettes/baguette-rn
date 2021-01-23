import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ErrorScreen from "./ErrorScreen";
import PostCard from "./PostCard";

import { GET_POSTS_ENDPOINT, GET_REPLIES_ENDPOINT } from "../api/constants";

import useFetch from "../utils/useFetch";

const ListPostsScreen = ({ route, navigation }) => {
  const url =
    route.params === undefined
      ? GET_POSTS_ENDPOINT
      : GET_REPLIES_ENDPOINT + "/" + route.params.postId;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [posts, setPosts] = useState(null);
  const [response, isLoading, hasError, refetch] = useFetch(url);

  useEffect(() => {
    updatePosts();
  });

  const onRefresh = async () => {
    await setIsRefreshing(true);
    await refetch();
    await setIsRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <PostCard
      contentPostedTime={item.content.posted_time}
      contentUrl={item.content.url}
      id={item.id}
      navigation={navigation}
      numberOfReplies={item.number_of_replies}
      title={item.title}
      userFullName={item.user.full_name}
    />
  );

  const updatePosts = () => {
    if (response) {
      const p = response.posts
        ? response.posts.posts
        : response.replies
        ? response.replies.replies
        : [];

      setPosts(p);
    }
  };

  if (hasError) {
    return <ErrorScreen onRefresh={onRefresh} />;
  }

  if (isLoading || !response) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        initialNumToRender={3} // items to render in initial batch
        keyExtractor={(item) => item.id}
        maxToRenderPerBatch={3} // number of additional items rendered on every scroll
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        removeClippedSubviews={true} // when set to true it will unmount components off the viewport
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        updateCellsBatchingPeriod={50} // delay in ms between batch renders, left as default
        windowSize={11} // unit here is 1 viewport height
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default ListPostsScreen;
