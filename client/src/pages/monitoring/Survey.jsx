import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdCheckCircle } from "react-icons/md";

const Survey = () => {
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

  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false);

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
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/survey/add",
        formData.form
      );
      console.log("Response:", res.data);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error(
        "Error occurred:",
        err.response ? err.response.data : err.message
      )
    } finally {
      setLoading(false);
    }
  };

  const onClick = (link) => {
    navigate(link);
  };

  return (
    <div className="max-w-[900px] mx-auto p-5 flex flex-col relative bg-base-100 rounded-md">
      <p className="text-2xl font-bold text-center">
        Field Monitoring and Evaluation Form
      </p>
      {showToast && (
        <div className="toast toast-top toast-center z-2">
          <div className="alert alert-success">
            <span className="flex items-center text-green-50"><MdCheckCircle size={18} className="mr-2" /> Form submitted</span>
          </div>
        </div>
      )}

      {/* PERSONAL --------------------- */}

      <form className="flex flex-col mt-12" onSubmit={handleSubmit}>
        <h2 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 bg-blue-950 p-2">
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
              type="number"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="age"
              value={formData.form.age}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
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
          Note: Please provide GPS of beneficiary and/or project implemented
        </p>

        {/* EFFICIENCY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
          EFFICIENCY OF THE PROJECT
        </h1>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>1. Quantity and quality of goods/project received</b>
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
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="quantity"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <input
              name="quantityReason"
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="If no, why?"
              value={formData.form.quantityReason}
              onChange={handleChange}
              required={
                formData.form.quantity == "No"
                  ? true
                  : (formData.form.quantityReason = "")
              }
              disabled={formData.form.quantity == "Yes" ? true : false}
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
              value={formData.form.quantityRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
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
                name="quality"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="quality"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <input
              name="qualityReason"
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="If no, why?"
              value={formData.form.qualityReason}
              onChange={handleChange}
              required={
                formData.form.quality == "No"
                  ? true
                  : (formData.form.qualityReason = "")
              }
              disabled={formData.form.quality == "Yes" ? true : false}
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
              name="qualityRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.qualityRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
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
                2. Is it timely with the fishing/production/stocking season?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q2"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q2"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <input
              type="text"
              name="q2Reason"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="If no, why?"
              value={formData.form.q2Reason}
              onChange={handleChange}
              required={
                formData.form.q2 == "No" ? true : (formData.form.q2Reason = "")
              }
              disabled={formData.form.q2 == "Yes" ? true : false}
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
              name="timelinessRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.timelinessRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                - - Rate - -
              </option>
              <option value="1" selected>
                ⭐
              </option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">Is it upon request?</p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="uponRequest"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="uponRequest"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="uponRequest"
                value="< 6 Months"
                onChange={handleChange}
                required
              />
              <span>{"<"} 6 months</span>
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="uponRequest"
                value="< 1 Year"
                onChange={handleChange}
                required
              />
              <span>{"<"} 1 year</span>
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="uponRequest"
                value="> 1 Year"
                onChange={handleChange}
                required
              />
              <span>{">"} 1 year</span>
            </div>
          </div>
        </div>

        {/* EFFICIENCY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
          RELEVANCE OF THE PROJECT
        </h1>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>3. Did the project address your key needs and challenges?</b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q3"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q3"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <input
              type="text"
              name="q3Reason"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="If no, why?"
              value={formData.form.q3Reason}
              onChange={handleChange}
              required={
                formData.form.q3 == "No" ? true : (formData.form.q3Reason = "")
              }
              disabled={formData.form.q3 == "Yes" ? true : false}
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
              name="challenges"
              value={formData.form.challenges}
              onChange={handleChange}
              required
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
              name="relevanceRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.relevanceRating}
              onChange={handleChange}
              required
            >
              <option value="" selected>
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

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>
                4. Was the project suitable for the local environment and
                economic conditions?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q4"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q4"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <input
              type="text"
              name="q4Reason"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="If no, why?"
              value={formData.form.q4Reason}
              onChange={handleChange}
              required={
                formData.form.q4 == "No" ? true : (formData.form.q4Reason = "")
              }
              disabled={formData.form.q4 == "Yes" ? true : false}
            />
          </div>
        </div>

        {/* EFFICIENCY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
          COHERENCE OF THE PROJECT
        </h1>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>
                5. Were beneficiaries/stakeholders engaged and coordinated
                throughout the project?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q5"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q5"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <input
              name="q5Reason"
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="If no, why?"
              value={formData.form.q5Reason}
              onChange={handleChange}
              required={
                formData.form.q5 == "No" ? true : (formData.form.q5Reason = "")
              }
              disabled={formData.form.q5 == "Yes" ? true : false}
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
              name="coherenceRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.coherenceRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
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

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>
                6. Were there any complementarity or duplications with other
                projects or initiatives?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q6"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q6"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <input
              name="q6Reason"
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="If Yes, pls specify project from other NGA/NGO"
              value={formData.form.q6Reason}
              onChange={handleChange}
              required={
                formData.form.q6 == "Yes" ? true : (formData.form.q6Reason = "")
              }
              disabled={formData.form.q6 == "Yes" ? false : true}
            />
          </div>
        </div>

        {/* EFFICIENCY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
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
              <input
                type="radio"
                name="q7Satisfied"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q7Satisfied"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <input
              name="q7_1"
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="If no, why?"
              value={formData.form.q7_1}
              onChange={handleChange}
              required={
                formData.form.q7Satisfied == "No"
                  ? true
                  : (formData.form.q7_1 = "")
              }
              disabled={formData.form.q7Satisfied == "Yes" ? true : false}
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
              name="satisfactionRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.satisfactionRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
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
              - Were you able to use it as soon as given?
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q7_2"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q7_2"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <input
              name="q7_2Reason"
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="If No, please specify"
              value={formData.form.q7_2Reason}
              onChange={handleChange}
              required={
                formData.form.q7_2 == "No"
                  ? true
                  : (formData.form.q7_2Reason = "")
              }
              disabled={formData.form.q7_2 == "Yes" ? true : false}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 p-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>
                8. Were there problems encountered during project operation?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q8"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q8"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <input
              name="q8Reason"
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="If yes, please specify"
              value={formData.form.q8Reason}
              onChange={handleChange}
              required={
                formData.form.q8 == "Yes" ? true : (formData.form.q8Reason = "")
              }
              disabled={formData.form.q8 == "Yes" ? false : true}
            />
          </div>
        </div>

        {/* EFFICIENCY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
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
              <input
                type="radio"
                name="q9_1"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_1"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_1"
                value="N/A"
                onChange={handleChange}
                required
              />
              N/A
            </div>
            <input
              name="q9_1Spec"
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="Species"
              value={formData.form.q9_1Spec}
              onChange={handleChange}
              required={
                formData.form.q9_1 == "Yes"
                  ? true
                  : (formData.form.q9_1Spec = "")
              }
              disabled={formData.form.q9_1 == "Yes" ? false : true}
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
              name="q9_2"
              value={formData.form.q9_2}
              onChange={handleChange}
              required
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
              name="q9_3"
              value={formData.form.q9_3}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-10">- Contribution to Production</p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="q9_4"
              value={formData.form.q9_4}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-10">
              <i>
                Aquaculture (culture period, survival rate, no. of pcs/kilo)
              </i>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="q9_5"
              value={formData.form.q9_5}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-10">
              <i>Capture (catch/day, no. of fishing operations- day/month)</i>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="q9_6"
              value={formData.form.q9_6}
              onChange={handleChange}
              required
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
              <input
                type="radio"
                name="q9_7"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_7"
                value="No"
                onChange={handleChange}
                required
              />
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
              name="q9_8"
              value={formData.form.q9_8}
              onChange={handleChange}
              required
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
              name="q9_9"
              value={formData.form.q9_9}
              onChange={handleChange}
              required
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
              <input
                type="radio"
                name="q9_10"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_10"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex-1"></div>

          <div className="flex flex-row flex-1 gap-6">
            <div className="flex gap-2 text-sm items-center">
              <input
                type="radio"
                name="q9_11"
                value="Consumption"
                onChange={handleChange}
                required
              />
              Consumption
            </div>
            <div className="flex gap-2 text-sm items-center">
              <input
                type="radio"
                name="q9_11"
                value="Education"
                onChange={handleChange}
                required
              />
              Education
            </div>
            <div className="flex gap-2 text-sm items-center">
              <input
                type="radio"
                name="q9_11"
                value="Other HH needs"
                onChange={handleChange}
                required
              />
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
              <input
                type="radio"
                name="q9_12"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_12"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex-1"></div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_13"
                value="Improved Skills/Knowledge"
                onChange={handleChange}
                required
              />
              Improved Skills/Knowledge
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_13"
                value="From Association to Coop"
                onChange={handleChange}
                required
              />
              From Association to Coop
            </div>
            <input
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="Others (please specify)"
              name="q9_13other"
              value={formData.form.q9_13other}
              onChange={handleChange}
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
              <input
                type="radio"
                name="q9_14"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_14"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_14"
                value="N/A"
                onChange={handleChange}
                required
              />
              N/A
            </div>
            <input
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="Please specify"
              name="q9_12Spec"
              value={formData.form.q9_12Spec}
              onChange={handleChange}
              required
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
              name="impactRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.impactRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
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

        {/* SUSTAINABILITY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
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
              <input
                type="radio"
                name="q10"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q10"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <input
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="If no, state reason why not operational/used"
              name="q10Reason"
              value={formData.form.q10Reason}
              onChange={handleChange}
              required={
                formData.form.q10 == "No"
                  ? true
                  : (formData.form.q10Reason = "")
              }
              disabled={formData.form.q10 == "Yes" ? true : false}
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
              <input
                type="radio"
                name="q10_1"
                value="< 3 months"
                onChange={handleChange}
                required={formData.form.q10 == "Yes" ? true : false}
              />
              <span>{"<"} 3 months</span>
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q10_1"
                value="< 1 year"
                onChange={handleChange}
                required={formData.form.q10 == "Yes" ? true : false}
              />
              <span>{"<"} 1 year</span>
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q10_1"
                value="> 1 year"
                onChange={handleChange}
                required={formData.form.q10 == "Yes" ? true : false}
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
              name="sustainabilityRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.sustainabilityRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
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

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>
                11. Availability of market for the produce (fresh or processed)?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q11"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q11"
                value="No"
                onChange={handleChange}
                required
              />
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
              <input
                type="radio"
                name="q11_1"
                value="Vending"
                onChange={handleChange}
                required={formData.form.q11 == "Yes" ? true : false}
              />
              Vending
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q11_1"
                value="Local Market"
                onChange={handleChange}
                required={formData.form.q11 == "Yes" ? true : false}
              />
              Local Market
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q11_1"
                value="Trader/Consignee"
                onChange={handleChange}
                required={formData.form.q11 == "Yes" ? true : false}
              />
              Trader/Consignee
            </div>
          </div>
        </div>
        {/* SUSTAINABILITY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
          NEEDS ASSESSMENT
        </h1>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>
                12. How else can the government through BFAR help or assist you?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              (credit facilitation, training, livelihood assistance, others,
              please specify)
            </div>
            <input
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="q12"
              value={formData.form.q12}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex px-5 flex-col mb-5 sm:p-2">
          <p className="text-center mt-5">
            <b>
              Evaluator{"'"}s Note (cite practices, success stories and other
              observations):
            </b>
          </p>
          <textarea
            type="text"
            className="border-1 border-gray-400 p-3 h-[96px] rounded-md focus:outline-none resize-none"
            name="note"
            value={formData.form.note}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex px-5 sm:p-2">
          <button
            type="submit"
            className="btn btn-success w-full text-white"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Survey;
