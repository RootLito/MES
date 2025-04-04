import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MdMale, MdFemale } from "react-icons/md";
import { FaCoins, FaCalendarDay } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import ReactApexChart from "react-apexcharts";
import { XAxis } from "recharts";

const Dashboard = () => {
  const location = useLocation();
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [totalRes, setTotalRes] = useState(0);
  const [data, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Province");
  const [provinceData, setProvinceData] = useState({});
  const [municipalityData, setMunicipalityData] = useState({});
  const [barangayData, setBarangayData] = useState({});

  const handleTabChange = (event) => {
    setSelectedTab(event.target.getAttribute("aria-label"));
  };

  const fetchSurveys = async () => {
    try {
      const response = await axios.get("http://localhost:5000/survey");
      const surveys = response.data;
      setTotalRes(surveys.length);

      // Calculate the counts for Province
      const provinceCounts = surveys.reduce((acc, survey) => {
        acc[survey.province] = (acc[survey.province] || 0) + 1;
        return acc;
      }, {});
      setProvinceData(provinceCounts);

      // Calculate the counts for Municipality
      const municipalityCounts = surveys.reduce((acc, survey) => {
        acc[survey.municipality] = (acc[survey.municipality] || 0) + 1;
        return acc;
      }, {});
      setMunicipalityData(municipalityCounts);

      // Calculate the counts for Barangay
      const barangayCounts = surveys.reduce((acc, survey) => {
        acc[survey.baranggay] = (acc[survey.baranggay] || 0) + 1;
        return acc;
      }, {});
      setBarangayData(barangayCounts);

      // Calculate male and female count
      const male = surveys.filter((survey) => survey.sex === "Male").length;
      const female = surveys.filter((survey) => survey.sex === "Female").length;
      setMaleCount(male);
      setFemaleCount(female);

      // Categorize age groups for the chart
      const ageGroups = {
        "18-24": 0,
        "25-39": 0,
        "40-59": 0,
        "60 and Above": 0,
      };
      surveys.forEach(({ age }) => {
        if (age >= 18 && age <= 24) ageGroups["18-24"]++;
        else if (age >= 25 && age <= 39) ageGroups["25-39"]++;
        else if (age >= 40 && age <= 59) ageGroups["40-59"]++;
        else ageGroups["60 and Above"]++;
      });

      setData(
        Object.entries(ageGroups).map(([name, value]) => ({ name, value }))
      );
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, [location.pathname]);

  const chartData = {
    series: data.map((item) => item.value),
    options: {
      chart: {
        type: "donut",
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
  };

  const barData = {
    series: [
      {
        data: [302, 201, 448],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: "100%",
        toolbar: {
          show: false,
        },
        padding: {
          bottom: 0,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      yaxis: {
        categories: ["Fishing", "Agri", "Others"],
        labels: { 
            style: {
              fontSize: '14px' ,
            }
          },
      },
      xaxis: {
        categories: ["Fishing", "Agri", "Others"],
      },
      tooltip: {
        y: {
          title: {
            formatter: function (seriesName) {
              return 'Total:'; 
            }
          }
        }
      }
    },
  };

  return (
    <div className="w-full h-full flex gap-10 p-10">
      <div className="flex flex-1 flex-col gap-10">
        <div className="h-1/2 grid grid-cols-[2fr_1fr] gap-10">
          <div className="flex flex-col p-6 rounded-box bg-white shadow-sm">
            <div className="flex gap-2 items-center">
              <FaCalendarDay size={20} className="text-blue-950" />
              <p className="font-black text-xl text-blue-950">Age Bracket</p>
            </div>

            <div className="flex-1 p-2">
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="donut"
                width="100%"
                height="100%"
              />
            </div>
          </div>

          <div className="flex flex-col p-6 rounded-box bg-white shadow-sm">
            <div className="flex gap-2 items-center">
              <BiMaleFemale size={24} className="text-blue-950" />
              <p className="font-black text-xl text-blue-950"> Sex</p>
            </div>

            <div className="flex flex-1 items-center justify-evenly">
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
                  className="bg-blue-100 rounded-full p-2 text-blue-900"
                />
                <div className="data">
                  <p className="text-4xl font-black text-blue-950 text-center">
                    {femaleCount}
                  </p>
                  <p className="text-md italic font-semibold text-gray-500">
                    Female
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-1/2 bg-white rounded-box shadow-sm p-6 flex flex-col">
          <div className="flex gap-2 items-center">
            <FaCoins size={22} className="text-blue-950" />
            <p className="font-black text-xl text-blue-950"> Income Source</p>
          </div>
          <div className="flex-1">
            <ReactApexChart
              options={barData.options}
              series={barData.series}
              type="bar"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>

      <div className="w-[500px] max-h-[calc(100vh - 84px)] flex flex-col rounded-box shadow-sm">
        <div className="card h-full bg-white shadow-sm">
          <div className="card-body">
            <span className="font-black text-xl text-blue-950">
              Monitoring and Evaluation Distribution
            </span>

            <div className="tabs tabs-lift mt-6">
              <input
                type="radio"
                name="my_tabs_3"
                className="tab"
                aria-label="Province"
                defaultChecked
                onChange={handleTabChange}
              />
              <div className="tab-content bg-base-100 border-base-300 p-6 h-full">
                {selectedTab === "Province" && (
                  <div>
                    <table className="table table-zebra w-full">
                      <thead>
                        <tr className="bg-blue-950 text-white ">
                          <th>Province</th>
                          <th>Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(provinceData).map(
                          ([province, count]) => (
                            <tr key={province}>
                              <td>{province}</td>
                              <td>{count}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <input
                type="radio"
                name="my_tabs_3"
                className="tab"
                aria-label="Municipality"
                onChange={handleTabChange}
              />
              <div className="tab-content bg-base-100 border-base-300 p-6">
                {selectedTab === "Municipality" && (
                  <div>
                    <table className="table table-zebra w-full">
                      <thead>
                        <tr className="bg-blue-950 text-white ">
                          <th>Municipality</th>
                          <th>Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(municipalityData).map(
                          ([municipality, count]) => (
                            <tr key={municipality}>
                              <td>{municipality}</td>
                              <td>{count}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <input
                type="radio"
                name="my_tabs_3"
                className="tab"
                aria-label="Barangay"
                onChange={handleTabChange}
              />
              <div className="tab-content bg-base-100 border-base-300 p-6">
                {selectedTab === "Barangay" && (
                  <div>
                    <table className="table table-zebra w-full ">
                      <thead>
                        <tr className="bg-blue-950 text-white ">
                          <th>Barangay</th>
                          <th>Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(barangayData).map(
                          ([barangay, count]) => (
                            <tr key={barangay}>
                              <td>{barangay}</td>
                              <td>{count}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
