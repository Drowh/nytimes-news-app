import { Loading } from '@/components/UI/Loading';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <Loading size={36} />
    </div>
  );
};