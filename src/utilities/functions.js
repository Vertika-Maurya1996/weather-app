export const handleLocation = async ({ latitude, longitude }) => {
    try {
      const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=336ccdde215a40ff8a654b91e1596cba`;
      const response = await fetch(geocodingUrl);
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        const locationName = data.results[0].components;
        let location = locationName?._normalized_city + ","+`\n` + locationName?.country;
        return location;
      } else {
        console.error('No results found');
        return false;
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
      return false;
    }
  };
  
  