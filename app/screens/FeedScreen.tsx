import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FeedPostCard } from '../components/FeedPostCard';
import { useAppStore } from '../hooks/useAppStore';
import { theme } from '../theme';

export const FeedScreen = () => {
  const { feedPosts, likePost, addComment, createTripRecapPost, stamps, hydrated } = useAppStore();

  if (!hydrated) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
        <Text style={styles.loadingText}>Loading feed...</Text>
      </View>
    );
  }

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

      {feedPosts.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No posts yet</Text>
          <Text style={styles.empty}>Post a stamp from Stamp Detail or create a trip recap after 2+ unlocked stamps.</Text>
        </View>
      ) : null}
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
  emptyCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 12,
    marginBottom: 12,
  },
  emptyTitle: { color: theme.colors.text, fontSize: 16, fontWeight: '800', marginBottom: 6 },
  empty: { color: '#9ca3af' },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.bg,
    gap: 10,
  },
  loadingText: { color: theme.colors.textMuted, fontWeight: '600' },
});
