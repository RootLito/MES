import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/survey/${id}`);
        setSurvey(response.data);
      } catch (err) {
        console.log("Error fetching survey data:", err);
      }
    };

    fetchSurvey();
  }, [id]);

  if (!survey) {
    return (
      <div className="p-10 text-center text-gray-600">
        <p>Loading survey details...</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="w-full mx-auto p-5 flex flex-col relative bg-white rounded-md">
        <MdKeyboardBackspace
          className="text-2xl cursor-pointer text-red-600"
          onClick={() => navigate("/lists/")}
        />
        <p className="text-2xl font-bold text-center mt-6">
          Field Monitoring and Evaluation Form
        </p>

        <div className="max-w-[900px] mx-auto flex  mt-12 justify-end gap-2 py-2">
          <button
            className="btn btn-success text-white w-100"
            onClick={() => reactToPrintFn()}
          >
            Print and Export
          </button>
        </div>

        <form ref={contentRef} className="flex flex-col p-5" id="form">
          <div className="head text-center">
            <h2 className="text-blue-950 font-black">
              BUREAU OF FISHERIES AND AQUATIC RESOURCES XI
            </h2>
            <p className="text-blue-950 font-semibold text-sm">
              Fiel Monitoring and Evaluation Form
            </p>
            <p className="text-xs">
              <i>(for beneficiaries)</i>
            </p>
          </div>
          <div className="overflow-x-auto rounded-box bg-base-100">
            <table className="table table-xs mt-6">
              <tbody>
                <tr>
                  <td colSpan={4} className="border-none">
                    <span className="font-black bg-blue-950 block text-white p-2">
                      BENEFICIARY INFORMATION
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="!border-none">
                    Name of Respondent: <b>{survey.name}</b>
                  </td>
                  <td className="border-none">
                    Civil Status: <b>{survey.civilStatus}</b>
                  </td>
                  <td>
                    Sex: <b>{survey.sex}</b>
                  </td>
                  <td>
                    Age: <b>{survey.age}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    No. of Household Member: <b>{survey.hhMember}</b>
                  </td>
                  <td>
                    FishR: <b>{survey.fishR}</b>
                  </td>
                  <td>
                    BoatR: <b>{survey.boatR}</b>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    Name of Association: <b>{survey.nameAssoc}</b>
                  </td>
                  <td>
                    Total No. of Members: <b>{survey.totalMember}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    Province: <b>{survey.province}</b>
                  </td>
                  <td>
                    Municipality: <b>{survey.municipality}</b>
                  </td>
                  <td>
                    Barangay: <b>{survey.baranggay}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    Project Received: <b>{survey.projectReceived}</b>
                  </td>
                  <td>
                    Specific Project: <b>{survey.specProject}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    No. of Units Received: <b>{survey.noUnitsReceived}</b>
                  </td>
                  <td>
                    Date Received/Implemented:{" "}
                    <b>
                      {survey.dateReceived
                        ? format(new Date(survey.dateReceived), "dd/MM/yyyy")
                        : "N/A"}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>
                    Main Source of Income: <b>{survey.mainIncome}</b>
                  </td>
                  <td>
                    Other Source of Income: <b>{survey.otherIncome}</b>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="table table-xs ">
              <tbody>
                <tr>
                  <td>
                    <h2 className="font-black bg-blue-950 block text-white p-2">
                      EFFICIENCY OF THE PROJECT
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>1. Quantity and quality of goods/project received</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    - Is it sufficient/enough? (quantity):
                    <b className="ml-5">{survey.quantity}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    If no, why?<b className="ml-5">{survey.quantityReason}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    Rating on Quantity:
                    <b className="ml-5">{"⭐".repeat(survey.quantityRating)}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    - Is it new, has no defect or suitable? (quality):
                    <b className="ml-5">{survey.quality}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    If no, why?<b className="ml-5">{survey.qualityReason}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    Rating on Quality:
                    <b className="ml-5">{"⭐".repeat(survey.qualityRating)}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>
                      2. Is it timely with the fishing/production/stocking
                      season?<b className="ml-5">{survey.q2}</b>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    If no, why?<b className="ml-5">{survey.q2Reason}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    Rating on Timeliness:
                    <b className="ml-5">
                      {"⭐".repeat(survey.timelinessRating)}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    Is it upon request?
                    <b className="ml-5">{survey.uponRequest}</b>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className="font-black bg-blue-950 block text-white p-2">
                      RELEVANCE OF THE PROJECT
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>
                      3. Did the project address your key needs and challenges?
                      <b className="ml-5">{survey.q3}</b>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    If no, why?<b className="ml-5">{survey.q3Reason}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    - Please specify the needs and challenges
                    <b className="ml-5">{survey.challenges}</b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-10">
                    Rating on Relevance:
                    <b className="ml-5">
                      {"⭐".repeat(survey.relevanceRating)}
                    </b>
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>
                      4. Was the project suitable for the local environment and
                      economic conditions?<b className="ml-5">{survey.q4}</b>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    If no, why?<b className="ml-5">{survey.q4Reason}</b>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h2 className="font-black bg-blue-950 block text-white p-2">
                      COHERENCE OF THE PROJECT
                    </h2>
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>
                      5. Were beneficiaries/stakeholders engaged and coordinated
                      throughout the project?<b className="ml-5">{survey.q5}</b>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    If no, why?<b className="ml-5">{survey.q5Reason}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    Rating on Coherence:
                    <b className="ml-5">
                      {"⭐".repeat(survey.coherenceRating)}
                    </b>
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>
                      6. Were there any complementarity or duplications with
                      other projects or initiatives?
                      <b className="ml-5">{survey.q6}</b>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    If yes, pls specify from other NGA/NGO?
                    <b className="ml-5">{survey.q6Reason}</b>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h2 className="font-black bg-blue-950 block text-white p-2">
                      EFFECTIVENESS OF THE PROJECT
                    </h2>
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>7. Satisfaction on the project received</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    - Were you satisfied with the project given?
                    <b className="ml-5">{survey.q7Satisfied}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    If no, why?<b className="ml-5">{survey.q7_1}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    Rating on Coherence:
                    <b className="ml-5">
                      {"⭐".repeat(survey.satisfactionRating)}
                    </b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-10">
                    - Were you able to use it as soon as given?
                    <b className="ml-5">{survey.q7_2}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    If no, pls specify?
                    <b className="ml-5">{survey.q7_2Reason}</b>
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>
                      8. Were there problems encountered during project
                      operation?<b className="ml-5">{survey.q8}</b>
                    </b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-10">
                    If yes, pls specify?
                    <b className="ml-5">{survey.q8Reason}</b>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h2 className="font-black bg-blue-950 block text-white p-2">
                      IMPACT OF THE PROJECT
                    </h2>
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>9. Benefits from the project</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    - Did it increase your catch/production (kg)?
                    <b className="ml-5">{survey.q9_1}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    Species<b className="ml-5">{survey.q9_1Spec}</b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-15">
                    - Catch/yield before project was given
                    <b className="ml-5">{survey.q9_2}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-15">
                    - Catch/yield after project was given
                    <b className="ml-5">{survey.q9_3}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-15">
                    - Contribution to Production
                    <b className="ml-5">{survey.q9_4}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-15">
                    <i>
                      Aquaculture (culture period, survival rate, no. of
                      pcs/kilo)
                    </i>
                    <b className="ml-5">{survey.q9_5}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-15">
                    <i>
                      Capture (catch/day, no. of fishing operations- day/month)
                    </i>
                    <b className="ml-5">{survey.q9_6}</b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-10">
                    - Did it increase your income (Php)?
                    <b className="ml-5">{survey.q9_7}</b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-15">
                    - Income before project was given (net/operation)
                    <b className="ml-5">{survey.q9_8}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-15">
                    - Income after project was given (net/operation)
                    <b className="ml-5">{survey.q9_9}</b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-10">
                    - Any improvement in your family/household?
                    <b className="ml-5">{survey.q9_10}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    <b className="ml-5">{survey.q10_e}</b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-10">
                    - Any improvement in your association?
                    <b className="ml-5">{survey.q9_11}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    <b className="ml-5">{survey.q9_11other}</b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-10">
                    - Any improvement in the community?
                    <b className="ml-5">{survey.q9_12}</b>
                  </td>
                </tr>
                <tr>
                  <td className="pl-10">
                    Please specify
                    <b className="ml-5">{survey.q9_12Spec}</b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-10">
                    Rating on Impact
                    <b className="ml-5">{"⭐".repeat(survey.impactRating)}</b>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h2 className="font-black bg-blue-950 block text-white p-2">
                      SUSTAINABILITY OF THE PROJECT
                    </h2>
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>
                      10. Is the project ongoing/operational/used?
                      <b className="ml-5">{survey.q10}</b>
                    </b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-10">
                    If no, state reason why not operational/used
                    <b className="ml-5">{survey.q10Reason}</b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-10">
                    If yes, how long did the project last?
                    <b className="ml-5">{survey.q10_1}</b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-10">
                    Rating on Sustainability
                    <b className="ml-5">
                      {"⭐".repeat(survey.sustainabilityRating)}
                    </b>
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>
                      11. Availability of market for the produce (fresh or
                      processed)?
                      <b className="ml-5">{survey.q11}</b>
                    </b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-10">
                    Please specify
                    <b className="ml-5">{survey.q11_1}</b>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h2 className="font-black bg-blue-950 block text-white p-2">
                      NEEDS ASSESSMENT
                    </h2>
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>
                      12. How else can the government through BFAR help or
                      assist you?
                      <b className="ml-5">{survey.q10}</b>
                    </b>
                  </td>
                </tr>

                <tr>
                  <td className="pl-10">
                    (credit facilitation, training, livelihood assistance,
                    others, please specify)
                    <b className="ml-5">{survey.q12}</b>
                  </td>
                </tr>

                <tr>
                  <td className="text-center font-black pt-10">
                    Evaluator's Note (cite practices, success stories and other
                    observations):
                  </td>
                </tr>
                <tr className="text-center">
                  <td>{survey.q12}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
};

export default View;
