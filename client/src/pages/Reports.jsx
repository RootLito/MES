import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import axios from "axios";
import { MdPrint, MdFileOpen } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const Reports = () => {
  const currentDate = new Date();
  const date = format(currentDate, "MM/dd/yyyy");
  const [totalRes, setTotalRes] = useState(0);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get("http://localhost:5000/survey");
        setSurveys(response.data);
        setTotalRes(response.data.length);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

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

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Surveys");

    // Add headers
    worksheet.mergeCells("A1:A2");
    worksheet.getCell("A1").value = "No.";
    worksheet.mergeCells("B1:D1");
    worksheet.getCell("B1").value = "Location";
    worksheet.mergeCells("E1:E2");
    worksheet.getCell("E1").value = "Project Received";
    worksheet.mergeCells("F1:F2");
    worksheet.getCell("F1").value = "Specific Project";
    worksheet.mergeCells("G1:G2");
    worksheet.getCell("G1").value = "No. of Units Received";
    worksheet.mergeCells("H1:J1");
    worksheet.getCell("H1").value = "Efficiency of the Project";
    worksheet.mergeCells("K1:L1");
    worksheet.getCell("K1").value = "Relevance of the Project";
    worksheet.mergeCells("M1:N1");
    worksheet.getCell("M1").value = "Coherence of the Project";
    worksheet.mergeCells("O1:P1");
    worksheet.getCell("O1").value = "Effectiveness of the Project";
    worksheet.mergeCells("Q1:W1");
    worksheet.getCell("Q1").value = "Impact of the Project";
    worksheet.mergeCells("X1:Y1");
    worksheet.getCell("X1").value = "Sustainability of the Project";
    worksheet.mergeCells("Z1:Z2");
    worksheet.getCell("Z1").value = "Needs Assessment";
    worksheet.mergeCells("AA1:AA2");
    worksheet.getCell("AA1").value = "Evaluator's Note";

    worksheet.getCell("B2").value = "Province/City";
    worksheet.getCell("C2").value = "Municipality/District";
    worksheet.getCell("D2").value = "Baranggay";
    worksheet.getCell("H2").value = "Remarks on Sufficiency";
    worksheet.getCell("I2").value = "Remarks on Quality";
    worksheet.getCell("J2").value = "Remarks on Timeliness";
    worksheet.getCell("K2").value = "Remarks on Relevance";
    worksheet.getCell("L2").value = "Remarks on Sustainability";
    worksheet.getCell("M2").value = "Remarks on Coherance";
    worksheet.getCell("N2").value = "Remarks on Project Duplication";
    worksheet.getCell("O2").value = "Remarks on Satisfaction";
    worksheet.getCell("P2").value = "Problems Encountered during Project Implementation";
    worksheet.getCell("Q2").value = "Catch/Yield in Kgs";
    worksheet.getCell("R2").value = "Remarks on Contribution to Production";
    worksheet.getCell("S2").value = "Species Caught (Capture Only)";
    worksheet.getCell("T2").value = "Income in Php";
    worksheet.getCell("U2").value = "Improvement in Family/Household";
    worksheet.getCell("V2").value = "Improvement in Association";
    worksheet.getCell("W2").value = "Improvement in Community";
    worksheet.getCell("X2").value = "Remarks on Sustainability";
    worksheet.getCell("Y2").value = "Availability of Market";

    surveys.forEach((survey, index) => {
      const row = worksheet.addRow([
        index + 1,
        survey.province,
        survey.municipality,
        survey.baranggay,
        survey.projectReceived,
        survey.specProject,
        survey.noUnitsReceived,
        survey.specProject, // Replace with actual data
        survey.specProject, // Replace with actual data
        survey.specProject, // Replace with actual data
        survey.specProject, // Replace with actual data
        survey.specProject, // Replace with actual data
        survey.specProject, // Replace with actual data
        survey.specProject, // Replace with actual data
        survey.specProject, // Replace with actual data
        survey.specProject, // Replace with actual data
        survey.specProject, // Replace with actual data
        survey.specProject, // Replace with actual data
        survey.specProject, // Replace with actual data
        survey.specProject, // Replace with actual data
        survey.specProject, // Replace with actual data
        survey.q12,
        survey.note,
      ]);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "MONITORING & EVALUATION DATA.xlsx");
  };

  return (
    <div className="w-full p-10 flex flex-col gap-10 overflow-xp-auto">
      <div className="p-10 bg-white rounded-box shadow-sm overflow-x-auto">
        <h2 className="text-center font-black text-lg text-gray-600">
          TOTAL NO. OF RESPONDENTS AS OF {date}
        </h2>
        <div className="text-center">
          <div className="inline-block rounded-xl bg-blue-950 mb-10 font-bold text-white text-center text-5xl p-2">
            {totalRes}
          </div>
        </div>

        <div className="flex justify-between mb-8 items-end">
          <div className="felx flex-col">
            <h2 className="card-title text-blue-950 font-black">
              Field Monitoring and Evaluation Summary
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-success w-32 text-green-50"
              onClick={exportToExcel}
            >
              <MdFileOpen /> Export
            </button>
            {/* <button className="btn btn-error w-32 text-blue-50" onClick={() => reactToPrintFn()}>
              <MdPrint /> Print
            </button> */}
          </div>
        </div>

        <div
          ref={contentRef}
          className="overflow-x-auto border border-base-content/5 bg-base-100 text-xs"
        >
          <table className="table table-zebra text-sm">
            <thead>
              <tr className="bg-blue-950 text-white">
                <th className="py-2 whitespace-nowrap" rowSpan="2">
                  No.
                </th>
                <th className="py-2 whitespace-nowrap text-center" colSpan="3">
                  Location
                </th>
                <th className="py-2 whitespace-nowrap" rowSpan="2">
                  Project Received
                </th>
                <th className="py-2 whitespace-nowrap" rowSpan="2">
                  Specific Project
                </th>
                <th className="py-2 whitespace-nowrap" rowSpan="2">
                  No. of Units Received
                </th>

                <th className="py-2 whitespace-nowrap text-center" colSpan="3">
                  Efficiency of the Project
                </th>
                <th className="py-2 whitespace-nowrap text-center" colSpan="2">
                  Relevance of the Project
                </th>
                <th className="py-2 whitespace-nowrap text-center" colSpan="2">
                  Coherence of the Project
                </th>
                <th className="py-2 whitespace-nowrap text-center" colSpan="2">
                  Effectiveness of the Project
                </th>
                <th className="py-2 whitespace-nowrap text-center" colSpan="7">
                  Impact of the Project
                </th>

                <th className="py-2 whitespace-nowrap text-center" colSpan="2">
                  Sustainability of the Project
                </th>

                <th className="py-2 whitespace-nowrap text-center" rowSpan={2}>
                  Needs Assessment
                </th>

                <th className="py-2 whitespace-nowrap text-center" rowSpan={2}>
                  Evaluator's Note
                </th>
              </tr>

              <tr className="bg-blue-900 text-white">
                <th className="py-2 whitespace-nowrap">Province/City</th>
                <th className="py-2 whitespace-nowrap">
                  Municipality/District
                </th>
                <th className="py-2 whitespace-nowrap">Baranggay</th>

                <th className="py-2 whitespace-nowrap">
                  Remarks on Sufficiency
                </th>
                <th className="py-2 whitespace-nowrap">Remarks on Quality</th>
                <th className="py-2 whitespace-nowrap">
                  Remarks on Timeliness
                </th>

                <th className="py-2 whitespace-nowrap">Remarks on Relevance</th>
                <th className="py-2 whitespace-nowrap">
                  Remarks on Sustainability
                </th>

                <th className="py-2 whitespace-nowrap">Remarks on Coherance</th>
                <th className="py-2 whitespace-nowrap">
                  Remarks on Project Duplication
                </th>

                <th className="py-2 whitespace-nowrap">
                  Remarks on Satisfaction
                </th>
                <th className="py-2 whitespace-nowrap">
                  Problems Encountered during Project Implementation
                </th>

                <th className="py-2 whitespace-nowrap">Catch/Yield in Kgs</th>

                <th className="py-2 whitespace-nowrap">
                  Remarks on Contribution to Production
                </th>
                <th className="py-2 whitespace-nowrap">
                  Species Caught (Capture Only)
                </th>

                <th className="py-2 whitespace-nowrap">Income in Php</th>
                <th className="py-2 whitespace-nowrap">
                  Improvement in Family/Household
                </th>

                <th className="py-2 whitespace-nowrap">
                  Improvement in Association
                </th>
                <th className="py-2 whitespace-nowrap">
                  Improvement in Community
                </th>

                <th className="py-2 whitespace-nowrap">
                  Remarks on Sustainability
                </th>
                <th className="py-2 whitespace-nowrap">
                  Availability of Market
                </th>
              </tr>
            </thead>

            <tbody>
              {surveys.map((survey, index) => (
                <tr key={index} className="py-0">
                  <th className="py-2 whitespace-nowrap">{index + 1}</th>
                  <td className="py-2 whitespace-nowrap">{survey.province}</td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.municipality}
                  </td>
                  <td className="py-2 whitespace-nowrap">{survey.baranggay}</td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.projectReceived}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>

                  <td className="py-2 whitespace-nowrap">
                    {survey.noUnitsReceived}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>
                  <td className="py-2 whitespace-nowrap">{survey.q12}</td>
                  <td className="py-2 whitespace-nowrap">{survey.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
