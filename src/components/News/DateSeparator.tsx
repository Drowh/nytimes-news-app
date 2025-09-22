import { memo } from 'react';

interface DateSeparatorProps {
  date: string;
}

export const DateSeparator = memo(({ date }: DateSeparatorProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white px-4 py-3">
      <h2
        className="font-lato font-bold"
        style={{
          fontSize: '18px',
          fontWeight: '700',
          lineHeight: '26px',
          letterSpacing: '0%',
          color: '#000000'
        }}
      >
        {formatDate(date)}
      </h2>
    </div>
  );
});