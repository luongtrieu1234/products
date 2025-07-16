import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type UseInfiniteScrollProps = {
  hasNextPage: boolean;
  isLoading: boolean;
  isSearchMode: boolean;
  fetchNextPage: () => void;
};

export const useInfiniteScroll = ({
  hasNextPage,
  isLoading,
  isSearchMode,
  fetchNextPage,
}: UseInfiniteScrollProps) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isSearchMode && !isLoading) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isSearchMode, isLoading]);

  return { ref };
};