
import { IoClose } from "react-icons/io5";

const ModalEdit = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full h-full z-50 ">
      <div className="bg-black/40 backdrop-blur-xl w-full h-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white w-120 h-100 rounded-sm">
        <button>
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default ModalEdit;
