import { memo } from 'react';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = memo(({ article }: ArticleCardProps) => {
  const getImageUrl = () => {
    const image = article.multimedia?.find(
      (media) => media.subtype === 'wide' || media.subtype === 'thumbnail'
    );
    return image ? `https://www.nytimes.com/${image.url}` : null;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleClick = () => {
    window.open(article.web_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-4 mx-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex gap-3">
        {getImageUrl() && (
          <div className="flex-shrink-0">
            <img
              src={getImageUrl()!}
              alt={article.headline?.main || 'News image'}
              className="w-20 h-20 object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-primary text-text-normal mb-2 line-clamp-3">
            {article.headline?.main || article.abstract}
          </h3>

          <p className="text-secondary text-text-small mb-2 line-clamp-2">
            {article.abstract}
          </p>

          <div className="flex items-center justify-between text-text-small text-secondary">
            <span>{article.source}</span>
            <span>{formatTime(article.pub_date)}</span>
          </div>
        </div>
      </div>
    </article>
  );
});