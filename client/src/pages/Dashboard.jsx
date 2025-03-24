import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdMale, MdFemale, MdFilterAlt } from "react-icons/md";

const Dashboard = () => {
  const [surveys, setSurveys] = useState([]);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [isAZAscending, setIsAZAscending] = useState(true);
  const [isNumAscending, setIsNumAscending] = useState(true);
  const [totalRes, setTotalRes] = useState(0);
  const [barangayData, setBarangayData] = useState([]);
  const [mostRespondents, setMostRespondents] = useState({
    count: 0,
    name: "N/A",
  });
  const [leastRespondents, setLeastRespondents] = useState({
    count: 0,
    name: "N/A",
  });
  const [ratings, setRatings] = useState([]);
  const [fiveStarCount, setFiveStarCount] = useState(0);
  const [fiveStarPercentage, setFiveStarPercentage] = useState(0);
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get("http://localhost:5000/survey");
        setSurveys(response.data);
        setTotalRes(response.data.length);

        const barangayCounts = response.data.reduce((acc, survey) => {
          acc[survey.baranggay] = (acc[survey.baranggay] || 0) + 1;
          return acc;
        }, {});

        const barangayArray = Object.entries(barangayCounts).map(
          ([name, count]) => ({ name, count })
        );

        setBarangayData(barangayArray);

        const male = response.data.filter(
          (survey) => survey.sex === "Male"
        ).length;
        const female = response.data.filter(
          (survey) => survey.sex === "Female"
        ).length;

        setMaleCount(male);
        setFemaleCount(female);

        setRatings(response.data);

        const totalRatings = response.data.length;
        const countFiveStars = response.data.filter(
          (rate) => rate === 5
        ).length;
        setFiveStarCount(countFiveStars);

        if (totalRatings > 0) {
          setFiveStarPercentage(
            ((countFiveStars / totalRatings) * 100).toFixed(2)
          );
        }

        // Sorting Function
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchSurveys();
  }, []);

//   const handleSort = (type) => {
//     let sortedData = [...barangayData];

//     switch (type) {
//       case "A-Z":
//         sortedData.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       case "Z-A":
//         sortedData.sort((a, b) => b.name.localeCompare(a.name));
//         break;
//       case "0-9":
//         sortedData.sort((a, b) => a.count - b.count);
//         break;
//       case "9-0":
//         sortedData.sort((a, b) => b.count - a.count);
//         break;
//       default:
//         return;
//     }

//     setBarangayData(sortedData);
//     setSortType(type);
//   };

  useEffect(() => {
    if (barangayData.length > 0) {
      const sortedBarangays = [...barangayData].sort(
        (a, b) => b.count - a.count
      );

      setMostRespondents(sortedBarangays[0] || { count: 0, name: "N/A" });
      setLeastRespondents(
        sortedBarangays[sortedBarangays.length - 1] || { count: 0, name: "N/A" }
      );
    }
  }, [barangayData]);

  return (
    <div className="w-full h-full flex gap-10 p-10">
      <div className="flex flex-1 flex-col gap-10">
        <div className="grid grid-cols-3 gap-10 flex-1">
          <div className="card bg-white shadow-sm">
            <div className="card-body flex flex-col justify-between">
              <p className="font-black text-xl text-blue-200">Highlight</p>
              <div className="data">
                <p className="text-5xl font-black text-blue-100">
                  {fiveStarPercentage}%
                </p>
                <p className="text-md italic font-semibold text-blue-200 text-center mt-2">
                  Satisfied Rating <br />({fiveStarCount} out of{" "}
                  {ratings.length})
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-sm">
            <div className="card-body flex flex-col justify-between">
              <MdMale
                size={52}
                className="bg-blue-100 rounded-full p-2 text-blue-900"
              />
              <div className="data">
                <p className="text-5xl font-black text-blue-950">{maleCount}</p>
                <p className="text-md italic font-semibold text-gray-500">
                  Male
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-sm">
            <div className="card-body flex flex-col justify-between">
              <MdFemale
                size={52}
                className="bg-blue-100 rounded-full p-2 text-blue-900"
              />
              <div className="data">
                <p className="text-5xl font-black text-blue-950">
                  {femaleCount}
                </p>
                <p className="text-md italic font-semibold text-gray-500">
                  Female
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card h-1/2 p-10 bg-white shadow-sm">
          <p className="text-center p-2 bg-blue-950 rounded-box text-blue-200 font-black text-xl">
            Total Respondent: {totalRes}
          </p>

          <div className="flex h-full w-full justify-between">
            <div className="flex-1 text-center flex flex-col">
              <p className="font-bold text-gray-500 text-sm italic mb-auto mt-5">
                Most Respondents
              </p>
              <p className="text-5xl font-black text-blue-950">
                {mostRespondents?.count ?? 0}
              </p>
              <p className="font-black text-blue-950 text-2xl uppercase">
                {mostRespondents?.name ?? "N/A"}
              </p>
            </div>

            <div className="divider divider-horizontal divider-start"></div>

            <div className="flex-1 text-center flex flex-col">
              <p className="font-bold text-gray-500 text-sm italic mb-auto mt-5">
                Least Respondents
              </p>
              <p className="text-5xl font-black text-blue-950">
                {leastRespondents?.count ?? 0}
              </p>
              <p className="font-black text-blue-950 text-2xl uppercase">
                {leastRespondents?.name ?? "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[500px] max-h-[calc(100vh - 84px)] flex flex-col rounded-box shadow-sm">
        <div className="card h-full bg-white shadow-sm">
          <div className="card-body">
            <p className="font-black text-xl text-blue-950 text-center">
              Monitoring and Evaluation Distribution
            </p>

            <div className="dropdown">
              {/* <div tabIndex={0} role="button" className="btn m-1">
                Sort <MdFilterAlt size={18} />
              </div>
              <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li>
                  <a onClick={() => handleSort("A-Z")}>Barangay: A-Z</a>
                </li>
                <li>
                  <a onClick={() => handleSort("Z-A")}>Barangay: Z-A</a>
                </li>
                <li>
                  <a onClick={() => handleSort("0-9")}>Total: 0-9</a>
                </li>
                <li>
                  <a onClick={() => handleSort("9-0")}>Total: 9-0</a>
                </li>
              </ul> */}

              <div className="h-100 overflow-y-auto border border-gray-200 rounded-box scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <table className="table table-pin-rows">
                  <thead>
                    <tr className="bg-blue-950 p-2 text-blue-100">
                      <th width="80%">Address</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {barangayData.map((barangay) => (
                      <tr key={barangay.name}>
                        <td>{barangay.name}</td>
                        <td>{barangay.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
