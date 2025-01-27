const fs = require('fs');

async function fetchAllSpeciesData() {
    // Read the species list
    const speciesData = JSON.parse(fs.readFileSync("./species.json", "utf8"));
    const allData = {};

    // Fetch data for each species
    for (const species of speciesData) {
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
        './species-data.json',
        JSON.stringify(allData, null, 2),
        'utf8'
    );
    console.log('All data has been saved to species-data.json');
}

fetchAllSpeciesData();
