import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { FeedPostCard } from '../components/FeedPostCard';
import { useAppStore } from '../hooks/useAppStore';
import { theme } from '../theme';

export const FeedScreen = () => {
  const { feedPosts, likePost, addComment } = useAppStore();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Feed</Text>
      <Text style={styles.subtitle}>Share your latest stamp unlocks.</Text>
      {feedPosts.length === 0 ? <Text style={styles.empty}>No posts yet. Post a stamp from Stamp Detail.</Text> : null}
      {feedPosts.map((post) => (
        <FeedPostCard key={post.id} post={post} onLike={() => likePost(post.id)} onComment={(t) => addComment(post.id, t)} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.bg },
  content: { padding: 16 },
  title: { color: 'white', fontSize: 30, fontWeight: '800' },
  subtitle: { color: '#94a3b8', marginTop: 4, marginBottom: 12 },
  empty: { color: '#9ca3af' },
});
