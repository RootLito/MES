import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MdDeleteForever,
  MdEditDocument,
  MdKeyboardBackspace,
} from "react-icons/md";

const List = () => {
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [delError, setDelError] = useState(null);

  const modalRef = useRef(null);
  const navigate = useNavigate();

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
        `http://localhost:5000/survey/delete/${id}`
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

  return (
    <div className="max-w-[900px] min-h-screen mx-auto p-5 flex flex-col relative">
      {deleted && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span className="text-center text-green-50">
              Form deleted successfully
            </span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-w-[900px] mx-auto my-24">
        <table className="table">
          <thead>
            <tr>
              <th>Survey #</th>
              <th>Name</th>
              <th>Address</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {surveys.length === 0 ? (
              <td colSpan="4">No Records</td>
            ) : (
              surveys.map((survey) => (
                <tr key={survey._id} className="hover:bg-base-300">
                  <td>{survey._id}</td>
                  <td>{survey.name}</td>
                  <td>
                    {survey.baranggay}, {survey.municipality}, {survey.province}
                  </td>
                  <td>
                    {survey.createdAt
                      ? new Date(survey.createdAt).toLocaleDateString("en-CA")
                      : "N/A"}
                  </td>
                  <td className="flex gap-3 text-xl">
                    <MdEditDocument
                      className="text-primary cursor-pointer"
                      onClick={() => navigate(`/update/${survey._id}`)}
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
    </div>
  );
};

export default List;
