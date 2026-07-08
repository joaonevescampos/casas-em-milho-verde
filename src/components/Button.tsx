import { Link } from "react-router";

type ButtonProps = {
  text: string;
  path?: string;
  style?: string;
  onClick?: () => void;
  typeSubmit?: boolean;
};

const DefaultButton = ({
  text,
  path,
  style,
  onClick,
  typeSubmit,
}: ButtonProps) => {
  return (
    <>
      {typeSubmit ? (
        <button
          type="submit"
          className={`font-montserrat bg-secondary1 text-white rounded-3xl h-11 text-[10px] cursor-pointer font-semibold px-6 max-lg:text-[8px] max-lg:h-8 ${style}`}
        >
          {text}
        </button>
      ) : path ? (
        <Link to={path}>
          <button
            className={`font-montserrat bg-secondary1 text-white rounded-3xl h-11 text-[10px] cursor-pointer font-semibold px-6 max-lg:text-[8px] max-lg:h-8 ${style}`}
          >
            {text}
          </button>
        </Link>
      ) : (
        <button
          className={`font-montserrat bg-secondary1 text-white rounded-3xl h-11 text-[10px] cursor-pointer font-semibold px-6 max-lg:text-[8px] max-lg:h-8 ${style}`}
          onClick={onClick}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default DefaultButton;
