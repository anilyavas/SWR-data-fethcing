import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { gqlFetcher } from '../utils/fetcher';

export function usePosts() {
  const { data, isLoading, error, mutate } = useSWR(
    'https://jsonplaceholder.typicode.com/posts'
  );
  return {
    posts: data,
    isLoading,
    error,
    mutate,
  };
}
export function useGqlPosts() {
  const query = `
query myQuery {
  myQuery {
    body
    title
    userId
  }
}
`;
  const { data, isLoading, error, mutate } = useSWR(query, gqlFetcher);

  return {
    posts: data?.myQuery,
    isLoading,
    error,
    mutate,
  };
}

type NewPost = {
  title: string;
  body: string;
  userId: number;
};

// Creating a post

export const createPost = async (url, newPost: NewPost) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: {
      'Content-type': 'applicaiton/json; charset=UTF-8',
    },
  });
  return response.json();
};

export const useCreatePost = () => {
  const { trigger, data, isMutating, error } = useSWRMutation(
    'https://jsonplaceholder.typicode.com/posts',
    createPost
  );

  return {
    trigger,
    newPost: data,
    isMutating,
    error,
  };
};
