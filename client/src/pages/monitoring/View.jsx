import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace, MdPrint  } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import logo from '../../assets/images/bfar.png';

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(
          `https://bfar-server.onrender.com/survey/${id}`
        );
        setSurvey(response.data);
      } catch (err) {
        console.log("Error fetching survey data:", err);
      }
    };

    fetchSurvey();
  }, [id]);

  if (!survey) {
    return (
        <div className="toast toast-top toast-center z-999">
            <div className="alert alert-success text-white">
                <span>Fetching data...</span>
            </div>
      </div>
    );
  }

  return (
    <div className="p-10">
        <div className="max-w-[900px] mx-auto flex items-center justify-between bg-white border-b-1 border-gray-200 p-2">
            <MdKeyboardBackspace
            className="text-2xl cursor-pointer text-red-600"
            onClick={() => navigate("/lists/")}
            />
            <button
                className="btn bg-blue-950 text-white"
                onClick={() => reactToPrintFn()}
            >
                <MdPrint size={24}/>
            </button>
        </div>
      <div className="max-w-[900px] mx-auto p-10 flex flex-col relative bg-white">
        <form ref={contentRef} className="flex flex-col  print" id="form">
          <div className="w-full flex justify-center items-center logo">
            <img src={logo} alt="" width={48}/>
          </div>

          <div className="head text-center">
            <h2 className="text-blue-950 font-black t1">
              BUREAU OF FISHERIES AND AQUATIC RESOURCES XI
            </h2>
            <p className="text-blue-950 font-semibold t2">
              Field Monitoring and Evaluation Form
            </p>
            <p className="t3">
              <i>(for beneficiaries)</i>
            </p>
          </div>

            <div className="flex w-full  justify-end">
                Date: <b><u>{survey.createdAt ? format(new Date(survey.createdAt), "dd/MM/yyyy") : "N/A"}</u></b>
            </div>

            <div className="flex w-full  gap-5">
                <span className="">Name: <b><u>{survey.name}</u></b></span>
                <span>Respondent Type: <b><u>{survey.resType}</u></b></span>
                <span>Civil Status: <b><u>{survey.civilStatus}</u></b></span>
                <span>Sex: <b><u>{survey.sex}</u></b></span>
                <span>Age: <b><u>{survey.age}</u></b></span>
            </div>


            <div className="flex w-full  gap-5">
                <span className="">No. of Household Members: <b><u>{survey.hhMember}</u></b></span>
                <span className="">FishR: <b><u>{survey.fishR}</u></b></span>
                <span className="">BoatR: <b><u>{survey.boatR}</u></b></span>
            </div>

            <div className="flex w-full  gap-5">
                <span className="">Name of Association: <b><u>{survey.nameAssoc}</u></b></span>
                <span className="">Total no. of Members: <b><u>{survey.totalMember || "N/A"}</u></b></span>
            </div>

            <div className="flex w-full  gap-5">
                <span className="">Province: <b><u>{survey.province}</u></b></span>
                <span className="">Municipality: <b><u>{survey.municipality}</u></b></span>
                <span className="">Barangay: <b> <u>{survey.baranggay}</u></b></span>
            </div>

            <div className="flex w-full  gap-5">
                <span className="">Project Received: <b><u>{survey.projectReceived}</u></b></span>
                <span className="">Specific Project: <b><u>{survey.municipality}</u></b></span>
                <span className="">No. of Units Received: <b> <u>{survey.noUnitsReceived}</u></b></span>
                <span className="">Date Received/Implemented: <b> <u>{survey.dateReceived  ? format(new Date(survey.dateReceived), "dd/MM/yyyy") : "N/A"}</u></b></span>
            </div>

            <div className="flex w-full  gap-5">
                <span className="">Main Source of Income: <b><u>{survey.mainIncome}</u></b></span>
                <span className="">Other Source of Income: <b><u>{survey.otherIncome || "N/A"}</u></b></span>
            </div>

            <div className="w-full flex flex-col border-1 border-black ">
                <div className="flex w-full px-1 bg-blue-300  border-b-1 border-black">
                    <span><b>EFFICIENCY OF THE PROJECT</b></span>
                </div>
                <div className="flex w-full  px-1">
                    <div className="flex-1 flex flex-col">
                        <span><b>1. Quantity and quality of goods/project received</b></span>
                        <span>- Is it sufficient/enough? (quantity)</span>
                        <span><b>Rating on Quantity</b></span>
                        <span>- Is it new, has no defect or suitable? (quality)</span>
                        <span><b>Rating on Quality</b></span>
                        <span><b>2. Is it timely with the fishing/production/stocking season?</b></span>
                        <span><b>Rating on Timeliness</b></span>
                        <span>Is it upon request?</span>
                        <span>Duration</span>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <span className="flex-grow"></span>
                        <span><b>{survey.quantity}&nbsp;
                        {survey.quantity === "not sufficient" && <span>-&nbsp;{survey.quantityReason}</span>}</b>
                        </span>
                        <span><b>{survey.quantityRating}⭐</b></span>
                        <span><b>{survey.quality}&nbsp;
                        {survey.quality === "has defects" && <span>-&nbsp;{survey.qualityReason}</span>}
                        </b></span>
                        <span><b>{survey.qualityRating}⭐</b></span>
                        <span><b>{survey.q2}&nbsp;
                            {survey.q2 === "No" && <span>-&nbsp;{survey.q2Reason}</span>}
                        </b></span>
                        <span><b>{survey.timelinessRating}⭐</b></span>
                        <span><b>{survey.uponRequest}</b></span>
                        <span><b>{survey.duration}</b></span>
                    </div>  
                </div>

                <div className="flex w-full px-1 bg-blue-300  border-b-1 border-t-1 border-black">
                    <span><b>RELEVANCE OF THE PROJECT</b></span>
                </div>
                <div className="flex w-full  px-1">
                    <div className="flex-1 flex flex-col">
                        <span><b>3. Did the project address your key needs and challenges?</b></span>
                        <span>- Please specify the needs and challenges</span>
                        <span><b>Rating on Relevance</b></span>
                        <span><b>4. Was the project suitable for the local environment and economic conditions?</b></span>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <span><b>{survey.q3}&nbsp;
                            {survey.q3 === "did not addressed the need" && <span>-&nbsp;{survey.q3Reason}</span>}
                        </b></span>
                        <span><b>{survey.challenges || "N/A"}</b></span>
                        <span><b>{survey.relevanceRating}⭐</b></span>
                        <span className="flex-grow"></span>
                        <span><b>{survey.q4}&nbsp;
                            {survey.q4 === "not suitable for the area" && <span>-&nbsp;{survey.q4Reason}</span>}  
                        </b></span>
                    </div>  
                </div>


                <div className="flex w-full px-1 bg-blue-300  border-b-1 border-t-1 border-black">
                    <span><b>COHERENCE OF THE PROJECT</b></span>
                </div>
                <div className="flex w-full  px-1">
                    <div className="flex-1 flex flex-col">
                        <span><b>5. Were beneficiaries/stakeholders engaged and coordinated throughout the project?</b></span>
                        <span><b>Rating on Coherence</b></span>
                        <span><b>6. Were there any complementarity or duplications with other projects or initiatives?</b>(If yes, pls specify project from other NGA/NGO)</span>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <span className="flex-grow"></span>
                        <span><b>{survey.q5}&nbsp;
                            {survey.q5 === "not aware of the type of project given" && <span>-&nbsp;{survey.q5Reason}</span>}</b></span>
                        <span><b>{survey.coherenceRating}⭐</b></span>
                        <span className="flex-grow"></span>
                        <span><b>{survey.q6}&nbsp;
                            {survey.q6 === "Yes" && <span>-&nbsp;{survey.q6Reason}</span>}</b></span>
                    </div>  
                </div>


                <div className="flex w-full px-1 bg-blue-300  border-t-1 border-b-1 border-black">
                    <span><b>EFFECTIVENESS OF THE PROJECT</b></span>
                </div>
                <div className="flex w-full  px-1">
                    <div className="flex-1 flex flex-col">
                        <span><b>7. Satisfaction on the project received</b></span>
                        <span>- Were you satisfied with the project given?</span>
                        <span><b>Rating on Satisfaction</b></span>
                        <span>- Were you able to use it as soon as given?</span>
                        <span><b> 8. Were there problems encountered during project operation?</b></span>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <span className="flex-grow"></span>
                        <span><b>{survey.q7Satisfied}&nbsp;
                            {survey.q7Satisfied === "not satisfied by the project" && <span>-&nbsp;{survey.q7_1}</span>}</b></span>
                        <span><b>{survey.satisfactionRating}⭐</b></span>
                        <span><b>{survey.q7_2}&nbsp;
                            {survey.q7_2 === "No" && <span>-&nbsp;{survey.q7_2Reason}</span>}    
                        </b></span>
                        <span><b>{survey.q8}&nbsp;
                            {survey.q8 === "Yes" && <span>-&nbsp;{survey.q8Reason}</span>}
                        </b></span>
                    </div>  
                </div>


                




                <div className="flex w-full px-1 bg-blue-300  border-t-1 border-b-1 border-black">
                    <span><b>IMPACT OF THE PROJECT</b></span>
                </div>
                <div className="flex w-full  px-1">
                    <div className="flex-1 flex flex-col">
                        <span><b>9. Benefits from the project</b></span>
                        <span>- Did it increase your catch/production (kg)?</span>
                        <span className="indent-4">- Catch/yield before project was given</span>
                        <span className="indent-4">- Catch/yield after project was given</span>
                        <span className="indent-4">- Contribution to Production in kgs.</span>
                        <span className="indent-4"><i>Aquaculture (culture period, survival rate, no. of pcs/kilo)</i></span>
                        <span className="indent-4"><i>Capture (catch/day, no. of fishing operations- day/month)</i></span>
                        <span>- Did it increase your income (Php)?</span>
                        <span className="indent-4">- Income before project was given (net/operation)</span>
                        <span className="indent-4">- Income after project was given (net/operation)</span>
                        <span>- Any improvement in your family/household?</span>
                        <span>- Any improvement in your association?</span>
                        <span>- Any improvement in the community?</span>
                        <span><b>Rating on Impact</b></span>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <span className="flex-grow"></span>
                        <span><b>{survey.q9_1 || "N/A"}</b></span>
                        <span><b>{survey.q9_2 || "N/A"}</b></span>
                        <span><b>{survey.q9_3 || "N/A"}</b></span>
                        <span><b>{survey.q9_4 || "N/A"}</b></span>
                        <span><b>{survey.q9_5 || "N/A"}</b></span>
                        <span><b>{survey.q9_6 || "N/A"}</b></span>
                        <span><b>{survey.q9_7 || "N/A"}</b></span>
                        <span><b>{survey.q9_8 || "N/A"}</b></span>
                        <span><b>{survey.q9_9 || "N/A"}</b></span>
                        <span><b>{survey.q9_10 || "N/A"}</b></span>
                        <span><b>{survey.q9_11 ? survey.q9_11.join(', ') : "N/A"}</b></span>
                        <span><b>{survey.q9_12 || "N/A"}</b></span>
                        <span><b>{survey.q9_13 || "N/A"}</b></span>
                        <span><b>{survey.impactRating}⭐</b></span>
                    </div>  
                </div>


                <div className="flex w-full px-1 bg-blue-300 border-t-1 border-b-1 border-black">
                    <span><b>SUSTAINABILITY OF THE PROJECT</b></span>
                </div>
                <div className="flex w-full px-1">
                    <div className="flex-1 flex flex-col">
                        <span><b>10. Is the project ongoing/operational/used?</b></span>
                        <span>If yes, how long did the project last?</span>
                        <span><b>Rating on Sustainability</b></span>
                        <span><b>11. Availability of market for the produce (fresh or processed)?</b></span>
                        <span>Please specify:</span>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <span><b>{survey.q10}&nbsp;
                            {survey.q10 === "No" && <span>-&nbsp;{survey.q10Reason}</span>}
                        </b></span>
                        <span><b>{survey.q10_1}</b></span>
                        <span><b>{survey.sustainabilityRating}⭐</b></span>
                        <span><b>{survey.q11}</b></span>
                        <span><b>{survey.q11_1}</b></span>
                    </div>  
                </div>


                <div className="flex w-full px-1 bg-blue-300  border-t-1 border-b-1 border-black">
                    <span><b>NEEDS ASSESSMENT</b></span>
                </div>
                <div className="flex w-full  px-1">
                    <div className="flex-1 flex flex-col">
                        <span><b>12. How else can the government through BFAR help or assist you?</b></span>
                        <span>(credit facilitation, training, livelihood assistance, others, please specify):</span>
                        <span><b>{survey.q12 || "N/A"}</b></span>
                    </div>
                </div>
                <div className="flex w-full  px-1 border-t-1 border-black">
                    <div className="flex-1 flex flex-col">
                        <span><b>Evaluator's Note (cite practices, success stories and other observations):</b></span>
                        <span><b>{survey.note || "N/A"}</b></span>
                    </div>
                </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default View;
