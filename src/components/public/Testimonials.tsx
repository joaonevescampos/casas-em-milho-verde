import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Feedback from "./Feedback";
import { testimonials } from "@/data/testimonials";
import Reveal from "../Reveal";
import quotation from "../../assets/quotation.png";

const Testimonials = () => {
  return (
    <Reveal delay={0.5}>
      <section className="relative flex items-center justify-center -mx-20 max-md:-mx-4 overflow-hidden bg-linear-120! to-primary1/50! from-primary4! py-12 px-20 max-md:px-4">
        <img
          src={quotation}
          alt="quotation"
          className="absolute top-20 left-4 opacity-70"
        />
        <img
          src={quotation}
          alt="quotation"
          className="absolute bottom-4 right-4 rotate-180 opacity-70"
        />

        <div className="flex flex-col justify-center gap-4 w-full max-w-300">
          <div className="flex flex-col">
            <span className="text-secondary5 text-[10px]">
              AVALIAÇÕES EM DESTAQUE
            </span>
            <h2 className="text-2xl font-cormorant font-semibold">
              Depoimentos
            </h2>
          </div>

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full m-auto max-w-300"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <Feedback
                  name={testimonial.name}
                  comment={testimonial.comment}
                  date={testimonial.date}
                  rate={testimonial.rate}
                  index={index}
                />
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </Reveal>
  );
};

export default Testimonials;
