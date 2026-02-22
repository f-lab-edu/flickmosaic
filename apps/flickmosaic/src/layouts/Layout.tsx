import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-18">
        <div className="max-w-[1680px] mx-auto my-0">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
