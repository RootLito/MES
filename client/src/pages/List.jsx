import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    MdDeleteForever,
    MdEditDocument,
    MdRemoveRedEye,
    MdKeyboardBackspace,
} from "react-icons/md";

const List = () => {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(
                `localhost:5000/survey/delete/${id}`
            );
            if (!res) {
                return (
                    <div className="toast toast-top toast-center">
                        <div className="alert alert-error text-white text-center">
                            <span>Failed to delete form</span>
                        </div>
                    </div>
                );
            }
            setSurveys((prevSurveys) =>
                prevSurveys.filter(({ _id }) => _id !== id)
            );
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
            <div className="absolute left-5 top-8 flex gap-5 items-center">
                <MdKeyboardBackspace
                    className="text-2xl cursor-pointer text-red-600"
                    onClick={() => onClick("/")}
                />
                <p className="text-2xl font-bold">Survey Lists</p>
            </div>
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
                                <tr
                                    key={survey._id}
                                    className="hover:bg-base-300"
                                >
                                    <td>{survey._id}</td>
                                    <td>{survey.name}</td>
                                    <td>
                                        {survey.baranggay},{" "}
                                        {survey.municipality}, {survey.province}
                                    </td>
                                    <td>
                                        {survey.createdAt
                                            ? new Date(
                                                  survey.createdAt
                                              ).toLocaleDateString("en-CA")
                                            : "N/A"}
                                    </td>
                                    <td className="flex gap-3 text-xl">
                                        <MdRemoveRedEye className="text-success cursor-pointer" />
                                        <MdEditDocument className="text-primary cursor-pointer" />
                                        <MdDeleteForever
                                            className="text-error cursor-pointer"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "my_modal_1"
                                                    )
                                                    .showModal()
                                            }
                                        />
                                        <dialog
                                            id="my_modal_1"
                                            className="modal"
                                        >
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg">
                                                    Delete
                                                </h3>
                                                <small className="py-4 text-md">
                                                    Are you you sure to delete
                                                    this form?
                                                </small>
                                                <div className="modal-action">
                                                    <button
                                                        type="button"
                                                        className="btn btn-success text-white mr-2 w-[60px] focus:outline-none focus:ring-0"
                                                        onClick={() =>
                                                            handleDelete(
                                                                survey._id
                                                            )
                                                        }
                                                    >
                                                        Yes
                                                    </button>
                                                    <form method="dialog">
                                                        <button className="btn btn-error text-white">
                                                            Cancel
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default List;
