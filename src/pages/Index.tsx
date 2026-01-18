import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Catalog from '@/components/Catalog';
import About from '@/components/About';
import Delivery from '@/components/Delivery';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Categories />
        <Catalog />
        <About />
        <Delivery />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;