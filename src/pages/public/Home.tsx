import CtaSection from "@/components/public/CtaSection"
import FeaturedProperties from "@/components/public/FeaturedProperties"
import HeroHome from "@/components/public/HeroHome"
import Strip from "@/components/public/Strip"

const Home = () => {
  return (
    <main className="">
      <HeroHome />
      <Strip />
      <FeaturedProperties purpose="rent"/>
      <CtaSection purpose="rent"/>
      <FeaturedProperties purpose="sale"/>
      <CtaSection purpose="sale"/>
    </main>
  )
}

export default Home