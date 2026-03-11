import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";

const libraries: ("places")[] = ["places"];

export default function FareEstimator() {
    const fromRef = useRef<google.maps.places.Autocomplete | null>(null);
    const toRef = useRef<google.maps.places.Autocomplete | null>(null);

    const [from, setFrom] = useState<google.maps.LatLng | null>(null);
    const [to, setTo] = useState<google.maps.LatLng | null>(null);
    const [distance, setDistance] = useState<number>(0);
    const [fare, setFare] = useState<number>(0);


    

    useEffect(() => {
        if (!from || !to) return;

        const service = new google.maps.DistanceMatrixService();

        service.getDistanceMatrix(
            {
                origins: [from],
                destinations: [to],
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (res, status) => {
                if (status === "OK") {
                    const meters =
                        res?.rows[0]?.elements[0]?.distance?.value || 0;

                    const km = meters / 1000;
                    setDistance(km);

                    // fare logic
                    const baseFare = 50;
                    const perKmRate = 20;
                    setFare(baseFare + km * perKmRate);
                }
            }
        );
    }, [from, to]);





    return (
        <LoadScript
            // googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            googleMapsApiKey="AIzaSyD_4v9YvrLQ1-Gs81l-NEPJ5xW2GnQlRbU"
            libraries={libraries}
        >
            <div style={styles.container}>
                <h2>Book a Ride</h2>

                <Autocomplete
                    onLoad={(ref) => (fromRef.current = ref)}
                    onPlaceChanged={() => {
                        const place = fromRef.current?.getPlace();
                        setFrom(place?.geometry?.location || null);
                    }}
                >
                    <input placeholder="From" style={styles.input} />
                </Autocomplete>

                <Autocomplete
                    onLoad={(ref) => (toRef.current = ref)}
                    onPlaceChanged={() => {
                        const place = toRef.current?.getPlace();
                        setTo(place?.geometry?.location || null);
                    }}
                >
                    <input placeholder="Destination" style={styles.input} />
                </Autocomplete>

                {distance > 0 && (
                    <div style={styles.result}>
                        <p>Distance: {distance.toFixed(2)} km</p>
                        <p>
                            Estimated Fare: <strong>৳{fare.toFixed(0)}</strong>
                        </p>
                    </div>
                )}
            </div>
        </LoadScript>
    );
}

const styles = {
    container: {
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
    },
    result: {
        marginTop: "16px",
        background: "#f5f5f5",
        padding: "12px",
        borderRadius: "8px",
    },
};



 // test/get example distance - the hook is async so we wrap it
//   useEffect(() => {
//     const fetchDistance = async () => {
//       try {
//         // example coordinates (Dhaka → Rangpur)
//         const dis = await getDistance(
//           { lat: 23.01, lng: 91.3992 },
//           { lat: 25.9188, lng: 89.4457 }
//         );
//         console.log("getDistance result", dis);

//         const meters = dis?.distances?.[0]?.[0] ?? null;
//         if (meters !== null) {
//           console.log("raw distance (meters):", meters);
//           setTestDistance(meters);
//         }
//       } catch (err) {
//         console.error("getDistance error", err);
//       }
//     };

//     fetchDistance();
//   }, []);