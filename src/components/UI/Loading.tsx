import loadingIcon from '@/assets/icons/loading-icon.svg';

interface LoadingProps {
  size?: number;
  className?: string;
}

export const Loading = ({ size = 36, className = '' }: LoadingProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src={loadingIcon}
        alt=""
        className="animate-spin"
        style={{
          width: `${size}px`,
          height: `${size}px`
        }}
      />
    </div>
  );
};