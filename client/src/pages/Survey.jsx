import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const Survey = () => {
    const navigate = useNavigate();
    const [isNoSelected, setIsNoSelected] = useState(false);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const onClick = (link) => {
        navigate(link);
    };

    return (
        <div className="max-w-[900px] min-h-screen mx-auto p-5 flex flex-col relative">
            <div className="absolute left-5 top-8 flex gap-5 items-center">
                <MdKeyboardBackspace
                    className="text-2xl cursor-pointer text-red-600"
                    onClick={() => onClick("/")}
                />
                <p className="text-2xl font-bold">
                    Field Monitoring and Evaluation Form
                </p>
            </div>

            {/* PERSONAL --------------------- */}

            <form className="flex flex-col mt-24" onSubmit={handleSubmit}>
                <h2 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 bg-blue-900 p-2">
                    BENEFICIARY INFORMATION
                </h2>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">Name</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="name"
                            value={formData.form.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col sm:w-[150px]">
                        <p className="text-sm">Civil Status</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="civilStatus"
                            value={formData.form.civilStatus}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col sm:w-[150px]">
                        <p className="text-sm">Sex</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="sex"
                            value={formData.form.sex}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col sm:w-[150px]">
                        <p className="text-sm">Age</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="age"
                            value={formData.form.age}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">No. of Household Members</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="hhMember"
                            value={formData.form.hhMember}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">FishR</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="fishR"
                            value={formData.form.fishR}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">BoatR</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="boatR"
                            value={formData.form.boatR}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">Name of Association</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="nameAssoc"
                            value={formData.form.nameAssoc}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm">Total No. of Memebers</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="totalMember"
                            value={formData.form.totalMember}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">Province</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="province"
                            value={formData.form.province}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">Municipality</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="municipality"
                            value={formData.form.municipality}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">Baranggay</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="baranggay"
                            value={formData.form.baranggay}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">Project Received</p>
                        <div className="flex flex-col gap-2 sm:flex-row sm:gap-5 ">
                            <div className="flex gap-2 mt-2 sm:mt-0">
                                <p>Capture</p>
                                <input
                                    type="radio"
                                    name="projectReceived"
                                    value="Capture"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex gap-2">
                                <p>Aquaculture</p>
                                <input
                                    type="radio"
                                    name="projectReceived"
                                    value="Aquaculture"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex gap-2">
                                <p>Post-harvest</p>
                                <input
                                    type="radio"
                                    name="projectReceived"
                                    value="Post-harvest"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex gap-2">
                                <p>Small-scale</p>
                                <input
                                    type="radio"
                                    name="projectReceived"
                                    value="Small-scale"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex gap-2">
                                <p>Medium-scale</p>
                                <input
                                    type="radio"
                                    name="projectReceived"
                                    value="Medium-scale"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex gap-2">
                                <p>Large-scale</p>
                                <input
                                    type="radio"
                                    name="projectReceived"
                                    value="Large-scale"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex gap-2">
                                <p>Others</p>
                                <input
                                    type="radio"
                                    name="projectReceived"
                                    value="Others"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">Specific Project</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="specProject"
                            value={formData.form.specProject}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">No. of Units Received</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="noUnitsReceived"
                            value={formData.form.noUnitsReceived}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">Date Received/Implemented</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="dateReceived"
                            value={formData.form.dateReceived}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">Main Source if Income</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="mainIncome"
                            value={formData.form.mainIncome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">Other Source of Income</p>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            name="otherIncome"
                            value={formData.form.otherIncome}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <p className="text-sm italic ml-2 px-5 mt-2 sm:mt-0">
                    Note: Please provide GPS of beneficiary and/or project
                    implemented
                </p>

                {/* EFFICIENCY OF THE PROJECT================================================================= */}
                <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-900 p-2">
                    EFFICIENCY OF THE PROJECT
                </h1>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">
                            <b>
                                1. Quantity and quality of goods/project
                                received
                            </b>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-5">
                            - Is it sufficient/enough? (quantity)
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input
                                type="radio"
                                name="quantity"
                                id=""
                                onChange={() => setIsNoSelected(false)}
                                required
                            />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input
                                type="radio"
                                name="quantity"
                                id=""
                                onChange={() => setIsNoSelected(true)}
                                required
                            />
                            No
                        </div>
                        <input
                            name="quantityReason"
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="If no, why?"
                            required={isNoSelected}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="sm:indent-5 flex-1">
                            <b>
                                <i>Rating on Quantity</i>
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <select
                            className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
                            name="quantityRating"
                            value={formData.form.rating}
                            onChange={handleChange}
                            required
                        >
                            <option value="" selected disabled>
                                - - Rate - -
                            </option>
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-5">
                            - Is it new, has no defect or suitable? (quality)
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input
                                type="radio"
                                name="suit"
                                id=""
                                onChange={() => setIsNoSelected(false)}
                                required
                            />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input
                                type="radio"
                                name="suit"
                                id=""
                                onChange={() => setIsNoSelected(true)}
                                required
                            />
                            No
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="If no, why?"
                            required={isNoSelected}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="sm:indent-5 flex-1">
                            <b>
                                <i>Rating on Quality</i>
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <select
                            name="rating"
                            id=""
                            className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
                            required
                        >
                            <option value="" selected disabled>
                                - - Rate - -
                            </option>
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:px-5"></div>

                <div className="flex flex-col gap-2 p-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">
                            <b>
                                2. Is it timely with the
                                fishing/production/stocking season?
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input
                                type="radio"
                                name="season"
                                id=""
                                onChange={() => setIsNoSelected(false)}
                                required
                            />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input
                                type="radio"
                                name="season"
                                id=""
                                onChange={() => setIsNoSelected(true)}
                                required
                            />
                            No
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="If no, why?"
                            required={isNoSelected}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="sm:indent-5 flex-1">
                            <b>
                                <i>Rating on Timeliness</i>
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <select
                            name="rating"
                            id=""
                            className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
                            required
                        >
                            <option value="" selected disabled>
                                - - Rate - -
                            </option>
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-5">
                            Is it upon request?
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="suit" value="Yes" required />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="suit" value="No" required />
                            No
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input
                                type="radio"
                                name="suit"
                                value="< 6 Months"
                                required
                            />
                            <span>{"<"} 6 months</span>
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input
                                type="radio"
                                name="suit"
                                value="< 1 Year"
                                required
                            />
                            <span>{"<"} 1 year</span>
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input
                                type="radio"
                                name="suit"
                                value="> 1 Year"
                                required
                            />
                            <span>{">"} 1 year</span>
                        </div>
                    </div>
                </div>

                {/* EFFICIENCY OF THE PROJECT================================================================= */}
                <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-900 p-2">
                    RELEVANCE OF THE PROJECT
                </h1>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">
                            <b>
                                3. Did the project address your key needs and
                                challenges?
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="chall" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="chall" id="" />
                            No
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="If no, why?"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-5">
                            - Please specify the needs and challenges
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="sm:indent-5 flex-1">
                            <b>
                                <i>Rating on Relevance</i>
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <select
                            name="relevance"
                            id=""
                            className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
                        >
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">
                            <b>
                                4. Was the project suitable for the local
                                environment and economic conditions?
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="chall" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="chall" id="" />
                            No
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="If no, why?"
                        />
                    </div>
                </div>

                {/* EFFICIENCY OF THE PROJECT================================================================= */}
                <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-900 p-2">
                    COHERENCE OF THE PROJECT
                </h1>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">
                            <b>
                                5. Were beneficiaries/stakeholders engaged and
                                coordinated throughout the project?
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="chall" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="chall" id="" />
                            No
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="If no, why?"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="sm:indent-5 flex-1">
                            <b>
                                <i>Rating on Coherence</i>
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <select
                            name="coherence"
                            id=""
                            className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
                        >
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">
                            <b>
                                6. Were there any complementarity or
                                duplications with other projects or initiatives?
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="chall" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="chall" id="" />
                            No
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="If Yes, pls specify project from other NGA/NGO"
                        />
                    </div>
                </div>
                {/* EFFICIENCY OF THE PROJECT================================================================= */}
                <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-900 p-2">
                    EFFECTIVENESS OF THE PROJECT
                </h1>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">
                            <b>7. Satisfaction on the project received</b>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-5">
                            - Were you satisfied with the project given?
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="suff" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="suff" id="" />
                            No
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="If no, why?"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="sm:indent-5 flex-1">
                            <b>
                                <i>Rating on Satisfaction</i>
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <select
                            name="rating"
                            id=""
                            className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
                        >
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-5">
                            - Were you able to use it as soon as given?
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="suit" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="suit" id="" />
                            No
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="If No, please specify"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 p-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">
                            <b>
                                8. Were there problems encountered during
                                project operation?
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="season" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="season" id="" />
                            No
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="If yes, please specify"
                        />
                    </div>
                </div>
                {/* EFFICIENCY OF THE PROJECT================================================================= */}
                <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-900 p-2">
                    IMPACT OF THE PROJECT
                </h1>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">
                            <b>9. Benefits from the project</b>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-5">
                            - Did it increase your catch/production (kg)?
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="suff" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="suff" id="" />
                            No
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="suff" id="" />
                            N/A
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="Species"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-10">
                            - Catch/yield before project was given
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-10">
                            - Catch/yield after project was given
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-10">
                            - Contribution to Production
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-10">
                            <i>
                                Aquaculture (culture period, survival rate, no.
                                of pcs/kilo)
                            </i>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-10">
                            <i>
                                Capture (catch/day, no. of fishing operations-
                                day/month)
                            </i>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-5">
                            - Did it increase your income (Php)?
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="income" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="income" id="" />
                            No
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-10">
                            - Income before project was given (net/operation)
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-10">
                            - Income after project was given (net/operation)
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-5">
                            - Any improvement in your family/household?
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="imp" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="imp" id="" />
                            No
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex-1"></div>

                    <div className="flex flex-row flex-1 gap-6">
                        <div className="flex gap-2 text-sm items-center">
                            <input type="radio" name="needs" id="" />
                            Consumption
                        </div>
                        <div className="flex gap-2 text-sm items-center">
                            <input type="radio" name="needs" id="" />
                            Education
                        </div>
                        <div className="flex gap-2 text-sm items-center">
                            <input type="radio" name="needs" id="" />
                            Other HH needs
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-5">
                            - Any improvement in your association?
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="assoc" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="assoc" id="" />
                            No
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex-1"></div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="assoc" id="" />
                            Improved Skills/Knowledge
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="assoc" id="" />
                            From Association to Coop
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="Others (please specify)"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-5">
                            - Any improvement in the community?
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="assoc" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="assoc" id="" />
                            No
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="assoc" id="" />
                            N/A
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="Please specify"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="sm:indent-5 flex-1">
                            <b>
                                <i>Rating on Impact</i>
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <select
                            name="rating"
                            id=""
                            className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
                        >
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                </div>

                {/* SUSTAINABILITY OF THE PROJECT================================================================= */}
                <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-900 p-2">
                    SUSTAINABILITY OF THE PROJECT
                </h1>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">
                            <b>10. Is the project ongoing/operational/used?</b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="chall" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="chall" id="" />
                            No
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                            placeholder="If no, state reason why not operational/used"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-5">
                            If yes, how long did the project last?
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="suit" id="6-months" />
                            <span>{"<"} 3 months</span>
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="suit" id="1-year" />
                            <span>{"<"} 1 year</span>
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input
                                type="radio"
                                name="suit"
                                id="greater-than-1-year"
                            />
                            <span>{">"} 1 year</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="sm:indent-5 flex-1">
                            <b>
                                <i>Rating on Sustainability</i>
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <select
                            name="rating"
                            id=""
                            className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
                        >
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">
                            <b>
                                11. Availability of market for the produce
                                (fresh or processed)?
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="chall" id="" />
                            Yes
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="chall" id="" />
                            No
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm sm:indent-5 flex-1">
                            Rating on Sustainability
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="assoc" id="" />
                            Vending
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="assoc" id="" />
                            Local Market
                        </div>
                        <div className="flex gap-2 text-sm">
                            <input type="radio" name="assoc" id="" />
                            Trader/Consignee
                        </div>
                    </div>
                </div>
                {/* SUSTAINABILITY OF THE PROJECT================================================================= */}
                <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-900 p-2">
                    NEEDS ASSESSMENT
                </h1>
                <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                    <div className="flex flex-col flex-1">
                        <p className="text-sm">
                            <b>
                                12. How else can the government through BFAR
                                help or assist you?
                            </b>
                        </p>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex gap-2 text-sm">
                            (credit facilitation, training, livelihood
                            assistance, others, please specify)
                        </div>
                        <input
                            type="text"
                            className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex px-5 flex-col mb-5 sm:p-2">
                    <p className="text-center mt-5">
                        <b>
                            {" "}
                            Evaluator{"'"}s Note (cite practices, success
                            stories and other observations):
                        </b>
                    </p>
                    <textarea
                        type="text"
                        className="border-1 border-gray-400 p-3 h-[96px] rounded-md focus:outline-none resize-none"
                    />
                </div>

                <div className="flex px-5 sm:p-2">
                    <button className="mb-12 bg-green-600 h-[42px] flex-1 rounded-md cursor-pointer text-white">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Survey;
