import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { FeedPost } from '../types';
import { theme } from '../theme';

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

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{post.text}</Text>
      <Text style={styles.meta}>{new Date(post.createdAt).toLocaleString()}</Text>

      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={onLike}>
          <Text style={styles.btnText}>❤️ {post.likes}</Text>
        </Pressable>
      </View>

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
    </View>
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
  text: { color: 'white', fontWeight: '600', fontSize: 16, lineHeight: 21 },
  meta: { color: '#9ca3af', fontSize: 12, marginTop: 6 },
  row: { flexDirection: 'row', marginTop: 10, gap: 8 },
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
