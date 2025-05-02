import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const Analytics = () => {
  const [formData, setFormData] = useState([]);
  const [ratings, setRatings] = useState({
    quantityRating: [0, 0, 0, 0, 0],
    qualityRating: [0, 0, 0, 0, 0],
    timelinessRating: [0, 0, 0, 0, 0],
    relevanceRating: [0, 0, 0, 0, 0],
    coherenceRating: [0, 0, 0, 0, 0],
    satisfactionRating: [0, 0, 0, 0, 0],
    impactRating: [0, 0, 0, 0, 0],
    sustainabilityRating: [0, 0, 0, 0, 0],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://bfar-server.onrender.com/survey/");
        setFormData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newRatings = formData.reduce(
      (acc, item) => {
        Object.keys(acc).forEach((key) => {
          if (item.hasOwnProperty(key)) {
            const rating = item[key];
            if (rating >= 1 && rating <= 5) {
              acc[key][rating - 1] += 1;
            }
          }
        });
        return acc;
      },
      {
        quantityRating: [0, 0, 0, 0, 0],
        qualityRating: [0, 0, 0, 0, 0],
        timelinessRating: [0, 0, 0, 0, 0],
        relevanceRating: [0, 0, 0, 0, 0],
        coherenceRating: [0, 0, 0, 0, 0],
        satisfactionRating: [0, 0, 0, 0, 0],
        impactRating: [0, 0, 0, 0, 0],
        sustainabilityRating: [0, 0, 0, 0, 0],
      }
    );
    setRatings(newRatings);
  }, [formData]);

  const chartOptions = {
    chart: {
      type: "bar",
      height: "100%",
      stacked: false,
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: false, 
        columnWidth: "80%",
      },
    },
    tooltip: {
        enabled: true,
        y: {
          formatter: (value) => `Total: ${value}`, 
        },
      },
    dataLabels: {
      enabled: false, 
    },
    xaxis: {
      categories: ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
    },

    legend: {
      show: false,
    },
    colors: ["#007bff"],
  };

  const chartSeries = [
    {
      name: "Quantity Rating",
      data: ratings.quantityRating,
    },
    {
      name: "Quality Rating",
      data: ratings.qualityRating,
    },
    {
      name: "Timeliness Rating",
      data: ratings.timelinessRating,
    },
    {
      name: "Relevance Rating",
      data: ratings.relevanceRating,
    },
    {
      name: "Coherence Rating",
      data: ratings.coherenceRating,
    },
    {
      name: "Satisfaction Rating",
      data: ratings.satisfactionRating,
    },
    {
      name: "Impact Rating",
      data: ratings.impactRating,
    },
    {
      name: "Sustainability Rating",
      data: ratings.sustainabilityRating,
    },
  ];

  return (
    <div className="flex-1 grid grid-cols-2 grid-rows-4 p-10 gap-10">
      {["quantityRating", "qualityRating", "timelinessRating", "relevanceRating", "coherenceRating", "satisfactionRating", "impactRating", "sustainabilityRating"].map((ratingKey, index) => (
        <div key={index} className="card bg-white shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-blue-950 font-black">
              Rating on {ratingKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </h2>
            <p className="ml-2 text-xs">
              <i>
                (5⭐=Very satisfied; 4⭐=Satisfied; 3⭐=Average; 2⭐=Not satisfied; 1⭐=Disappointed)
              </i>
            </p>
            <div className="h-full w-full mt-5">
              <ReactApexChart
                options={chartOptions}
                series={[{ name: ratingKey, data: ratings[ratingKey] }]}
                type="bar"
                height="300"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Analytics;
