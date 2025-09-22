import { memo } from 'react';

interface DateSeparatorProps {
  date: string;
}

export const DateSeparator = memo(({ date }: DateSeparatorProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="sticky top-16 bg-gray-100 px-4 py-3 border-b border-gray-200 z-10">
      <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
        {formatDate(date)}
      </h2>
    </div>
  );
});