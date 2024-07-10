import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterDetailsService } from "../../services";
import GoBackButton from "../../components/UI/GoBackButton";

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  const fetchCharacter = async () => {
    const response = await getCharacterDetailsService(id);
    setCharacter(response);
  };

  if (!character) {
    return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <GoBackButton buttonText="НАзад" />
      <div className="bg-transparent border-2 border-white rounded-lg shadow-lg overflow-hidden">
        <img
          className="w-full md:h-96 object-cover object-center"
          src={character.image}
          alt={character.name}
        />
        <div className="p-6 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-semibold text-white mb-4">{character.name}</h2>
          <div className="flex mb-2">
            <p className="text-white mr-4">Статус:</p>
            <p className="font-semibold text-white">{character.status}</p>
          </div>
          <div className="flex mb-2">
            <p className="text-white mr-4">Раса:</p>
            <p className="font-semibold text-white">{character.species}</p>
          </div>
          <div className="flex mb-2">
            <p className="text-white mr-4">Пол:</p>
            <p className="font-semibold text-white">{character.gender}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
