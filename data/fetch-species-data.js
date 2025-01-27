const fs = require("fs");

const speciesList = [
  "Fonticulua Fluctus",
  "Concha Biconcavis",
  "Fonticulua Segmentatus",
  "Stratum Tectonicas",
  "Tussock Stigmasis",
  "Cactoida Vermis",
  "Clypeus Speculumi",
  "Fumerola Extremus",
  "Recepta Deltahedronix",
  "Stratum Cucumisis",
  "Recepta Conditivus",
  "Tussock Virgam",
  "Aleoida Gravis",
  "Osseus Discus",
  "Recepta Umbrux",
  "Clypeus Margaritus",
  "Tubus Cavas",
  "Frutexa Flammasis",
  "Osseus Pellebantus",
  "Bacterium Informem",
  "Clypeus Lacrimam",
  "Bacterium Volu",
  "Concha Aureolas",
  "Frutexa Acus",
  "Tubus Compagibus",
  "Tussock Triticum",
  "Fumerola Nitris",
  "Aleoida Arcus",
  "Tussock Capillum",
  "Aleoida Coronamus",
  "Electricae Pluma",
  "Electricae Radialem",
  "Fumerola Aquatis",
  "Fumerola Carbosis",
  "Frutexa Sponsae",
  "Tussock Pennata",
  "Fonticulua Upupam",
  "Tubus Sororibus",
  "Bacterium Nebulus",
  "Bacterium Scopulum",
  "Bacterium Omentum",
  "Concha Renibus",
  "Tussock Serrati",
  "Osseus Fractus",
  "Bacterium Verrata",
  "Fungoida Bullarum",
  "Cactoida Cortexum",
  "Cactoida Pullulanta",
  "Tussock Caputus",
  "Aleoida Laminiae",
  "Aleoida Spica",
  "Fungoida Gelata",
  "Tussock Albata",
  "Tussock Ventusa",
  "Osseus Pumice",
  "Fonticulua Lapida",
  "Stratum Laminamus",
  "Fungoida Stabitis",
  "Stratum Frigus",
  "Tubus Rosarium",
  "Cactoida Lapis",
  "Cactoida Peperatis",
  "Stratum Araneamus",
  "Stratum Excutitus",
  "Tubus Conifer",
  "Osseus Spiralis",
  "Concha Labiata",
  "Bacterium Tela",
  "Tussock Ignis",
  "Frutexa Flabellum",
  "Fonticulua Digitos",
  "Tussock Catena",
  "Tussock Cultro",
  "Tussock Divisa",
  "Bacterium Cerbrus",
  "Fungoida Setisis",
  "Bacterium Alcyoneum",
  "Frutexa Collum",
  "Frutexa Fera",
  "Frutexa Metallicum",
  "Osseus Cornibus",
  "Stratum Limaxus",
  "Stratum Paleas",
  "Bacterium Bullaris",
  "Bacterium Acies",
  "Bacterium Aurasus",
  "Bacterium Vesicula",
  "Fonticulua Campestris",
  "Tussock Pennatis",
  "Tussock Propagito",
];

async function fetchAllSpeciesData() {
  // Read the species list
  const allData = {};

  // Fetch data for each species
  for (const species of speciesList) {
    try {
      const response = await fetch(
        `https://us-central1-canonn-api-236217.cloudfunctions.net/query/biostats/${species}`
      );
      const data = await response.json();
      allData[species] = data;
      console.log(`Fetched data for ${species}`);
    } catch (error) {
      console.error(`Error fetching data for ${species}:`, error);
    }
  }

  // Save the data to a file
  fs.writeFileSync(
    "./data/species-data.json",
    JSON.stringify(allData, null, 2),
    "utf8"
  );
  console.log("All data has been saved to species-data.json");
}

fetchAllSpeciesData();
