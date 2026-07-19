import { FaHome, FaLeaf, FaMountain } from "react-icons/fa";

const Strip = () => {
  return (
    <section className="-mx-20 max-lg:-mx-4">
      <div className="flex max-lg:flex-col gap-4 justify-between bg-secondary1 w-full py-4 px-16 max-lg:px-4 text-white">
        <div className="flex gap-4 items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-linear-120 from-secondary5/50 from-0% via-primary2/50 via-40% to-secondary1/50 to-100% rounded-full shadow">
            <FaLeaf className="text-white text-2xl" />
          </div>
          <span className="max-w-40 max-lg:max-w-none text-[10px]">
            Natureza exuberante com paisagens preservadas
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-linear-120 from-secondary5/50 from-0% via-primary2/50 via-40% to-secondary1/50 to-100% rounded-full shadow">
            <FaHome className="text-white text-2xl" />
          </div>
          <span className="max-w-40 max-lg:max-w-none text-[10px]">
            Casa exclusivas com conforto e privacidade
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-linear-120 from-secondary5/50 from-0% via-primary2/50 via-40% to-secondary1/50 to-100% rounded-full shadow">
            <FaMountain className="text-white text-2xl" />
          </div>
          <span className="max-w-40 max-lg:max-w-none text-[10px]">
            Relaxe entre as montanhas de Milho Verde
          </span>
        </div>
      </div>
    </section>
  );
};

export default Strip;
