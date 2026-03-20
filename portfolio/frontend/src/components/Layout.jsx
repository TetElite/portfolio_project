import Header from './Header';
import Footer from './Footer';

import Particles from './Particles';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-grid" style={{ background: 'var(--bg)', position: 'relative' }}>
      <Particles />
      <Header />
      <div className="flex-1 relative" style={{ zIndex: 1 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
