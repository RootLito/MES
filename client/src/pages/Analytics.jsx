import React, { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import axios from "axios";

const Analytics = () => {
  const navigate = useNavigate();

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
    try {
      const fetchData = async () => {
        const res = await axios.get("https://bfar-server.onrender.com/survey/");
        setFormData(res.data);
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
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

  return (
    <div className="flex-1 grid grid-cols-2 grid-rows-4 p-10 gap-10">
      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Quantity</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>

          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.quantityRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Quality</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>

          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.qualityRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Timeliness</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>

          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.timelinessRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Relevance</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>

          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.relevanceRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Coherence</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>

          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.coherenceRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Satisfaction</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>

          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.satisfactionRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Impact</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>

          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.impactRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">Rating on Sustainability</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>

          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData(ratings.sustainabilityRating)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#1e3a8a" animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
