import React, { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, Tooltip, ResponsiveContainer, XAxis } from "recharts";

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
  const [questionCounts, setQuestionCounts] = useState({
    quantity: { yes: 0, no: 0 },
    quality: { yes: 0, no: 0 },
    q2: { yes: 0, no: 0 },
    uponRequest: { yes: 0, no: 0 },
    q3: { yes: 0, no: 0 },
    q4: { yes: 0, no: 0 },
    q1: { yes: 0, no: 0 },
    q2: { yes: 0, no: 0 },
    q3: { yes: 0, no: 0 },
    q4: { yes: 0, no: 0 },
    q5: { yes: 0, no: 0 },
    q6: { yes: 0, no: 0 },
    q7: { yes: 0, no: 0 },
    q7_1: { yes: 0, no: 0 },
    q7_2: { yes: 0, no: 0 },
    q8: { yes: 0, no: 0 },
    q9: { yes: 0, no: 0 },
    q9_1: { yes: 0, no: 0 },
    q9_7: { yes: 0, no: 0 },
    q9_10: { yes: 0, no: 0 },
    q9_12: { yes: 0, no: 0 },
    q9_13: { yes: 0, no: 0 },
    q10: { yes: 0, no: 0 },
    q11: { yes: 0, no: 0 },
  });

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("http://localhost:5000/survey/");
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

  useEffect(() => {
    const newQuestionCounts = formData.reduce(
      (acc, item) => {
        Object.keys(acc).forEach((key) => {
          if (item.hasOwnProperty(key)) {
            const answer = item[key];
            if (answer === "Yes") {
              acc[key].yes += 1;
            } else if (answer === "No") {
              acc[key].no += 1;
            }
          }
        });
        return acc;
      },
      {
        quantity: { yes: 0, no: 0 },
        quality: { yes: 0, no: 0 },
        q2: { yes: 0, no: 0 },
        uponRequest: { yes: 0, no: 0 },
        q3: { yes: 0, no: 0 },
        q4: { yes: 0, no: 0 },
        q1: { yes: 0, no: 0 },
        q5: { yes: 0, no: 0 },
        q6: { yes: 0, no: 0 },
        q7: { yes: 0, no: 0 },
        q7_1: { yes: 0, no: 0 },
        q7_2: { yes: 0, no: 0 },
        q8: { yes: 0, no: 0 },
        q9: { yes: 0, no: 0 },
        q9_1: { yes: 0, no: 0 },
        q9_7: { yes: 0, no: 0 },
        q9_10: { yes: 0, no: 0 },
        q9_12: { yes: 0, no: 0 },
        q9_13: { yes: 0, no: 0 },
        q10: { yes: 0, no: 0 },
        q11: { yes: 0, no: 0 },
      }
    );

    setQuestionCounts(newQuestionCounts);
  }, [formData]);

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

  return (
    <div className="flex-1 grid grid-cols-2 grid-rows-4 p-10 gap-10">
      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">
            Rating on Quantity
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>

          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={dataset}>
                <Tooltip />
                <Bar dataKey="uv" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">
            Rating on Quality
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>

          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={dataset}>
                <Tooltip />
                <Bar dataKey="uv" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">
            Rating on Timeliness
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={dataset}>
                <Tooltip />
                <Bar dataKey="uv" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">
            Rating on Relevance
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={dataset}>
                <Tooltip />
                <Bar dataKey="uv" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">
            Rating on Coherance
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={dataset}>
                <Tooltip />
                <Bar dataKey="uv" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">
            Rating on Satisfaction
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={dataset}>
                <Tooltip />
                <Bar dataKey="uv" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">
            Rating on Impact
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={dataset}>
                <Tooltip />
                <Bar dataKey="uv" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 h-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-blue-950 font-black">
            Rating on Sustainability
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="h-full w-full mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={dataset}>
                <Tooltip />
                <Bar dataKey="uv" fill="#1e3a8a"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* <div className="absolute left-5 top-8 flex gap-5 items-center">
                <MdKeyboardBackspace
                    className="text-2xl cursor-pointer text-red-600"
                    onClick={() => navigate("/")}
                />
                <p className="text-2xl font-bold">Analytics</p>
            </div>

            <div className="w-full sm:h-[400px] mt-24 flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col w-full bg-gray-50 rounded-lg p-5 shadow-sm">
                    <p className='font-black text-sm text-gray-600'>OVERALL RATING</p>

                    <div className="flex flex-col sm:flex-row w-full h-[400px] sm:h-full ">
                        <ResponsiveContainer width="100%" height="100%" className="flex-1">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    innerRadius={75}
                                    fill="#8884d8"
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke='none'
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-col w-[200px] gap-1">
                            <div className="badge badge-soft badge-primary-0 text-xs w-full flex-1">Quantity</div>
                            <div className="badge badge-soft badge-secondary text-xs w-full flex-1">Quality</div>
                            <div className="badge badge-soft badge-accent text-xs w-full flex-1" >Timeliness</div>
                            <div className="badge badge-soft badge-neutral text-xs w-full flex-1">Relevance</div>
                            <div className="badge badge-soft badge-info text-xs w-full flex-1">Coherance</div>
                            <div className="badge badge-soft badge-success text-xs w-full flex-1">Satisfaction</div>
                            <div className="badge badge-soft badge-warning text-xs w-full flex-1">Impact</div>
                            <div className="badge badge-soft badge-error text-xs w-full flex-1">Sustainability</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="divider divider-start my-12 text-xl opacity-70">Questions</div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-sm">
                <table className="table">
                    <thead>
                        <tr >
                            <th>QUESTIONS (Yes / No)</th>
                            <th>Yes</th>
                            <th>No</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-base-300">
                            <td>1. Quantity and quality of goods/project received</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td className='opacity-50'>- Is it sufficient/enough? (quantity)</td>
                            <td>{questionCounts['quantity'].yes}</td>
                            <td>{questionCounts['quantity'].no}</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td className='opacity-50'>- Is it new, has no defect or suitable? (quality)</td>
                            <td>{questionCounts['quality'].yes}</td>
                            <td>{questionCounts['quality'].no}</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td>2. Is it timely with the fishing/production/stocking season?</td>
                            <td>{questionCounts['q2'].yes}</td>
                            <td>{questionCounts['q2'].no}</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td className='opacity-50'>Is it upon request? </td>
                            <td>{questionCounts['uponRequest'].yes}</td>
                            <td>{questionCounts['uponRequest'].no}</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td>3. Did the project address your key needs and challenges?  </td>
                            <td>{questionCounts['q3'].yes}</td>
                            <td>{questionCounts['q3'].no}</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td>4. Was the project suitable for the local environment and economic conditions?</td>
                            <td>{questionCounts['q4'].yes}</td>
                            <td>{questionCounts['q4'].no}</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td>5. Were beneficiaries/stakeholders engaged and coordinated throughout the project?</td>
                            <td>{questionCounts['q5'].yes}</td>
                            <td>{questionCounts['q5'].no}</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td>6. Were there any complementarity or duplications with other?</td>
                            <td>{questionCounts['q6'].yes}</td>
                            <td>{questionCounts['q6'].no}</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td>7. Satisfaction on the project received?</td>
                            <td>{questionCounts['q7'].yes}</td>
                            <td>{questionCounts['q3'].no}</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td className='opacity-50'>- Were you satisfied with the project given?</td>
                            <td>{questionCounts['q7_1'].yes}</td>
                            <td>{questionCounts['q7_1'].no}</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td className='opacity-50'>- Were you able to use it as soon as given?</td>
                            <td>{questionCounts['q7_2'].yes}</td>
                            <td>{questionCounts['q7_2'].no}</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td>8. Were there problems encountered during project operation?</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td>9. Benefits from the project</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td className='opacity-50'>- Did it increase your catch/production (kg)?</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td className='opacity-50'>- Did it increase your income (Php)?</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td className='opacity-50'>- Any improvement in your family/household? </td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td className='opacity-50'>    - Any improvement in your association?</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td className='opacity-50'>- Any improvement in the community?</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td>10. Is the project ongoing/operational/used?</td>
                        </tr>
                        <tr className="hover:bg-base-300">
                            <td>11. Availability of market for the produce (fresh or processed)?</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="divider divider-start my-12 text-xl opacity-70">Rating</div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-12 shadow-sm">
                <table className="table">
                    <thead>
                        <tr>
                            <th>RATING ON DESCRIPTION</th>
                            <th>1⭐</th>
                            <th>2⭐</th>
                            <th>3⭐</th>
                            <th>4⭐</th>
                            <th>5⭐</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-base-300">
                            <th>Rating on Quantity</th>
                            {ratings.quantityRating.map((count, index) => (
                                <td key={index}>{count}</td>
                            ))}
                        </tr>
                        <tr className="hover:bg-base-300">
                            <th>Rating on Quality</th>
                            {ratings.qualityRating.map((count, index) => (
                                <td key={index}>{count}</td>
                            ))}
                        </tr>
                        <tr className="hover:bg-base-300">
                            <th>Rating on Timeliness</th>
                            {ratings.timelinessRating.map((count, index) => (
                                <td key={index}>{count}</td>
                            ))}
                        </tr>
                        <tr className="hover:bg-base-300">
                            <th>Rating on Relevance</th>
                            {ratings.relevanceRating.map((count, index) => (
                                <td key={index}>{count}</td>
                            ))}
                        </tr>
                        <tr className="hover:bg-base-300">
                            <th>Rating on Coherence</th>
                            {ratings.coherenceRating.map((count, index) => (
                                <td key={index}>{count}</td>
                            ))}
                        </tr>
                        <tr className="hover:bg-base-300">
                            <th>Rating on Satisfaction</th>
                            {ratings.satisfactionRating.map((count, index) => (
                                <td key={index}>{count}</td>
                            ))}
                        </tr>
                        <tr className="hover:bg-base-300">
                            <th>Rating on Impact</th>
                            {ratings.impactRating.map((count, index) => (
                                <td key={index}>{count}</td>
                            ))}
                        </tr>
                        <tr className="hover:bg-base-300">
                            <th>Rating on Sustainability</th>
                            {ratings.sustainabilityRating.map((count, index) => (
                                <td key={index}>{count}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div> */}
    </div>
  );
};

export default Analytics;
