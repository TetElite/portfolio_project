import Header from './Header';
import Footer from './Footer';

// Shared layout for all public-facing pages (Home, Projects, ProjectDetail)
function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
