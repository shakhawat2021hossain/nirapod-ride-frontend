'use client';
import { useState } from "react";
import { AlertTriangle, Phone, Navigation, UserCheck } from "lucide-react";

const SOSButton = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const notifyContact = () => {
        setMessage("Emergency contact notified!");
        setTimeout(() => setMessage(""), 3000);
    };

    const shareLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
                    setMessage(`Location shared: ${mapsLink}`);
                    setTimeout(() => setMessage(""), 5000);
                    console.log("Send this link to contacts:", mapsLink);
                },
                (err) => {
                    console.error(err);
                    setMessage("Unable to get location");
                    setTimeout(() => setMessage(""), 3000);
                }
            );
        } else {
            setMessage("Geolocation not supported");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    // const callPolice = () => {
    //     window.open("tel:+911", "_blank"); // Replace with local emergency number
    // };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {message && (
                <div className="mb-2 px-4 py-2 bg-green-500 text-white rounded shadow-lg">
                    {message}
                </div>
            )}

            <button
                className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
                onClick={() => setOpen(!open)}
            >
                <AlertTriangle size={24} />
            </button>

            {open && (
                <div className="mt-2 flex flex-col items-end space-y-2">
                    {/* <button
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-900 transition"
                        onClick={callPolice}
                    >
                        <Phone className="h-4 w-4" /> Call Police
                    </button> */}
                    <button
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-900 transition"
                        onClick={notifyContact}
                    >
                        <UserCheck className="h-4 w-4" /> Notify Contact
                    </button>
                    <button
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-900 transition"
                        onClick={shareLocation}
                    >
                        <Navigation className="h-4 w-4" /> Share Location
                    </button>
                </div>
            )}
        </div>
    );
};

export default SOSButton;
