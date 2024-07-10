import { useState, useEffect } from "react";
import CharacterList from "../../components/CharacterList";
import SearchForm from "../../components/SearchForm";
import CustomSnackbar from "../../components/UI/CustomSnackbar";
import { getFilteredByNameService } from "../../services";
import { useDebounce } from "./useDebounce";

const Main = () => {
  const [characters, setCharacters] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    species: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  const selectOptions = [
    { value: "", label: "Любое" },
    { value: "alive", label: "Жив" },
    { value: "dead", label: "Мертв" },
    { value: "unknown", label: "Неизвестно" },
  ];
  const debouncedFilters = useDebounce(filters, 500);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));

    if (savedFilters) {
      setFilters(savedFilters);
      fetchCharacters(savedFilters);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(debouncedFilters));
    fetchCharacters(debouncedFilters);
  }, [debouncedFilters]);

  const fetchCharacters = async (filters) => {
    const { name, status, species } = filters;

    try {
      const response = await getFilteredByNameService(name, status, species);
      setCharacters(response);
    } catch (error) {
      handleSnackbar(true, error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: value });
  };

  const handleSnackbar = (open, message = "") => {
    setSnackbar({
      open: open,
      message: message,
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">Вселенная Рик и Морти</h1>
      <SearchForm>
        <label className="m-2 mt-5 sm:w-1/3 justify-start" htmlFor="name-input">
          Имя персонажа:
        </label>
        <input
          id="name-input"
          className="bg-black rounded-md px-3 py-2 m-2 w-full"
          type="text"
          name="name"
          value={filters.name}
          onChange={handleInputChange}
          placeholder="Имя"
        />

        <div className="flex flex-col sm:flex-row items-center w-full">
          <label className="m-2 sm:w-1/3" htmlFor="alive-select">
            Жив?
          </label>
          <select
            id="alive-select"
            className="bg-black rounded-md px-3 py-2 m-2 w-full sm:w-2/3"
            name="status"
            value={filters.status}
            onChange={handleInputChange}
          >
            {selectOptions.map((option) => (
              <option className="bg-black" key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="m-2 sm:w-1/3" htmlFor="input-species">
            Раса:
          </label>
          <input
            id="input-species"
            className="bg-black rounded-md px-3 py-2 m-2 w-full sm:w-2/3"
            type="text"
            name="species"
            value={filters.species}
            onChange={handleInputChange}
            placeholder="Раса"
          />
        </div>
      </SearchForm>
      <CharacterList characters={characters} />

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        autoHideDuration={2500}
        handleClose={() => handleSnackbar(false, "")}
      />
    </div>
  );
};

export default Main;
