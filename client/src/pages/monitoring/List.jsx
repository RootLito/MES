import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MdDeleteForever,
  MdEditDocument,
  MdVisibility
} from "react-icons/md";


const List = () => {
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [delError, setDelError] = useState(null);


  // Search filter and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredSurveys, setFilteredSurveys] = useState([]);


  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);


    if (query) {
      const filteredData = surveys.filter(survey => {
        return (
          survey.name.toLowerCase().includes(query) ||
          survey.baranggay.toLowerCase().includes(query) ||
          survey.municipality.toLowerCase().includes(query) ||
          survey.province.toLowerCase().includes(query) ||
          survey.projectReceived.toLowerCase().includes(query) ||
          survey.specProject.toLowerCase().includes(query)
        );
      });
      setFilteredSurveys(filteredData);
    } else {
      setFilteredSurveys(surveys);
    }
  };


  const modalRef = useRef(null);
  const navigate = useNavigate();


  const fetchSurveys = async () => {
    try {
      const response = await axios.get("https://bfar-server.onrender.com/survey");
  
      const sortedSurveys = response.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);  
      });
  
      setSurveys(sortedSurveys);
      setFilteredSurveys(sortedSurveys);
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
      <div className="toast toast-top toast-center">
        <div className="alert alert-error text-white text-center">
          <span>Error fetching data</span>
        </div>
      </div>
    );
  }


  const onClick = (link) => {
    navigate(link);
  };


  // OPEN MODAL


  const openModal = (id) => {
    setSelectedSurvey(id);
    modalRef.current.showModal();
  };


  // DELETE
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://bfar-server.onrender.com/survey/delete/${id}`
      );
      if (!res) {
        return (
          <div className="toast toast-top toast-center">
            <div className="alert alert-error text-white text-center">
              <span>Failed to delete form</span>
            </div>
          </div>
        );
      } else {
        setDeleted(true);
        setTimeout(() => {
          setDeleted(false);
        }, 3000);
      }
      setSurveys((prevSurveys) => prevSurveys.filter(({ _id }) => _id !== id));
      setFilteredSurveys((prevFilteredSurveys) => prevFilteredSurveys.filter(({ _id }) => _id !== id));
    } catch (err) {
      return (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error text-white text-center">
            <span>Failed to delete form</span>
          </div>
        </div>
      );
    }
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSurveys = filteredSurveys.slice(indexOfFirstItem, indexOfLastItem);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSurveys.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <div className="flex-1 mx-auto p-5 flex flex-col relative">
      {deleted && (
        <div className="toast toast-top toast-center z-999">
          <div className="alert alert-success">
            <span className="text-center text-green-50">
              Form deleted successfully
            </span>
          </div>
        </div>
      )}

      <label className="input w-1/2 bg-gray-100">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
        <input
          type="search"
          className="grow "
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </label>


      <div className="rounded-box border border-base-content/5 bg-base-100 my-4">
        <table className="table overflow-hidden">
          <thead>
            <tr className="bg-blue-950 text-white">
              <th>Survey #</th>
              <th>Name</th>
              <th>Address</th>
              <th>Project Received</th>
              <th>Evaluator</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentSurveys.length === 0 ? (
              <td colSpan="7">No Records</td>
            ) : (
              currentSurveys.map((survey, index) => (
                <tr key={survey._id} className="hover:bg-base-300">
                  <th>{indexOfFirstItem + index + 1}</th>
                  <td>{survey.name}</td>
                  <td>
                    {survey.baranggay}, {survey.municipality}, {survey.province}
                  </td>
                  <td>
                    {
                        survey.projectReceived === "Capture" ? (
                        <div className="badge badge-error text-white">{survey.projectReceived}</div>
                        ) : survey.projectReceived === "Aquaculture" ? ( 
                        <div className="badge badge-warning text-white">{survey.projectReceived}</div>
                        ) : survey.projectReceived === "Post-harvest" ? (
                        <div className="badge badge-accent text-white">{survey.projectReceived}</div>
                        ) : survey.projectReceived === "Techno-demo" ? (
                        <div className="badge badge-info text-white">{survey.projectReceived}</div>
                        ) : survey.projectReceived === "Others" ? (
                        <div className="badge badge-success text-white">{survey.projectReceived}</div>
                        ) : (
                        <div className="badge badge-soft badge-warning">{survey.projectReceived}</div>
                        )
                    }
                    </td>

                  <td>{survey.evaluator}</td>
                  <td>
                    {survey.createdAt
                      ? new Date(survey.createdAt).toLocaleDateString("en-CA")
                      : "N/A"}
                  </td>


                  <td className="flex gap-3 text-xl">
                    <MdVisibility
                      className="text-green-600 cursor-pointer"
                      onClick={() => navigate(`/lists/view/${survey._id}`)} />
                    <MdEditDocument
                      className="text-primary cursor-pointer"
                      onClick={() => navigate(`/lists/update/${survey._id}`)}
                    />
                    <MdDeleteForever
                      className="text-error cursor-pointer"
                      onClick={() => openModal(survey._id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>

      <div className="join flex justify-center">
        <button className="join-item btn"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}>«</button>


        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`join-item btn ${currentPage === number ? 'btn-active' : ''}`}
          >
            {number}
          </button>
        ))}
        <button
          className="join-item btn"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage >= pageNumbers.length}>»</button>
      </div>



      <dialog ref={modalRef} id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete</h3>
          <p className="py-4">Are you sure you want to delete this form?</p>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-success text-white mr-2 w-[60px] focus:right-0"
              onClick={() => {
                handleDelete(selectedSurvey);
                modalRef.current.close();
              }}
            >
              Yes
            </button>
            <form method="dialog">
              <button className="btn btn-error text-white">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};


export default List;
