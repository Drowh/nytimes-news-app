import { memo } from 'react';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = memo(({ article }: ArticleCardProps) => {
  const getImageUrl = () => {
    const image = article.multimedia?.find(
      (media) => media.subtype === 'xlarge' || media.subtype === 'wide' || media.subtype === 'thumbnail'
    );
    return image ? `https://www.nytimes.com/${image.url}` : null;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) + ', ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleClick = () => {
    window.open(article.web_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      onClick={handleClick}
      className="relative bg-white cursor-pointer hover:bg-gray-50 transition-colors duration-200 w-full max-w-sm mx-auto md:max-w-none md:mx-0"
    >
      <div className="p-6 md:p-8">
        <div
          className="font-lato mb-2 text-center"
          style={{
            fontWeight: '800',
            fontSize: '14px',
            lineHeight: '1.2em',
            color: '#096FFA'
          }}
        >
          {article.source}
        </div>

        <div className="flex gap-3">
          {getImageUrl() && (
            <div className="flex-shrink-0">
              <img
                src={getImageUrl()!}
                alt={article.headline?.main || 'News image'}
                className="w-24 h-18 object-cover rounded"
                loading="lazy"
              />
            </div>
          )}

          <div className="flex-1 flex flex-col">
            <div
              className="font-lato mb-2 flex-1"
              style={{
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '22px',
                color: '#000000',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {article.headline?.main || article.abstract}
            </div>

            <div
              className="font-lato mt-auto"
              style={{
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#6D787A'
              }}
            >
              {formatDate(article.pub_date)}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: '1px',
          backgroundColor: '#EDEDED'
        }}
      />
    </article>
  );
});