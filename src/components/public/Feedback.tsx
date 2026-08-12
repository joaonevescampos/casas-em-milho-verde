import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { FaStar } from "react-icons/fa";
import airbnbLogo from "../../assets/airbnb.png"


type Props = {
  name: string;
  rate: number;
  comment: string;
  date: string;
  index: number;
};

const Feedback = ({ name, rate, comment, date, index }: Props) => {
  return (
    <CarouselItem key={index} className="basis-1/1 sm:basis-1/2 lg:basis-1/3">
      <div className=" relative">
        <Card className="w-full">
          <CardContent className="flex items-center justify-center p-4 flex-col gap-2 rounded-xl h-70 max-lg:h-80">
            <div className="absolute top-2 left-2">
              <img src={airbnbLogo} alt="airbnb-logo" className="w-6" />
            </div>
            <h2 className="font-bold">{name}</h2>
            <div className="flex gap-1 items-center">
              {Array.from({ length: rate }).map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <span className="text-primary5/60 font-medium text-xs">{date}</span>
            <p className="opacity-60 text-[13px] max-lg:text-xs text-center pt-2 line-clamp-13">{comment}</p>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default Feedback;
