import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../theme';
import { FeedPost } from '../types';

export const FeedPostCard = ({
  post,
  onLike,
  onComment,
}: {
  post: FeedPost;
  onLike: () => void;
  onComment: (text: string) => void;
}) => {
  const [text, setText] = useState('');
  const appear = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appear, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [appear]);

  const postTypeLabel =
    post.type === 'trip_recap' ? 'Trip Recap' : post.type === 'milestone' ? 'Milestone' : 'Stamp Unlock';

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: appear,
          transform: [
            {
              translateY: appear.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Text style={styles.typeBadge}>{postTypeLabel}</Text>
        <Text style={styles.meta}>{new Date(post.createdAt).toLocaleString()}</Text>
      </View>

      <Text style={styles.text}>{post.text}</Text>

      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={onLike}>
          <Text style={styles.btnText}>❤️ {post.likes}</Text>
        </Pressable>
        <Text style={styles.commentCount}>{post.comments.length} comments</Text>
      </View>

      {post.comments.length > 0 ? (
        <View style={styles.commentsWrap}>
          {post.comments.slice(-3).map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.commentRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add comment"
          placeholderTextColor="#6b7280"
          style={styles.input}
        />
        <Pressable
          style={styles.btn}
          onPress={() => {
            onComment(text);
            setText('');
          }}
        >
          <Text style={styles.btnText}>Post</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
    marginBottom: 12,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  typeBadge: {
    backgroundColor: '#e2ecff',
    color: '#1d4ed8',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontWeight: '800',
    fontSize: 11,
  },
  text: { color: theme.colors.text, fontWeight: '600', fontSize: 16, lineHeight: 21, marginTop: 8 },
  meta: { color: '#9ca3af', fontSize: 12 },
  row: { flexDirection: 'row', marginTop: 10, gap: 8, alignItems: 'center' },
  commentCount: { color: theme.colors.textMuted, fontSize: 12, fontWeight: '600' },
  commentsWrap: { marginTop: 10, gap: 6 },
  commentItem: {
    backgroundColor: '#f8fbff',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  commentText: { color: theme.colors.textMuted },
  commentRow: { flexDirection: 'row', marginTop: 10, gap: 8 },
  input: {
    flex: 1,
    backgroundColor: '#111827',
    color: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  btn: {
    backgroundColor: '#1f2937',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btnText: { color: 'white', fontWeight: '700' },
});
