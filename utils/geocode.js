import fetch from "node-fetch";

export async function geocodeLocation(location) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    location
  )}&limit=1`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "StayScout/1.0 (your-email@example.com)"
    }
  });

  const data = await response.json();

  if (!data || data.length === 0) {
    throw new Error("Location not found");
  }

  return {
    type: "Point",
    coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)],
  };
}
