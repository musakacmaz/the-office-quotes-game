import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useQuote() {
  const { data, error } = useSWR("/api/quote", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    quote: data,
    isLoading: !error && !data,
    isError: error,
  };
}
