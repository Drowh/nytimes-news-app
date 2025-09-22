import { useSelector } from 'react-redux';
import { Layout, NewsList } from '@/components';
import { useNewsLoader, useInfiniteScroll } from '@/hooks';
import type { RootState } from '@/store';

function App() {
  const { hasMoreData, isLoadingMore } = useSelector((state: RootState) => state.news);
  const { loadMoreNews } = useNewsLoader();

  useInfiniteScroll({
    hasMore: hasMoreData,
    isLoading: isLoadingMore,
    onLoadMore: loadMoreNews,
  });

  return (
    <Layout>
      <NewsList />
    </Layout>
  );
}

export default App;
