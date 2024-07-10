import { Link } from "react-router-dom";

const CharacterList = ({ characters }) => {
  return (
    <section className="flex flex-wrap justify-start mt-5">
      <div className="w-full mb-4">
        <p className="text-lg font-semibold text-white">Найдено:</p>
      </div>
      {characters.map((character) => (
        <div key={character.id} className="character-card w-full px-4 mb-4">
          <Link to={`/characters/${character.id}`}>
            <div className="bg-transparent border-2 border-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <h3 className="text-xl font-semibold text-white mb-2">{character.name}</h3>
              <p className="text-sm text-white mb-2">
                {character.status} - {character.species}
              </p>
              <p className="text-sm text-white">Пол: {character.gender}</p>
              <p className="text-sm text-white">Локация: {character.location.name}</p>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
};

export default CharacterList;
