import "leaflet/dist/leaflet.css";
import { MdSearch, MdOutlineTune } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import { DivIcon } from "leaflet";

import kzylImage from "../assets/images/kzyl.jpg";
import chellaImage from "../assets/images/chella.jpg";
import teodyImage from "../assets/images/teody.jpg";
import lessieImage from "../assets/images/lessie.png";
import jaojaoImage from "../assets/images/jaojao.jpg";

const images = [
  { src: chellaImage, alt: "Chella", name: "Chella Mae Dayanan" },
  { src: teodyImage, alt: "Teody", name: "Teody Demapanag" },
  { src: kzylImage, alt: "Kzyl", name: "Kzyl Mae Albiso" },
  { src: lessieImage, alt: "Lessie", name: "Lesie Rose Rodriguez" },
  { src: jaojaoImage, alt: "Jaojao", name: "Joahra May Cañete" },
];

const iconMap = {
  Capture: ["🎣", "#FFFFFF"],
  Aquaculture: ["🐟", "#FFFFFF"],
  "Post-harvest": ["📦", "#FFFFFF"],
  "Techno-demo": ["🧪", "#FFFFFF"],
  Others: ["✨", "#FFFFFF"],
};

const createDivIconHtml = (emoji, color) => {
  return `
        <div style="
            background-color: ${color};
            width: 30px; 
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.4);
            border: 2px solid white;
            font-size: 16px;
        ">
            ${emoji}
        </div>
    `;
};

const getCustomIcon = (projectType) => {
  const [emoji, color] = iconMap[projectType] || iconMap["Others"];
  const htmlContent = createDivIconHtml(emoji, color);

  return new DivIcon({
    html: htmlContent,
    className: "custom-div-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -15],
  });
};

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

  const [areaFilter, setAreaFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");

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

  const uniqueProvinces = useMemo(() => {
    const provinces = new Set(surveys.map((s) => s.province).filter(Boolean));
    return Array.from(provinces).sort();
  }, [surveys]);

  const uniqueProjectTypes = useMemo(() => {
    const projects = new Set(
      surveys.map((s) => s.projectReceived).filter(Boolean)
    );
    return Array.from(projects).sort();
  }, [surveys]);

  const applyFilters = () => {
    let results = surveys;

    if (areaFilter) {
      results = results.filter(
        (item) => item.province.toLowerCase() === areaFilter.toLowerCase()
      );
    }

    if (projectFilter) {
      results = results.filter(
        (item) =>
          item.projectReceived.toLowerCase() === projectFilter.toLowerCase()
      );
    }

    setFiltered(results);
  };

  useEffect(() => {
    const s = search.toLowerCase();

    let results = surveys;

    if (areaFilter) {
      results = results.filter(
        (item) => item.province.toLowerCase() === areaFilter.toLowerCase()
      );
    }

    if (projectFilter) {
      results = results.filter(
        (item) =>
          item.projectReceived.toLowerCase() === projectFilter.toLowerCase()
      );
    }

    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(s) ||
        item.projectReceived.toLowerCase().includes(s) ||
        item.province.toLowerCase().includes(s) ||
        item.municipality.toLowerCase().includes(s) ||
        item.baranggay.toLowerCase().includes(s)
    );

    setFiltered(results);
  }, [search, surveys, areaFilter, projectFilter]);

  return (
    <div className="flex-1 flex gap-6 p-10">
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
                  icon={getCustomIcon(survey.projectReceived)}
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

        <div className="w-full h-[200px] grid grid-cols-6 gap-6">
      {images.map((image) => (
        <div
          key={image.name}
          className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer
                     transition-all duration-300 ease-in-out 
                     hover:shadow-xl hover:scale-[1.03]" 
        >
          <div className="h-[150px] w-full overflow-hidden p-2 rounded">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded"
            />
          </div>

          <div className="flex items-center justify-center bg-gray-50 border-t border-gray-100 py-2">
            <p className="text-center text-xs font-semibold text-gray-800 capitalize truncate">
              {image.name}
            </p>
          </div>
        </div>
      ))}
    </div>
      </div>

      <div className="w-[500px] h-[805px] bg-white rounded-xl shadow-sm flex flex-col p-6">
        <div className="flex flex-col gap-2">
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

          <div className="w-full grid grid-cols-2 gap-3">
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">All Area</option>
              {uniqueProvinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">All Project</option>
              {uniqueProjectTypes.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex-1 mt-6 overflow-y-auto flex flex-col gap-4">
          {filtered.map((survey) => {
            const [emoji] =
              iconMap[survey.projectReceived] || iconMap["Others"];

            return (
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
                  <div className="flex items-center gap-2">
                    <div
                      className={`badge text-white ${
                        survey.projectReceived === "Capture"
                          ? "bg-red-500"
                          : survey.projectReceived === "Aquaculture"
                          ? "bg-yellow-500"
                          : survey.projectReceived === "Post-harvest"
                          ? "bg-purple-500"
                          : survey.projectReceived === "Techno-demo"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      } px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {survey.projectReceived}
                    </div>
                    <div className="text-xl leading-none">{emoji}</div>
                  </div>
                </div>

                <div className="text-gray-700 text-sm">
                  {survey.province}, {survey.municipality}, {survey.district},{" "}
                  {survey.baranggay}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SurveyMap;
