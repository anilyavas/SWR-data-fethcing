import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, AppState } from 'react-native';
import PostsScreen from './src/app/PostsScreen';
import GraphQLPostScreen from './src/app/GraphQLPostScreen';
import { SWRConfig } from 'swr';
import { fetcher } from './src/utils/fetcher';
import { SWRConfiguration } from './src/utils/SWRConfiguration';

export default function App() {
  return (
    <SWRConfig value={SWRConfiguration}>
      <SafeAreaView style={styles.container}>
        <PostsScreen />
        <StatusBar style='auto' />
      </SafeAreaView>
    </SWRConfig>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
