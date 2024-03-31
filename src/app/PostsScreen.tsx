import { ActivityIndicator, Text, FlatList, Button, Alert } from 'react-native';
import PostListItem from '../../src/components/PostListItem';
import { useCreatePost, usePosts } from '../../src/hooks/posts';

export default function PostsScreen() {
  const { posts, isLoading, error, mutate } = usePosts();
  const { trigger, newPost } = useCreatePost();
  const runMutation = () => {
    mutate();
  };

  const onCreatePost = async () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    try {
      await trigger(newPost, {
        optimisticData: (current) => {
          return [newPost, ...current];
        },
        revalidate: false,
        rollbackOnError: (error) => {
          return true;
        },
      });
    } catch (err) {
      Alert.alert('Failed to create the post');
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch data. {error.message}</Text>;
  }

  return (
    <>
      <Button title='Refresh' onPress={runMutation} />
      <Button title='Create Post' onPress={onCreatePost} />
      <FlatList
        data={posts}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <PostListItem post={item} />}
      />
    </>
  );
}
