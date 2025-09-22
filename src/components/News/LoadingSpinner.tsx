export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative flex space-x-2">
        <div className="w-3 h-3 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-accent rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};