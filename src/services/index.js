import $api from "../http";

const getCharacterDetailsService = async (id) => {
  const response = await $api.get(`/character/${id}`);

  return response.data;
};

const getFilteredByNameService = async (name, status = "", species = "") => {
  const response = await $api.get(`/character/`, {
    params: { name, status, species },
  });

  return response.data.results;
};

export { getCharacterDetailsService, getFilteredByNameService };
