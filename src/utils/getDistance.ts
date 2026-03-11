import axios from "axios"

export interface Coordinates {
    lat: number;
    lng: number;
}



export const getLatLong = async (place: string): Promise<Coordinates | null> => {
    try {
        const res = await axios.get("https://api.geoapify.com/v1/geocode/search", {
            params: {
                text: place,
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
        console.error("getLatLong error", err);
    }
    return null;
}

const API_KEY = "f1bb865188a741acbb6d930ac34343c0"; // consider moving to env

export const getDistance = async (pickup: string, destination: string) => {
    const source = await getLatLong(pickup) as Coordinates
    const target = await getLatLong(destination) as Coordinates
    const res = await axios.post(
      "https://api.geoapify.com/v1/routematrix",
      {
        mode: "truck", // can be changed by callers later
        sources: [{ location: [source.lng, source.lat] }],
        targets: [{ location: [target.lng, target.lat] }],
      },
      {
        params: { apiKey: API_KEY },
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("getDistance response", res.data);
    return res.data;
};

