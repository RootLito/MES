import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever, MdEditDocument, MdVisibility } from "react-icons/md";

const List = () => {
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [selectedSurveys, setSelectedSurveys] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const modalRefBulk = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredSurveys, setFilteredSurveys] = useState([]);

  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurveys();
  }, []);

  useEffect(() => {
    setSelectAll(
      filteredSurveys.length > 0 &&
        selectedSurveys.length === filteredSurveys.length
    );
  }, [selectedSurveys, filteredSurveys]);

  useEffect(() => {
    const filteredData = surveys.filter(
      (survey) =>
        survey.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        survey.baranggay.toLowerCase().includes(searchQuery.toLowerCase()) ||
        survey.municipality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        survey.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
        survey.projectReceived
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        survey.specProject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSurveys(filteredData);
    setCurrentPage(1);
  }, [searchQuery, surveys]);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get(
        "https://bfar-server.onrender.com/survey"
      );
      const sortedSurveys = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSurveys(sortedSurveys);
      setFilteredSurveys(sortedSurveys);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      const allIds = filteredSurveys.map((s) => s._id);
      setSelectedSurveys(allIds);
    } else {
      setSelectedSurveys([]);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id) => {
    setSelectedSurveys((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isSurveySelected = (id) => selectedSurveys.includes(id);

  //   const handleDeleteSelected = async () => {
  //     if (selectedSurveys.length === 0) return;

  //     try {
  //       const res = await axios.delete("https://bfar-server.onrender.com/survey/multiple", {
  //         data: { ids: selectedSurveys },
  //       });
  //       setSelectedSurveys([]);
  //       setSelectAll(false);
  //       if (!res) return;
  //       setDeleted(true);
  //       setTimeout(() => setDeleted(false), 3000);

  //       setSurveys((prev) => prev.filter(({ _id }) => _id !== id));
  //       setFilteredSurveys((prev) => prev.filter(({ _id }) => _id !== id));
  //     } catch (err) {
  //       console.error("Delete error:", err);
  //     }
  //   };
  const handleDeleteSelected = async () => {
    if (selectedSurveys.length === 0) return;

    try {
      const res = await axios.delete(
        "https://bfar-server.onrender.com/survey/multiple",
        {
          data: { ids: selectedSurveys },
        }
      );
      setSelectedSurveys([]);
      setSelectAll(false);
      if (!res) return;

      setDeleted(true);
      setTimeout(() => setDeleted(false), 3000);

      setSurveys((prev) =>
        prev.filter(({ _id }) => !selectedSurveys.includes(_id))
      );
      setFilteredSurveys((prev) =>
        prev.filter(({ _id }) => !selectedSurveys.includes(_id))
      );
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://bfar-server.onrender.com/survey/delete/${id}`
      );
      if (!res) return;
      setDeleted(true);
      setTimeout(() => setDeleted(false), 3000);

      setSurveys((prev) => prev.filter(({ _id }) => _id !== id));
      setFilteredSurveys((prev) => prev.filter(({ _id }) => _id !== id));
    } catch (err) {
      console.error("Failed to delete form");
    }
  };

  const openModal = (id) => {
    setSelectedSurvey(id);
    modalRef.current.showModal();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSurveys = filteredSurveys.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSurveys.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

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

      <div className="flex w-full justify-between items-center">
        <label className="input w-1/2 bg-gray-100">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </label>

        <div className="flex gap-2 items-center">
          {selectedSurveys.length > 1 && (
            <button
              className="btn btn-error text-white"
              onClick={() => modalRefBulk.current.showModal()}
            >
              Delete Selected ({selectedSurveys.length})
            </button>
          )}

          <button
            onClick={() => {
              setLoading(true);
              fetchSurveys();
            }}
            className="btn btn-outline btn-primary"
          >
            Refresh Table
          </button>
        </div>
      </div>

      <dialog ref={modalRefBulk} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Selected</h3>
          <p className="py-4">
            Are you sure you want to delete the selected surveys (
            {selectedSurveys.length})?
          </p>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-success text-white mr-2"
              onClick={() => {
                handleDeleteSelected();
                modalRefBulk.current.close();
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

      <div className="rounded-box border border-base-content/5 bg-base-100 my-4">
        <table className="table overflow-hidden">
          <thead>
            <tr className="bg-blue-950 text-white">
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
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
              <tr>
                <td colSpan="8">No Records</td>
              </tr>
            ) : (
              currentSurveys.map((survey, index) => (
                <tr key={survey._id} className="hover:bg-base-300">
                  <td>
                    <input
                      type="checkbox"
                      checked={isSurveySelected(survey._id)}
                      onChange={() => handleCheckboxChange(survey._id)}
                    />
                  </td>
                  <th>{indexOfFirstItem + index + 1}</th>
                  <td>{survey.name}</td>
                  <td>
                    {survey.baranggay}, {survey.municipality}, {survey.province}
                  </td>
                  <td>
                    <div
                      className={`badge text-white ${
                        survey.projectReceived === "Capture"
                          ? "badge-error"
                          : survey.projectReceived === "Aquaculture"
                          ? "badge-warning"
                          : survey.projectReceived === "Post-harvest"
                          ? "badge-accent"
                          : survey.projectReceived === "Techno-demo"
                          ? "badge-info"
                          : survey.projectReceived === "Others"
                          ? "badge-success"
                          : "badge bg-gray-300"
                      }`}
                    >
                      {survey.projectReceived}
                    </div>
                  </td>
                  <td>{survey.evaluator?.trim() ? survey.evaluator : "N/A"}</td>
                  <td>
                    {survey.createdAt
                      ? new Date(survey.createdAt).toLocaleDateString("en-CA")
                      : "N/A"}
                  </td>
                  <td className="flex gap-3 text-xl">
                    <MdVisibility
                      className="text-green-600 cursor-pointer"
                      onClick={() => navigate(`/lists/view/${survey._id}`)}
                    />
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
        <button
          className="join-item btn"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`join-item btn ${
              currentPage === number ? "btn-active" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          className="join-item btn"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage >= pageNumbers.length}
        >
          »
        </button>
      </div>

      <dialog ref={modalRef} id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete</h3>
          <p className="py-4">Are you sure you want to delete this form?</p>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-success text-white mr-2 w-[60px]"
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
