import "leaflet/dist/leaflet.css";
import { MdSearch, MdOutlineTune } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const FlyToLocation = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (!position || !position[0] || !position[1]) return;
    map.flyTo([position[0], position[1]], 17, { duration: 1.5 });
  }, [position, map]);

  return null;
};

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
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [flyTo, setFlyTo] = useState(null);

  // 🔥 FIX: marker refs for opening popups
  const markerRefs = useRef({});

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await axios.get("https://bfar-server.onrender.com/survey");
        setSurveys(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching surveys:", err);
      }
    };

    fetchSurveys();
  }, []);

  // LIVE SEARCH
  useEffect(() => {
    const s = search.toLowerCase();
    const results = surveys.filter(
      (item) =>
        item.name.toLowerCase().includes(s) ||
        item.projectReceived.toLowerCase().includes(s) ||
        item.province.toLowerCase().includes(s) ||
        item.municipality.toLowerCase().includes(s) ||
        item.baranggay.toLowerCase().includes(s)
    );
    setFiltered(results);
  }, [search, surveys]);

  return (
    <div className="flex-1 flex gap-6 p-10">
      {/* LEFT SIDE (MAP) */}
      <div className="flex-1 flex flex-col gap-6">
        <div
          style={{ height: "100%", width: "100%" }}
          className="rounded-xl overflow-hidden"
        >
          <MapContainer
            center={[7.073665, 125.6180691]}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; BFAR XI, RFIMU"
              url="https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=Of5VhE6Hp5sKySUcOlMm"
            />

            {flyTo && <FlyToLocation position={flyTo} />}

            <AutoOpenPopup position={[7.073665, 125.6180691]}>
              <b>BFAR Regional Office No. XI</b> <br />
              Davao City, Philippines
            </AutoOpenPopup>

            {filtered
              .filter((s) => s.lat && s.lon)
              .map((survey) => (
                <Marker
                  key={survey._id}
                  position={[survey.lat, survey.lon]}
                  ref={(ref) => {
                    if (ref) markerRefs.current[survey._id] = ref;
                  }}
                >
                  <Popup>
                    <b>Name:</b> {survey.name} <br />
                    <b>Address:</b>{" "}
                    {`${survey.province}, ${survey.municipality}, ${survey.district}, ${survey.baranggay}`}{" "}
                    <br />
                    <b>Project Received:</b> {survey.projectReceived}
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>

        <div className="w-full h-[200px] bg-white shadow-xl rounded-xl"></div>
      </div>

      {/* RIGHT SIDE PANEL (500px SIDEBAR) */}
      <div className="w-[500px] h-[805px] bg-white rounded-xl shadow-xl flex flex-col p-6">
        {/* SEARCH + FILTERS (fixed at top) */}
        <div className="flex flex-col gap-2">
          {/* SEARCH BAR */}
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 pl-10"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <MdSearch size={20} />
            </span>
          </div>

          {/* FILTERS BLOCK */}
          <div className="w-full grid grid-cols-3 gap-3">
            <select className="border border-gray-300 rounded-lg px-3 py-2">
              <option>Date</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2">
              <option>Project</option>
            </select>
            <button className="w-full bg-blue-950 text-white py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
              <MdOutlineTune size={20} /> Apply
            </button>
          </div>
        </div>

        {/* LIST OF SURVEYS (scrollable) */}
        <div className="w-full flex-1 mt-6 overflow-y-auto flex flex-col gap-4">
          {filtered.map((survey) => (
            <div
              key={survey._id}
              onClick={() => {
                setFlyTo([survey.lat, survey.lon]);
                setTimeout(() => {
                  const marker = markerRefs.current[survey._id];
                  if (marker) marker.openPopup();
                }, 1200);
              }}
              className="w-full border border-gray-300 rounded-lg p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center justify-between mb-1">
                <b className="text-lg">{survey.name}</b>
                <div
                  className={`badge text-white ${
                    survey.projectReceived === "Capture"
                      ? "badge-error"
                      : survey.projectReceived === "Aquaculture"
                      ? "badge-warning"
                      : survey.projectReceived === "Post-harvest"
                      ? "badge-accent"
                      : survey.projectReceived === "Techno-demo"
                      ? "badge-info"
                      : survey.projectReceived === "Others"
                      ? "badge-success"
                      : "badge bg-gray-300"
                  }`}
                >
                  {survey.projectReceived}
                </div>
              </div>

              <div className="text-gray-700 text-sm">
                {survey.province}, {survey.municipality}, {survey.district},{" "}
                {survey.baranggay}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyMap;
