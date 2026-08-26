import About from "@/components/public/About";
import CtaSection from "@/components/public/CtaSection";
import FeaturedProperties from "@/components/public/FeaturedProperties";
import HeroHome from "@/components/public/HeroHome";
import Strip from "@/components/public/Strip";
import Testimonials from "@/components/public/Testimonials";

const Home = () => {
  return (
    <>
      <HeroHome />
      <main className="">
        <Strip />
        <FeaturedProperties purpose="rent" />
        <CtaSection purpose="rent" />
        <Testimonials />
        <FeaturedProperties purpose="sale" />
        <CtaSection purpose="sale" />
        <About />
      </main>
    </>
  );
};

export default Home;
