import React from "react";
import { Bar, BarChart, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,Radar  } from "recharts";

const Dashboard = () => {
  const dataset = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];

  const data = [
    {
      subject: "Math",
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: "Chinese",
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "English",
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "Geography",
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: "Physics",
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: "History",
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

  return (
    <div className="w-full h-full flex gap-10 p-10">
      <div className="flex flex-1 flex-col gap-10">
        <div className="grid grid-cols-3  gap-10 flex-1">
          <div className="card card-border bg-blue-950">
            <div className="card-body">
              <h2 className="card-title text-base-200 text-2xl mb-auto">
                Highlight
              </h2>

              <div className="cards-action text-center mb-auto">
                <h1 className="text-6xl font-black text-blue-400">86%</h1>
                <p className="text-base-200 mt-4">
                  Eighty-six percent of all respondents are very
                  satisfied.
                </p>
              </div>
            </div>
          </div>

          <div className="card card-border bg-base-100 ">
            <div className="card-body">
              <h2 className="card-title text-gray-500">Total</h2>
              <p className="font-black text-2xl text-blue-950">Locations</p>
              <div className="card-actions justify-end">
                <h1 className="text-6xl font-black">132</h1>
              </div>
            </div>
          </div>

          <div className="card card-border bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-gray-500">Total</h2>
              <p className="font-black text-2xl text-blue-950">Respondents</p>
              <div className="card-actions justify-end">
                <h1 className="text-6xl font-black">791</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="card card-border bg-base-100 h-1/2">
          <div className="card-body">
            <h2 className="card-title text-gray-500">Some Data</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataset}>
                <Tooltip />
                <Bar dataKey="uv" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="w-[500px] h-full flex flex-col">
        <div className="card card-border bg-base-100 h-full">
          <div className="card-body">
            <h2 className="card-title text-gray-500">Perfomance</h2>
            <p className="font-black text-2xl text-blue-950">Analysis</p>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name="Mike"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
