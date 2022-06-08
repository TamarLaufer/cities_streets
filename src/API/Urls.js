export const mainUrl = "https://gapidev.goola.run/addresses";

export default {
  citiesUrl: () => `${mainUrl}/cities`,
  streetsUrl: (id) => `${mainUrl}/streets/${id}`,
};
