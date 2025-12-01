import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

// Auto-open popup component
const AutoOpenPopup = ({ children, position }) => {
  const markerRef = useRef(null);
  const map = useMap();

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [map]);

  return (
    <Marker position={position} ref={markerRef}>
      <Popup>{children}</Popup>
    </Marker>
  );
};

const SurveyMap = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await axios.get("https://bfar-server.onrender.com/survey");
        setSurveys(res.data);

        const simplified = res.data.map((s) => ({
          name: s.name,
          address: `${s.province}, ${s.municipality}, ${s.district}, ${s.baranggay}`,
          projectReceived: s.projectReceived,
          lat: s.lat,
          lon: s.lon,
        }));

        console.log("Simplified survey data:", simplified);
      } catch (err) {
        console.error("Error fetching surveys:", err);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div className="flex-1 p-10">
      <div style={{ height: "100%", width: "100%" }} className="rounded-xl overflow-hidden">
        <MapContainer
          center={[7.073665, 125.6180691]}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=Of5VhE6Hp5sKySUcOlMm"
          />

          <AutoOpenPopup position={[7.073665, 125.6180691]}>
            <b>BFAR Regional Office No. XI</b> <br />
            Davao City, Philippines
          </AutoOpenPopup>

          {surveys
            .filter((survey) => survey.lat && survey.lon)
            .map((survey) => (
              <Marker
                key={survey._id}
                position={[survey.lat, survey.lon]}
              >
                <Popup>
                  <b>Name:</b> {survey.name} <br />
                  <b>Address:</b> {`${survey.province}, ${survey.municipality}, ${survey.district}, ${survey.baranggay}`} <br />
                  <b>Project Received:</b> {survey.projectReceived}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default SurveyMap;
