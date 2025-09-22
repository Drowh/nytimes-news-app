import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { ArticleCard } from './ArticleCard';
import { DateSeparator } from './DateSeparator';
import { LoadingSpinner } from './LoadingSpinner';

export const NewsList = () => {
  const { groupedArticles, isLoadingMore } = useSelector((state: RootState) => state.news);
  const { isLoading } = useSelector((state: RootState) => state.ui);

  if (isLoading && Object.keys(groupedArticles).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const sortedDates = Object.keys(groupedArticles).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="pb-4 px-5">
      {sortedDates.map((date) => (
        <div key={date}>
          <DateSeparator date={date} />
          <div className="py-2 flex flex-col items-center md:items-stretch space-y-4">
            {groupedArticles[date].map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </div>
      ))}

      {isLoadingMore && (
        <LoadingSpinner />
      )}

      {Object.keys(groupedArticles).length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          <p>Новости не найдены</p>
        </div>
      )}
    </div>
  );
};