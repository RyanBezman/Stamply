import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { FeedPostCard } from '../components/FeedPostCard';
import { useAppStore } from '../hooks/useAppStore';
import { theme } from '../theme';

export const FeedScreen = () => {
  const { feedPosts, likePost, addComment, createTripRecapPost, stamps } = useAppStore();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Feed</Text>

      <Pressable
        style={[styles.recapButton, stamps.filter((s) => s.status === 'ready').length < 2 && styles.recapDisabled]}
        disabled={stamps.filter((s) => s.status === 'ready').length < 2}
        onPress={() => {
          createTripRecapPost().catch(() => undefined);
        }}
      >
        <Text style={styles.recapText}>Create Trip Recap</Text>
      </Pressable>

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
  title: { color: theme.colors.text, fontSize: 28, fontWeight: '800', marginBottom: 12 },
  recapButton: {
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    paddingVertical: 10,
  },
  recapDisabled: { opacity: 0.45 },
  recapText: { color: '#111827', fontWeight: '800' },
  empty: { color: '#9ca3af' },
});
