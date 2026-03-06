import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
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
          placeholder="Add mock comment"
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
  card: { backgroundColor: '#111827', borderRadius: 14, padding: 14, marginBottom: 12 },
  text: { color: 'white', fontWeight: '600', fontSize: 16 },
  meta: { color: '#9ca3af', fontSize: 12, marginTop: 6 },
  row: { flexDirection: 'row', marginTop: 10, gap: 8 },
  commentRow: { flexDirection: 'row', marginTop: 10, gap: 8 },
  input: { flex: 1, backgroundColor: '#1f2937', color: 'white', borderRadius: 10, paddingHorizontal: 10 },
  btn: { backgroundColor: '#374151', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8 },
  btnText: { color: 'white', fontWeight: '600' },
});
