import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/store/slices/uiSlice';

export const Header = () => {
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={handleMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Открыть меню"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <h1 className="text-text-large font-semibold text-primary">NY Times News</h1>

        <div className="w-10"></div>
      </div>
    </header>
  );
};