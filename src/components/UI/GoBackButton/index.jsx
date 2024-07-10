import { useNavigate } from "react-router-dom";

const GoBackButton = ({ buttonText }) => {
  let navigate = useNavigate();

  const backPage = () => navigate(-1);

  return (
    <button
      onClick={backPage}
      className="bg-transparent border border-white text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 m-4"
    >
      {buttonText.toUpperCase()}
    </button>
  );
};

export default GoBackButton;
