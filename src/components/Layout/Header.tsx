import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/store/slices/uiSlice';

export const Header = () => {
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        height: '72px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EDEDED',
        minWidth: '320px'
      }}
    >
      <div className="relative w-full h-full flex items-center justify-between px-5">
        <button
          onClick={handleMenuClick}
          className="hover:opacity-70 focus:outline-none"
          style={{
            width: '20px',
            height: '15.75px'
          }}
          aria-label="Открыть меню"
        >
          <div className="relative w-full h-full">
            <div style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              width: '20px',
              height: '2px',
              backgroundColor: '#000000'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '7px',
              left: '0px',
              width: '20px',
              height: '2px',
              backgroundColor: '#000000'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '14px',
              left: '0px',
              width: '20px',
              height: '2px',
              backgroundColor: '#000000'
            }}></div>
          </div>
        </button>

        <h1
          className="font-lato font-bold text-center flex-1"
          style={{
            fontSize: '24px',
            lineHeight: '1.2em',
            letterSpacing: '10%',
            color: '#000000'
          }}
        >
          BESIDER
        </h1>

        <div style={{ width: '20px' }}></div>
      </div>
    </header>
  );
};