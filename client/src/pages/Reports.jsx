import React from 'react'
import { useState, useEffect } from 'react'
import { format } from 'date-fns';
import axios from 'axios';

const Reports = () => {
  const currentDate = new Date();
  const date = format(currentDate, 'MM/dd/yyyy');

  const [totalRes, setTotalRes] = useState(21)


  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get("http://localhost:5000/survey");


      setSurveys(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchSurveys();
  }, []);


  if (loading) {
    return (
      <div className="toast toast-top toast-center">
        <div className="alert alert-success text-white text-center">
          <span className="loading loading-spinner loading-sm"></span>
          <span>Fetching data...</span>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="toast toast-top toast-center z-2">
        <div className="alert alert-error text-white text-center">
          <span>Error fetching data</span>
        </div>
      </div>
    );
  }




  return (
    <div className="w-full p-10 flex flex-col gap-10">
      <div className="card bg-base-100 shadow-sm w-full">
        <div className="card-body flex flex-row p-5 items-center">
          <h2 className='font-bold text-md text-gray-700'>Total No. of Respondents as of {date}: </h2>
          <div className="badge badge-xl badge-soft badge-info font-bold">{totalRes} </div>
        </div>
      </div>

      <div className="p-10 bg-white rounded-box shadow-sm overflow-x-auto">
        <div className="overflow-x-auto border border-base-content/5 bg-base-100 text-xs">
          <table className="table">
            <tbody>
              <tr>
                <th className='bg-blue-950 text-white' rowSpan="2">Respondent No.</th>
                <th className="text-center bg-blue-950 text-white" colSpan="3">Location</th>
                <th className='bg-blue-950 text-white' rowSpan="2">Project Received</th>
                <th className='bg-blue-950 text-white' rowSpan="2">Specific Project</th>
              </tr>
              <tr className='bg-blue-900 text-white'>
                <th>Province/City</th>
                <th>Municipality/District</th>
                <th>Baranggay</th>
              </tr>

              {surveys.map((survey, index) => (
                <tr key={index} >
                  <th>{index + 1}</th>
                  <td>{survey.province}</td>
                  <td>{survey.municipality}</td>
                  <td>{survey.baranggay}</td>
                  <td>{survey.projectReceived}</td>
                  <td>{survey.specProject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Reports