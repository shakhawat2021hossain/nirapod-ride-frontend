import axios from "axios";
import type { Coordinates } from "./getDistance";

const API_KEY = "f1bb865188a741acbb6d930ac34343c0"; // consider moving to env

/**
 * Geocode an address string using Geoapify.
 * Returns null if no location was found.
 */
export const geocode = async (address: string): Promise<Coordinates | null> => {
  try {
    const res = await axios.get("https://api.geoapify.com/v1/geocode/search", {
      params: {
        text: address,
        apiKey: API_KEY,
        limit: 1,
      },
    });

    const features = res.data?.features;
    if (features && features.length > 0) {
      const [lng, lat] = features[0].geometry.coordinates;
      return { lat, lng };
    }
  } catch (err) {
    console.error("geocode error", err);
  }
  return null;
};
