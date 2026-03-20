import Header from './Header';
import Footer from './Footer';

import Particles from './Particles';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-grid" style={{ background: 'var(--bg)', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Particles />
      </div>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Header />
      </div>
      <div className="flex-1 relative" style={{ zIndex: 1 }}>
        {children}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
