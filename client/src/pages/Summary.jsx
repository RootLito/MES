import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { format } from "date-fns";
import { MdMale, MdFemale } from "react-icons/md";

import net from "./../assets/images/net.png";
import carps from "./../assets/images/carps.png";
import freezer from "./../assets/images/freezer.png";
import robotic from "./../assets/images/robotic.png";
import fishing from "./../assets/images/fishing.png";
import calendar from "./../assets/images/calendar.png";
import gender from "./../assets/images/gender.png";
import money from "./../assets/images/money.png";
import coin from "./../assets/images/coin.png";
import users from "./../assets/images/users.png";
import status from "./../assets/images/status.png";

const Summary = () => {
  const currentDate = new Date();
  const date = format(currentDate, "MM/dd/yyyy");
  const location = useLocation();
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [totalRes, setTotalRes] = useState(0);
  const [data, setData] = useState([]);
  const [provinceData, setProvinceData] = useState({});
  const [barangayData, setBarangayData] = useState({});
  const [fishingCount, setFishingCount] = useState(0);
  const [agriCount, setAgriCount] = useState(0);
  const [othersCount, setOthersCount] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [otherIncomeBarData, setOtherIncomeBarData] = useState(null);
  const [incomeTypes, setIncomeTypes] = useState([]);
  const [incomeCounts, setIncomeCounts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [capture, setCapture] = useState(0);
  const [culture, setCulture] = useState(0);
  const [post, setPost] = useState(0);
  const [techno, setTechno] = useState(0);
  const [other, setOther] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [allMun, setAllMun] = useState([]);
  const [selectedMunicipalities, setSelectedMunicipalities] = useState([]);
  const [surveys, setSurveys] = useState([]);
  // Municipality counts now holds an array of {province, municipality, count} objects
  const [municipalityCounts, setMunicipalityCounts] = useState({});
  // Barangay now holds an array of {province, municipality, barangay, count} objects
  const [barangay, setBarangay] = useState([]);
  const [allBarangaysSelected, setAllBarangaysSelected] = useState(false);

  const [civilStatusCounts, setCivilStatusCounts] = useState({
    Single: 0,
    Married: 0,
    Widowed: 0,
    Divorced: 0,
    Separated: 0,
  });

  // NEW STATES FOR FILTERING AND SEARCH
  const [filterBy, setFilterBy] = useState("Province");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  // ------------------------------------

  const fetchSurveys = async () => {
    try {
      const response = await axios.get(
        "https://bfar-server.onrender.com/survey"
      );
      const surveys = response.data;

      setSurveys(surveys);
      setTotalRes(surveys.length);

      // SPECIFIC PROJECTS
      const cap = surveys.filter(
        (survey) => survey.projectReceived === "Capture"
      ).length;
      setCapture(cap);

      const cul = surveys.filter(
        (survey) => survey.projectReceived === "Aquaculture"
      ).length;
      setCulture(cul);

      const po = surveys.filter(
        (survey) => survey.projectReceived === "Post-harvest"
      ).length;
      setPost(po);

      const tech = surveys.filter(
        (survey) => survey.projectReceived === "Techno-demo"
      ).length;
      setTechno(tech);

      const ot = surveys.filter(
        (survey) =>
          !["Capture", "Aquaculture", "Post-harvest", "Techno-demo"].includes(
            survey.projectReceived
          )
      ).length;
      setOther(ot);

      //  MAIN INCOME
      const fishing = surveys.filter(
        (survey) => survey.mainIncome === "Fishing"
      ).length;
      setFishingCount(fishing);

      const agri = surveys.filter(
        (survey) => survey.mainIncome === "Agri"
      ).length;
      setAgriCount(agri);

      const others = surveys.filter(
        (survey) =>
          survey.mainIncome !== "Fishing" && survey.mainIncome !== "Agri"
      ).length;
      setOthersCount(others);

      //  OTHER INCOME
      const othersInc = surveys.filter(
        (survey) =>
          survey.mainIncome !== "Fishing" && survey.mainIncome !== "Agri"
      );

      const otherIncomeCounts = othersInc.reduce((acc, survey) => {
        const income = survey.otherIncome;
        acc[income] = (acc[income] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(otherIncomeCounts);
      setIncomeTypes(labels);
      const counts = Object.values(otherIncomeCounts);
      setIncomeCounts(counts);

      const provinceCounts = surveys.reduce((acc, survey) => {
        acc[survey.province] = (acc[survey.province] || 0) + 1;
        return acc;
      }, {});
      setProvinceData(provinceCounts);

      // Initial comprehensive count for all barangays (used for filter)
      const allBarangayCounts = surveys.reduce((acc, survey) => {
        const key = `${survey.province}__${survey.municipality}__${survey.baranggay}`;
        acc[key] = {
          province: survey.province,
          municipality: survey.municipality,
          barangay: survey.baranggay,
          count: (acc[key]?.count || 0) + 1,
        };
        return acc;
      }, {});
      setBarangay(Object.values(allBarangayCounts)); // Array of {province, municipality, barangay, count}

      // Initial comprehensive count for all municipalities (used for filter)
      const allMunicipalityCounts = surveys.reduce((acc, survey) => {
        const key = `${survey.province}__${survey.municipality}`;
        acc[key] = {
          province: survey.province,
          municipality: survey.municipality,
          count: (acc[key]?.count || 0) + 1,
        };
        return acc;
      }, {});
      setMunicipalityCounts(Object.values(allMunicipalityCounts)); // Array of {province, municipality, count}

      const male = surveys.filter((survey) => survey.sex === "male").length;
      const female = surveys.filter((survey) => survey.sex === "female").length;
      setMaleCount(male);
      setFemaleCount(female);

      const ageGroups = {
        "17 below": 0,
        "18-24": 0,
        "25-39": 0,
        "40-59": 0,
        "60 and Above": 0,
      };
      surveys.forEach(({ age }) => {
        if (age < 18) ageGroups["17 below"]++;
        else if (age >= 18 && age <= 24) ageGroups["18-24"]++;
        else if (age >= 25 && age <= 39) ageGroups["25-39"]++;
        else if (age >= 40 && age <= 59) ageGroups["40-59"]++;
        else ageGroups["60 and Above"]++;
      });

      setData(
        Object.entries(ageGroups).map(([name, value]) => ({ name, value }))
      );

      const statCounts = {
        Single: surveys.filter((survey) => survey.civilStatus === "single")
          .length,
        Married: surveys.filter((survey) => survey.civilStatus === "married")
          .length,
        Widowed: surveys.filter((survey) => survey.civilStatus === "widowed")
          .length,
        Divorced: surveys.filter((survey) => survey.civilStatus === "divorced")
          .length,
        Separated: surveys.filter(
          (survey) => survey.civilStatus === "separated"
        ).length,
      };

      setCivilStatusCounts(statCounts);
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  // FETCH PROVINCES ----------------------
  useEffect(() => {
    axios
      .get("https://psgc.cloud/api/regions/1100000000/provinces")
      .then((res) => {
        setProvinces(res.data);
      })
      .catch((err) => {
        console.error("Error fetching provinces:", err);
      });
  }, []);

  // FILTER PROV, MUN, BAR COUNTS ---------------------------
  // This useEffect is currently designed to filter by selectedProvinces, which is for other parts of your app.
  // I will keep the original logic and add a separate useEffect for the new feature's filtering.
  useEffect(() => {
    const filteredSurveys = surveys.filter((survey) =>
      selectedProvinces.includes(survey.province)
    );

    // Barangay-level count for selected provinces
    const barangayCounts = {};
    filteredSurveys.forEach(({ province, municipality, baranggay }) => {
      // Note: Use 'baranggay' from survey object, but store as 'barangay' for consistency
      const key = `${province}__${municipality}__${baranggay}`;
      if (!barangayCounts[key]) {
        barangayCounts[key] = {
          province,
          municipality,
          barangay: baranggay, // assign to correct key
          count: 0,
        };
      }
      barangayCounts[key].count += 1;
    });

    // Municipality-level count for selected provinces
    const municipalityCounts = {};
    filteredSurveys.forEach(({ province, municipality }) => {
      const key = `${province}__${municipality}`;
      if (!municipalityCounts[key]) {
        municipalityCounts[key] = {
          province,
          municipality,
          count: 0,
        };
      }
      municipalityCounts[key].count += 1;
    });

    // The states below are used by other parts of your component, so we update them with the filtered data.
    // setBarangayData(Object.values(barangayCounts)); // This was setBarangayData previously, but the original code used setBarangayData for an object and setBarangay for an array. Sticking to original state usage as much as possible.
    // setMunicipalityCounts(Object.values(municipalityCounts)); // This is for other parts of your component.

    // Additionally, derive all unique municipalities for the 'allMun' state (used for select all municipalities)
    const allUniqueMunicipalities = Array.from(
      new Set(surveys.map((s) => s.municipality))
    );
    setAllMun(allUniqueMunicipalities.map((name) => ({ name }))); // Simple array of objects for the municipal select logic
  }, [selectedProvinces, surveys]);

  // Handle Municipality change logic (keeping original logic for consistency)
  useEffect(() => {
    const filteredSurveys = surveys.filter((survey) =>
      selectedMunicipalities.includes(survey.municipality)
    );

    const barangayCounts = {};
    filteredSurveys.forEach(({ province, municipality, baranggay }) => {
      const key = `${province}__${municipality}__${baranggay}`;
      if (!barangayCounts[key]) {
        barangayCounts[key] = {
          province,
          municipality,
          barangay: baranggay,
          count: 0,
        };
      }
      barangayCounts[key].count += 1;
    });

    // setBarangay(Object.values(barangayCounts)); // This is the array for barangay counts
  }, [selectedMunicipalities, surveys]);

  // **********************************************
  // NEW FILTERING LOGIC FOR THE TARGETED SECTION
  // **********************************************
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    let results = [];

    // 1. Determine the relevant data source based on `filterBy`
    let dataToFilter = [];
    let nameKey = ""; // Key to get the location name
    let countKey = ""; // Key to get the count

    if (filterBy === "Province") {
      // Use provinceData which is an object of {ProvinceName: count}
      dataToFilter = Object.entries(provinceData).map(([name, count]) => ({
        name,
        count,
      }));
      nameKey = "name";
      countKey = "count";
    } else if (filterBy === "Municipality") {
      // Use municipalityCounts which is an array of {province, municipality, count}
      // Group the counts by municipality name, as a municipality might appear in multiple provinces
      const munCountMap = municipalityCounts.reduce((acc, item) => {
        acc[item.municipality] = (acc[item.municipality] || 0) + item.count;
        return acc;
      }, {});
      dataToFilter = Object.entries(munCountMap).map(([name, count]) => ({
        name,
        count,
      }));
      nameKey = "name";
      countKey = "count";
    } else if (filterBy === "Barangay") {
      // Use barangay which is an array of {province, municipality, barangay, count}
      // Group the counts by barangay name (assuming barangay names are unique enough or aggregation is intended)
      const barCountMap = barangay.reduce((acc, item) => {
        acc[item.barangay] = (acc[item.barangay] || 0) + item.count;
        return acc;
      }, {});
      dataToFilter = Object.entries(barCountMap).map(([name, count]) => ({
        name,
        count,
      }));
      nameKey = "name";
      countKey = "count";
    }

    // 2. Apply search filter
    if (term) {
      results = dataToFilter.filter((item) =>
        item[nameKey].toLowerCase().includes(term)
      );
    } else {
      // If no search term, show all results
      results = dataToFilter;
    }

    // Sort results alphabetically by name
    results.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredResults(results);
  }, [filterBy, searchTerm, provinceData, municipalityCounts, barangay]);

  // Handlers for the new section
  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
    setSearchTerm(""); // Reset search term when changing filter type
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // **********************************************
  // END NEW FILTERING LOGIC
  // **********************************************

  // KEEPING ORIGINAL HANDLERS FOR OTHER PARTS
  const handleCheckboxChange = (provinceName) => {
    setSelectedProvinces((prev) =>
      prev.includes(provinceName)
        ? prev.filter((name) => name !== provinceName)
        : [...prev, provinceName]
    );
  };

  const handleMunicipalityChange = (name) => {
    setSelectedMunicipalities((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((n) => n !== name)
        : [...prevSelected, name]
    );
  };

  const handleSelectAllProvinces = (e) => {
    if (e.target.checked) {
      setSelectedProvinces(provinces.map((province) => province.name));
    } else {
      setSelectedProvinces([]);
    }
  };
  const allProvincesSelected =
    provinces.length > 0 && selectedProvinces.length === provinces.length;

  const handleSelectAllMunicipalities = (e) => {
    if (e.target.checked) {
      setSelectedMunicipalities(allMun.map((mun) => mun.name));
    } else {
      setSelectedMunicipalities([]);
    }
  };

  const allMunicipalitiesSelected =
    allMun.length > 0 && selectedMunicipalities.length === allMun.length;
  // END KEEPING ORIGINAL HANDLERS

  useEffect(() => {
    fetchSurveys();
  }, [location.pathname]);

  // Chart useEffects (kept as original)
  useEffect(() => {
    setChartData(null);

    setTimeout(() => {
      setChartData({
        series: data.map((item) => item.value),
        options: {
          chart: {
            type: "donut",
            animations: {
              enabled: true,
              easing: "easeinout",
              speed: 1500,
              animateGradually: {
                enabled: true,
                delay: 200,
              },
              dynamicAnimation: {
                enabled: true,
                speed: 1000,
              },
            },
          },
          labels: data.map((item) => item.name),
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            itemMargin: {
              horizontal: 10,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      });
    }, 1000);
  }, [location.pathname, data]);

  //MAIN INCOME BAR CHART
  useEffect(() => {
    setTimeout(() => {
      setBarData({
        series: [
          {
            data: [
              {
                x: "Fishing",
                y: fishingCount,
                fillColor: "#FF5733",
              },
              {
                x: "Agri",
                y: agriCount,
                fillColor: "#12db35",
              },
              {
                x: "Others",
                y: othersCount,
              },
            ],
          },
        ],
        options: {
          chart: {
            type: "bar",
            height: "100%",
            toolbar: { show: false },
            padding: { bottom: 0 },
          },
          plotOptions: {
            bar: { borderRadius: 0, horizontal: true },
          },
          dataLabels: { enabled: true },
          yaxis: {
            categories: ["Fishing", "Agri", "Others"],
            labels: { style: { fontSize: "14px" } },
          },
          xaxis: {
            categories: ["Fishing", "Agri", "Others"],
          },
          tooltip: {
            y: {
              title: {
                formatter: () => "Total:",
              },
            },
          },
        },
      });
    }, 2000);
  }, [fishingCount, agriCount, othersCount, location.pathname]);

  //OTHER INCOME BAR CHART
  useEffect(() => {
    setTimeout(() => {
      setOtherIncomeBarData({
        series: [{ data: incomeCounts }],
        options: {
          chart: {
            type: "bar",
            height: "100%",
            toolbar: { show: false },
            padding: { bottom: 0 },
          },
          plotOptions: {
            bar: { borderRadius: 0, horizontal: true },
          },
          dataLabels: { enabled: true },
          yaxis: {
            categories: incomeTypes,
            labels: { style: { fontSize: "14px" } },
          },
          xaxis: {
            categories: incomeTypes,
          },
          tooltip: {
            y: {
              title: {
                formatter: () => "Total:",
              },
            },
          },
        },
      });
    }, 2000);
  }, [incomeTypes, incomeCounts, location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-5 p-10">
      <div className="w-full h-18 flex bg-white rounded-lg shadow-sm p-5 items-center justify-between">
        <h1 className="text-2xl font-black text-blue-950">
          Demographic Profile
        </h1>

        <h1 className="text-lg font-black text-gray-700 bg-gray-200 p-2 rounded-lg">
          Total no. of respondents as of {date} ={" "}
          <span className="text-success text-2xl">{totalRes}</span>
        </h1>
      </div>

      <div className="w-full">
        <div className="divider">
          <span className="text-xl font-black text-gray-500">
            Interventions Received
          </span>
        </div>

        <div className="w-full h-36 grid grid-cols-5 gap-5">
          <div className="flex flex-col bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2">
              <img src={net} alt="" />
              <p className="font-black text-xl text-blue-950">Capture</p>
            </div>
            {/* <p className="text-sm text-gray-600">Interventions Received</p> */}

            {isVisible ? (
              <div className="flex-1 flex justify-end items-end">
                <h1 className="font-black text-5xl text-gray-700">{capture}</h1>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            )}
          </div>
          <div className="flex flex-col bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2">
              <img src={carps} alt="" />
              <p className="font-black text-xl text-blue-950">Aquaculture</p>
            </div>
            {/* <p className="text-sm text-gray-600">Interventions Received</p> */}

            {isVisible ? (
              <div className="flex-1 flex justify-end items-end">
                <h1 className="font-black text-5xl text-gray-700">{culture}</h1>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            )}
          </div>
          <div className="flex flex-col bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2">
              <img src={freezer} alt="" />
              <p className="font-black text-xl text-blue-950">Post-harvest</p>
            </div>
            {/* <p className="text-sm text-gray-600">Interventions Received</p> */}

            {isVisible ? (
              <div className="flex-1 flex justify-end items-end">
                <h1 className="font-black text-5xl text-gray-700">{post}</h1>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            )}
          </div>

          <div className="flex flex-col bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2">
              <img src={robotic} alt="" />
              <p className="font-black text-xl text-blue-950">Techno-demo</p>
            </div>
            {/* <p className="text-sm text-gray-600">Interventions Received</p> */}

            {isVisible ? (
              <div className="flex-1 flex justify-end items-end">
                <h1 className="font-black text-5xl text-gray-700">{techno}</h1>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            )}
          </div>

          <div className="flex flex-col bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2">
              <img src={fishing} alt="" />
              <p className="font-black text-xl text-blue-950">Others</p>
            </div>
            {/* <p className="text-sm text-gray-600">Interventions Received</p> */}

            {isVisible ? (
              <div className="flex-1 flex justify-end items-end">
                <h1 className="font-black text-5xl text-gray-700">{other}</h1>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MID ------------------------ */}

      <div className="w-full flex gap-5">
        <div className="flex flex-col gap-5 w-1/2">
          <div className="flex flex-col p-6 rounded-box bg-white shadow-sm">
            <div className="flex gap-2 items-center">
              <img src={calendar} alt="" />
              <p className="font-black text-xl text-blue-950">Age Bracket</p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {chartData ? (
                <div className="flex-1 p-2">
                  <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="donut"
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <span className="loading loading-spinner loading-xl"></span>
              )}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-5">
            <div className="flex flex-col rounded-box bg-white shadow-sm p-5">
              <div className="flex gap-2 items-center">
                <img src={gender} alt="" />
                <p className="font-black text-xl text-blue-950"> Sex</p>
              </div>

              <div className="flex flex-1 items-center justify-evenly">
                {isVisible ? (
                  <>
                    {/* Your content here, after the delay */}
                    <div className="flex gap-2 items-center flex-col">
                      <MdMale
                        size={52}
                        className="bg-blue-100 rounded-full p-2 text-blue-900"
                      />
                      <div className="data">
                        <p className="text-4xl font-black text-blue-950 text-center">
                          {maleCount}
                        </p>
                        <p className="text-md italic font-semibold text-gray-500">
                          Male
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center flex-col">
                      <MdFemale
                        size={52}
                        className="bg-red-100 rounded-full p-2 text-red-700"
                      />
                      <div className="data">
                        <p className="text-4xl font-black text-red-800 text-center">
                          {femaleCount}
                        </p>
                        <p className="text-md italic font-semibold text-gray-500">
                          Female
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <span className="loading loading-spinner loading-xl"></span>
                )}
              </div>
            </div>

            <div className="flex flex-col rounded-box bg-white shadow-sm p-5">
              <div className="flex gap-2 items-center">
                <img src={status} alt="" />
                <p className="font-black text-xl text-blue-950">Civil Status</p>
              </div>
              {isVisible ? (
                <div className="flex-1 flex gap-5 items-center justify-between mt-2">
                  <>
                    <div className="flex flex-col justify-center gap-1">
                      <p className="text-sm text-gray-600">Single</p>
                      <p className="text-sm text-gray-600">Married</p>
                      <p className="text-sm text-gray-600">Widowed</p>
                      <p className="text-sm text-gray-600">Divorced</p>
                      <p className="text-sm text-gray-600">Separated</p>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      <div className="badge badge-soft badge-primary font-black">
                        {civilStatusCounts.Single}
                      </div>
                      <div className="badge badge-soft badge-secondary font-black">
                        {civilStatusCounts.Married}
                      </div>
                      <div className="badge badge-soft badge-accent font-black">
                        {civilStatusCounts.Widowed}
                      </div>
                      <div className="badge badge-soft badge-info font-black">
                        {civilStatusCounts.Divorced}
                      </div>
                      <div className="badge badge-soft badge-success font-black">
                        {civilStatusCounts.Separated}
                      </div>
                    </div>
                  </>
                </div>
              ) : (
                <span className="loading loading-spinner loading-xl block mx-auto"></span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-1/2">
          <div className=" bg-white rounded-box shadow-sm p-6 flex flex-col">
            <div className="flex gap-2 items-center">
              <img src={money} alt="" />
              <p className="font-black text-xl text-blue-950">
                {" "}
                Main Source of Income
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {barData ? (
                <div className="flex-1 h-full">
                  <ReactApexChart
                    key={JSON.stringify(barData)}
                    options={barData.options}
                    series={barData.series}
                    type="bar"
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <span className="loading loading-spinner loading-xl"></span>
              )}
            </div>
          </div>

          <div className=" bg-white rounded-box shadow-sm p-6 flex flex-col">
            <div className="flex gap-2 items-center">
              <img src={coin} alt="" />
              <p className="font-black text-xl text-blue-950">
                Other Source of Income
              </p>
            </div>
            {/* <div className="flex-1 flex items-center justify-center">
              {otherIncomeBarData ? (
                <div className="flex-1 h-full">
                  <ReactApexChart
                    key={JSON.stringify(otherIncomeBarData)}
                    options={otherIncomeBarData.options}
                    series={otherIncomeBarData.series}
                    type="bar"
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <span className="loading loading-spinner loading-xl"></span>
              )}
            </div> */}

            <div className="flex-1 flex items-center justify-center">
              {incomeCounts.length > 0 || incomeTypes.length > 0 ? (
                <ReactApexChart
                  options={{
                    labels: incomeTypes,
                    legend: { position: "right" },
                  }}
                  series={incomeCounts}
                  type="pie"
                  width={420}
                  height={420}
                />
              ) : (
                <span className="loading loading-spinner loading-xl"></span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MID ---------------------------- */}

      <div className="w-full grid grid-cols-6 gap-6">
        <div className="card h-full bg-white shadow-sm">
          <div className="card-body">
            <h2 className="font-black text-xl text-blue-950">Davao City</h2>
            <p className="text-xs mt-0">No. of Respondents</p>
            <h1 className="font-black text-5xl text-blue-950">
              {provinceData["Davao City"] || 0}
            </h1>
          </div>
        </div>

        <div className="card h-full bg-white shadow-sm">
          <div className="card-body">
            <h2 className="font-black text-xl text-blue-950">
              Davao del Norte
            </h2>
            <p className="text-xs mt-0">No. of Respondents</p>
            <h1 className="font-black text-5xl text-blue-950">
              {provinceData["Davao del Norte"] || 0}
            </h1>
          </div>
        </div>

        <div className="card h-full bg-white shadow-sm">
          <div className="card-body">
            <h2 className="font-black text-xl text-blue-950">Davao del Sur</h2>
            <p className="text-xs mt-0">No. of Respondents</p>
            <h1 className="font-black text-5xl text-blue-950">
              {provinceData["Davao del Sur"] || 0}
            </h1>
          </div>
        </div>

        <div className="card h-full bg-white shadow-sm">
          <div className="card-body ">
            <h2 className="font-black text-xl text-blue-950">Davao Oriental</h2>
            <p className="text-xs mt-0">No. of Respondents</p>
            <h1 className="font-black text-5xl text-blue-950">
              {provinceData["Davao Oriental"] || 0}
            </h1>
          </div>
        </div>

        <div className="card h-full bg-white shadow-sm">
          <div className="card-body">
            <h2 className="font-black text-xl text-blue-950">Davao de Oro</h2>
            <p className="text-xs mt-0">No. of Respondents</p>
            <h1 className="font-black text-5xl text-blue-950">
              {provinceData["Davao de Oro"] || 0}
            </h1>
          </div>
        </div>

        <div className="card h-full bg-white shadow-sm">
          <div className="card-body">
            <h2 className="font-black text-xl text-blue-950">
              Davao Occidental
            </h2>
            <p className="text-xs mt-0">No. of Respondents</p>
            <h1 className="font-black text-5xl text-blue-950">
              {provinceData["Davao Occidental"] || 0}
            </h1>
          </div>
        </div>
      </div>

      {/* MODIFIED FILTERING SECTION */}
      <div className="w-full min-h-[400px] rounded-lg bg-white shadow-sm p-6">
        <h3 className="text-xl font-black text-blue-950 mb-4">
          Location-Based Respondent Count
        </h3>
        <div className="flex items-center gap-4 mb-4">
          <select
            className="select select-bordered w-48"
            value={filterBy}
            onChange={handleFilterChange}
          >
            <option disabled value="">
              Filter by
            </option>
            <option value="Province">Province</option>
            <option value="Municipality">Municipality</option>
            <option value="Barangay">Barangay</option>
          </select>

          <label className="input input-bordered flex items-center gap-2 w-full">
            <input
              type="text"
              className="grow"
              placeholder={`Search ${filterBy}...`}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        {/* Display Filtered Results */}
        <div className="mt-4 max-h-[300px] overflow-y-auto">
          {filteredResults.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="font-bold text-blue-950">{filterBy} Name</th>
                  <th className="font-bold text-blue-950 text-right">
                    Respondent Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((item, index) => (
                  <tr key={index}>
                    <td className="font-medium text-gray-700">{item.name}</td>
                    <td className="text-right">
                      <div className="font-black  text-blue-950 text-2xl">
                        {item.count}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 italic p-4">
              {searchTerm
                ? `No results found for "${searchTerm}" in ${filterBy}.`
                : `Search a ${filterBy} name to see the count.`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
