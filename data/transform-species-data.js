const fs = require("fs");

// Read species data file
const speciesDetailsData = JSON.parse(
  fs.readFileSync("./data/species-data.json", "utf8")
);

const decimalToPercentage = (decimal) => {
  return parseInt((parseFloat(decimal.toFixed(2)) * 100).toFixed(0));
};

// Process each species
const processedSpecies = Object.keys(speciesDetailsData).map((species) => {
  const data = speciesDetailsData[species];
  if (!data) {
    return {
      species: species,
      error: "No data found",
    };
  }

  // Get all variants for this species
  const variants = Object.values(data);

  // Combine all primary stars and regions
  const combinedPrimaryStars = {};
  const bodyTypeCounts = {};
  const atmosphereCounts = {};
  let hasOrionSpurVariant = false;

  variants.forEach((variant) => {
    // Check if variant is in either Orion Spur region
    const isInOrionSpur = variant.regions.some(
      (region) => region === "Inner Orion Spur" || region === "Outer Orion Spur"
    );

    if (isInOrionSpur) {
      hasOrionSpurVariant = true;
      // Only include star data if variant is in an Orion Spur region
      Object.entries(variant.histograms.primary_stars || {}).forEach(
        ([star, count]) => {
          combinedPrimaryStars[star] =
            (combinedPrimaryStars[star] || 0) + count;
        }
      );
      
      // Sum the counts for body types and atmospheres
      if (variant.histograms.body_types) {
        Object.entries(variant.histograms.body_types).forEach(([type, count]) => {
          bodyTypeCounts[type] = (bodyTypeCounts[type] || 0) + count;
        });
      }
      if (variant.histograms.atmos_types) {
        Object.entries(variant.histograms.atmos_types).forEach(([type, count]) => {
          atmosphereCounts[type] = (atmosphereCounts[type] || 0) + count;
        });
      }
    }
  });

  // Calculate total counts for percentages
  const totalBodyTypeCounts = Object.values(bodyTypeCounts).reduce((a, b) => a + b, 0);
  const totalAtmosphereCounts = Object.values(atmosphereCounts).reduce((a, b) => a + b, 0);

  // Transform bodyTypes and atmospheres into sorted arrays of objects
  const bodyTypes = Object.entries(bodyTypeCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: decimalToPercentage(count / totalBodyTypeCounts)
    }))
    .sort((a, b) => b.percentage - a.percentage);

  const atmospheres = Object.entries(atmosphereCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: decimalToPercentage(count / totalAtmosphereCounts)
    }))
    .sort((a, b) => b.percentage - a.percentage);

  // If no variants were found in Orion Spur, return null
  if (!hasOrionSpurVariant) {
    return null;
  }

  // Sort primary stars by count and convert to array of [star, count] pairs
  const sortedPrimaryStars = Object.entries(combinedPrimaryStars).sort(
    ([, a], [, b]) => b - a
  );

  // Return consolidated species data
  return {
    species,
    reward: variants[0].reward, // All variants have same reward
    variantCount: variants.length,
    primaryStars: sortedPrimaryStars,
    bodyTypes,
    atmospheres,
  };
});

// Filter out null results (species with no Orion Spur variants)
const species = processedSpecies.filter((result) => result !== null);

// Counts
const starTotalOccurrences = {}; // Total sightings (all species) for each star type
const starTypeData = {}; // Combined data for each star type

// First pass: calculate total occurrences for each star type and populate starTotalOccurrences
species.forEach((speciesResponse) => {
  if (!speciesResponse.error) {
    speciesResponse.primaryStars.forEach(([star, count]) => {
      starTotalOccurrences[star] = (starTotalOccurrences[star] || 0) + count;
    });
  }
});

// Second pass: calculate weighted expected values
species.forEach(({ error, primaryStars, reward, species, bodyTypes, atmospheres }) => {
  if (!error) {
    // Calculate weighted value for each star type
    primaryStars.forEach(([star, count]) => {
      // Take the count of that species' sightings around that star and divide by
      // total sightings at that star type to get rough probability of finding
      const probability = count / starTotalOccurrences[star];
      // Multiply by reward to get weighted value
      const weightedValue = probability * reward;

      // Initialize data tracking for this star if needed
      if (!starTypeData[star]) {
        starTypeData[star] = {
          expectedValue: 0,
          speciesContributions: []
        };
      }

      // Add contribution from this species
      starTypeData[star].speciesContributions.push({
        species,
        contribution: weightedValue,
        probability,
        count,
        bodyTypes,
        atmospheres
      });

      // Add to running total for this star type
      starTypeData[star].expectedValue += weightedValue;
    });
  }
});

// Transform star type data structure into an array of objects and update the related code
const processedData = Object.entries(starTypeData)
  .map(([name, data]) => ({
    name,
    expectedValue: data.expectedValue,
    totalOccurrences: starTotalOccurrences[name],
    speciesContributions: data.speciesContributions.sort((a, b) => b.contribution - a.contribution)
  }))
  .sort((a, b) => b.expectedValue - a.expectedValue);

// Write sorted data to JSON file
fs.writeFileSync('./data/processed-data.json', JSON.stringify(processedData, null, 2));

// Log expected values with contributions
console.log(
  "\n=== Star Types Ranked by Expected Value (Weighted by Occurrences) ==="
);
processedData.forEach(({ name, expectedValue, totalOccurrences, speciesContributions }) => {
  if (totalOccurrences >= 100) {
    console.log(`\n${name}: ${expectedValue.toLocaleString()} credits`);
    console.log(
      `Total Occurrences: ${totalOccurrences.toLocaleString()}`
    );
    console.log("Contributions by species:");

    speciesContributions.forEach(
      ({ species, contribution, probability, count, bodyTypes, atmospheres }) => {
        console.log(
          `  - ${species}: ${contribution.toLocaleString()} credits ` +
            `(${(probability * 100).toFixed(
              1
            )}% probability, ${count} occurrences)`
        );
        console.log(`    Body Types:`);
        bodyTypes.forEach(({ name, count, percentage }) => {
          console.log(`      - ${name}: ${count} (${(percentage * 100).toFixed(1)}%)`);
        });
        console.log(`    Atmospheres:`);
        atmospheres.forEach(({ name, count, percentage }) => {
          console.log(`      - ${name}: ${count} (${(percentage * 100).toFixed(1)}%)`);
        });
      }
    );
  }
});
