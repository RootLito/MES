import React, { useEffect, useState } from "react";
import { Bar, BarChart, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import axios from "axios";

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
        const res = await axios.get("http://localhost:5000/survey/");
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

  const ratingData = (ratingArray) => {
    return ratingArray.map((count, index) => ({
      rating: `Rating ${index + 1}`,
      Total: count,
    }));
  };

  const customBar = (props) => {
    const { x, y, width, height, fill, stroke, strokeWidth } = props;
    return (
      <g>
        {/* Create a 3D-like shadow */}
        <rect
          x={x + 5}
          y={y + 5}
          width={width}
          height={height}
          fill="rgba(0, 0, 0, 0.3)" // Shadow color
          stroke="none"
        />
        {/* Main bar */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </g>
    );
  };

  return (
    <div className="flex-1 grid grid-cols-2 grid-rows-4 p-10 gap-10">
      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Quantity</h2>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.quantityRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} shape={customBar} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Quality</h2>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.qualityRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} shape={customBar} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Timeliness</h2>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.timelinessRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} shape={customBar} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Relevance</h2>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.relevanceRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} shape={customBar} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Coherence</h2>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.coherenceRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} shape={customBar} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Satisfaction</h2>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.satisfactionRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} shape={customBar} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Impact</h2>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.impactRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} shape={customBar} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Sustainability</h2>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.sustainabilityRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} shape={customBar} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
