import { Link } from "react-router";

type ButtonProps = {
  text: string;
  path?: string;
  style?: string;
  onClick?: () => void;
};

const Button = ({ text, path, style, onClick }: ButtonProps) => {
  return (
    <>
      {path ? (
        <Link to={path}>
          <button
            className={`font-montserrat bg-secondary1 text-white rounded-3xl h-11 text-xs cursor-pointer font-semibold px-6 ${style}`}
          >
            {text}
          </button>
        </Link>
      ) : (
        <button
          className={`font-montserrat bg-secondary1 text-white rounded-3xl h-11 text-xs cursor-pointer font-semibold px-6 ${style}`}
          onClick={onClick}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
