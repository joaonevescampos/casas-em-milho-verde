import homeCover from "../../assets/home-cover.png";

const HeroHome = () => {
  return (
    <picture className="absolute left-0 top-0 z-20 w-full h-screen">
      <div className="absolute w-full h-full bg-linear-120 from-[#0A160E]/85 to-primary2/20"></div>
      <img
        src={homeCover}
        alt="home-cover"
        className="h-full w-full object-cover object-top"
      />
    </picture>
  );
};

export default HeroHome;
