import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { FeedPostCard } from '../components/FeedPostCard';
import { useAppStore } from '../hooks/useAppStore';

export const FeedScreen = () => {
  const { feedPosts, likePost, addComment } = useAppStore();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Feed</Text>
      {feedPosts.length === 0 ? <Text style={styles.empty}>No posts yet. Post a stamp from Stamp Detail.</Text> : null}
      {feedPosts.map((post) => (
        <FeedPostCard key={post.id} post={post} onLike={() => likePost(post.id)} onComment={(t) => addComment(post.id, t)} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#030712' },
  content: { padding: 16 },
  title: { color: 'white', fontSize: 28, fontWeight: '800', marginBottom: 12 },
  empty: { color: '#9ca3af' },
});
