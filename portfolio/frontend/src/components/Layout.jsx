import Header from './Header';
import Footer from './Footer';

import Particles from './Particles';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-grid" style={{ background: 'var(--bg)', position: 'relative' }}>
      {/* Particles layer - visible behind navigation but over content */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 15,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        <Particles />
      </div>

      {/* Header - Ensure high z-index */}
      <div style={{ position: 'relative', zIndex: 50 }}>
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex-1 relative" style={{ zIndex: 10 }}>
        {children}
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
