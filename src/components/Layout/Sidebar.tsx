import { useDispatch, useSelector } from 'react-redux';
import { setSidebarOpen } from '@/store/slices/uiSlice';
import type { RootState } from '@/store';
import menuIcon from '@/assets/icons/menu-icon.svg';

const categories = [
  'SCIENCE',
  'GENERAL',
  'ENTERTAINMENT',
  'TECHNOLOGY',
  'BUSINESS',
  'HEALTH',
  'SPORTS',
];

export const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);

  const handleClose = () => {
    dispatch(setSidebarOpen(false));
  };


  const handleCategorySelect = (category: string) => {
    console.log('Selected category:', category);
  };

  return (
    <div
        className={`fixed top-0 left-0 h-screen shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          width: 'min(360px, 100vw)',
          backgroundColor: '#FFFFFF',
          maxWidth: '100vw'
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-0 w-5 h-5 hover:opacity-70 focus:outline-none"
          aria-label="Закрыть меню"
        >
          <img src={menuIcon} alt="" className="w-full h-full" />
        </button>

        <nav className="pt-36 px-5 space-y-7 w-full">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className="block w-full text-left font-lato hover:opacity-70 transition-opacity"
              style={{
                fontSize: '22px',
                fontWeight: '600',
                lineHeight: '1.2em',
                letterSpacing: '10%',
                color: '#000000'
              }}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
  );
};