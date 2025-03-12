import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { MdPrint, MdFileOpen } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";


const Reports = () => {
  const currentDate = new Date();
  const date = format(currentDate, 'MM/dd/yyyy');
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

  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Survey Data");

    const headers = [
      "Respondent No.",
      "Province/City",
      "Municipality/District",
      "Baranggay",
      "Project Received",
      "Specific Project",
      "No. of Units Received",
      "Remarks on Sufficiency",
      "Remarks on Quality",
    ];

    const headerRow = worksheet.addRow(headers);

    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4F81BD" },
      };
      cell.alignment = { horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    surveys.forEach((survey, index) => {
      const row = worksheet.addRow([
        index + 1,
        survey.province,
        survey.municipality,
        survey.baranggay,
        survey.projectReceived,
        survey.specProject,
        survey.unitsReceived || "N/A",
        survey.remarksSufficiency || "N/A",
        survey.remarksQuality || "N/A",
      ]);

      row.getCell(1).alignment = { horizontal: "center" };

      if (index % 2 === 0) {
        row.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF2F2F2" },
          };
        });
      }
    });

    worksheet.columns.forEach((column) => {
      column.width = 20;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "ReportSummary.xlsx");
  };

  return (
    <div className="w-full p-10 flex flex-col gap-10 overflow-xp-auto">


      <div className="p-10 bg-white rounded-box shadow-sm overflow-x-auto">
        <h2 className="text-center font-black text-lg text-gray-600">TOTAL NO. OF RESPONDENTS =  {totalRes}</h2>
        <div className="badge badge-success badge-lg mx-auto block mb-10 font-bold text-white">As of {date}</div>

        <div className="flex justify-between mb-8 items-end">
          <div className="felx flex-col">
            <h2 className="card-title text-blue-950 font-black">
              Field Monitoring and Evaluation Summary
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-success w-32 text-green-50" onClick={exportExcel}>
              <MdFileOpen /> Export
            </button>
            <button className="btn btn-error w-32 text-blue-50" onClick={() => reactToPrintFn()}>
              <MdPrint /> Print
            </button>
          </div>
        </div>


        <div ref={contentRef} className="overflow-x-auto border border-base-content/5 bg-base-100 text-xs">
          <table className="table table-zebra text-sm">
            <tbody>
              <tr className='bg-blue-950 text-white'>
                <th className='py-2 whitespace-nowrap' rowSpan="2">No.</th>
                <th className='py-2 whitespace-nowrap text-center' colSpan="3">Location</th>
                <th className='py-2 whitespace-nowrap' rowSpan="2">Project Received</th>
                <th className='py-2 whitespace-nowrap' rowSpan="2">Specific Project</th>
                <th className='py-2 whitespace-nowrap' rowSpan="2">No. of Units Received</th>

                <th className='py-2 whitespace-nowrap text-center' colSpan="3">Efficiency of the Project</th>
                <th className='py-2 whitespace-nowrap text-center' colSpan="2">Relevance of the Project</th>
                <th className='py-2 whitespace-nowrap text-center' colSpan="2">Coherence of the Project</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>
                <th className='py-2 whitespace-nowrap'>No. of Units Received</th>

              </tr>

              <tr className='bg-gray-600'>
                <th className='py-2 whitespace-nowrap'>Province/City</th>
                <th className='py-2 whitespace-nowrap'>Municipality/District</th>
                <th className='py-2 whitespace-nowrap'>Baranggay</th>

                <th className='py-2 whitespace-nowrap'>Remarks on Sufficiency</th>
                <th className='py-2 whitespace-nowrap'>Remarks on Quality</th>
                <th className='py-2 whitespace-nowrap'>Remarks on Timeliness</th>

                <th className='py-2 whitespace-nowrap'>Remarks on Relevance</th>
                <th className='py-2 whitespace-nowrap'>Remarks on Sustainability</th>

                <th className='py-2 whitespace-nowrap'>Remarks on Coherance</th>
                <th className='py-2 whitespace-nowrap'>Remarks on Project Duplication</th>
              </tr>
              {surveys.map((survey, index) => (
                <tr key={index} className='py-0'>
                  <th className='py-1 whitespace-nowrap'>{index + 1}</th>
                  <td className='py-1 whitespace-nowrap'>{survey.province}</td>
                  <td className='py-1 whitespace-nowrap'>{survey.municipality}</td>
                  <td className='py-1 whitespace-nowrap'>{survey.baranggay}</td>
                  <td className='py-1 whitespace-nowrap'>{survey.projectReceived}</td>
                  <td className='py-1 whitespace-nowrap'>{survey.specProject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;
