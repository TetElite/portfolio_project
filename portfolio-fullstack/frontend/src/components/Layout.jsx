import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-grid" style={{ background: 'var(--bg)' }}>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
