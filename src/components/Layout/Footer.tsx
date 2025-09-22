import poweredByLogo from '@/assets/images/powered-by-logo.png';

interface FooterProps {
  copyrightYear?: number;
}

const navigationLinks = ['Log In', 'About Us', 'Publishers', 'Sitemap'];

export const Footer = ({ copyrightYear = 2023 }: FooterProps) => {
  const handleLinkClick = (linkName: string) => {
    console.log(`Clicked: ${linkName}`);
  };

  return (
    <footer
      className="bg-white flex flex-col items-center font-lato w-full py-4"
    >
      <div
        className="flex flex-col items-center"
        style={{
          width: '240px',
          height: '128.26px',
          position: 'relative'
        }}
      >
        <div className="flex items-center gap-5 mb-6">
          {navigationLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleLinkClick(link)}
              className="hover:opacity-70 transition-opacity"
              style={{
                fontSize: '12px',
                fontWeight: '400',
                lineHeight: '1.2em',
                color: '#000000'
              }}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center mb-4">
          <span
            className="mb-2"
            style={{
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '1.2em',
              color: '#000000'
            }}
          >
            Powered by
          </span>
          <img
            src={poweredByLogo}
            alt="Powered by logo"
            style={{
              width: '84px',
              height: '24.48px'
            }}
          />
        </div>

        <div
          style={{
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '1.2em',
            color: '#000000',
            textAlign: 'center'
          }}
        >
          © {copyrightYear} Besider. Inspired by Insider
        </div>
      </div>
    </footer>
  );
};