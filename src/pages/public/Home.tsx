import FeaturedProperties from "@/components/public/FeaturedProperties"
import HeroHome from "@/components/public/HeroHome"
import Strip from "@/components/public/Strip"

const Home = () => {
  return (
    <main className="">
      <HeroHome />
      <Strip />
      <FeaturedProperties purpose="rent"/>
      <FeaturedProperties purpose="sale"/>
    </main>
  )
}

export default Home