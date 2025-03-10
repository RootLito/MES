import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";

const View = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        form: {
            name: "",
            civilStatus: "",
            sex: "",
            age: "",
            hhMember: "",
            fishR: "",
            boatR: "",
            nameAssoc: "",
            totalMember: "",
            province: "",
            municipality: "",
            baranggay: "",
            projectReceived: "",
            specProject: "",
            noUnitsReceived: "",
            dateReceived: "",
            mainIncome: "",
            otherIncome: "",

            quantity: "",
            quantityReason: "",
            quantityRating: "",
            quality: "",
            qualityReason: "",
            qualityRating: "",

            q2: "",
            q2Reason: "",
            timelinessRating: "",
            uponRequest: "",

            q3: "",
            q3Reason: "",
            challenges: "",
            relevanceRating: "",
            q4: "",
            q4Reason: "",
            q5: "",
            q5Reason: "",
            coherenceRating: "",
            q6: "",
            q6Reason: "",
            q7Satisfied: "",
            q7_1: "",
            satisfactionRating: "",
            q7_2: "",
            q7_2Reason: "",
            q8: "",
            q8Reason: "",
            q9_1: "",
            q9_1Spec: "",
            q9_2: "",
            q9_3: "",
            q9_4: "",
            q9_5: "",
            q9_6: "",
            q9_7: "",
            q9_8: "",
            q9_9: "",
            q9_10: "",
            q10_e: "",
            q9_11: "",
            q9_11other: "",
            q9_12: "",
            q9_12Spec: "",
            q9_13: "",
            q9_13other: "",
            q9_14: "",
            impactRating: "",
            q10: "",
            q10Reason: "",
            q10_1: "",
            sustainabilityRating: "",
            q11: "",
            q11_1: "",
            q12: "",
            note: "",
        },
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            form: {
                ...prevState.form,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/survey/add",
                formData.form
            );
            console.log("Response:", res.data);
        } catch (err) {
            console.error(
                "Error occurred:",
                err.response ? err.response.data : err.message
            );
        }
    };

    const onClick = (link) => {
        navigate(link);
    };



    return (
        <div className="p-10">
            <div className="max-w-[900px] mx-auto p-5 flex flex-col relative bg-base-100 rounded-md">
                <MdKeyboardBackspace
                                        className="text-2xl cursor-pointer text-red-600"
                                        onClick={() => navigate("/monitoring/")}
                                    />
                <p className="text-2xl font-bold text-center mt-6">
                    Field Monitoring and Evaluation Form
                </p>

                {/* PERSONAL --------------------- */}

                <form className="flex flex-col mt-12" onSubmit={handleSubmit}>
                    <table>

                    </table>
                </form>
            </div>
        </div>
    )
}

export default View