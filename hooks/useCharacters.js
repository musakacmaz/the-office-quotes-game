import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useCharacters() {
  const { data, error } = useSWR("/api/characters", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    characters: data,
    isLoading: !error && !data,
    isError: error,
  };
}
