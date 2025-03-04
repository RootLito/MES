import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./../assets/images/bfar.png";

import {
    MdInsertDriveFile,
    MdViewList,
    MdAssessment,
    MdOutlineBookmark,
} from "react-icons/md";

const Home = () => {
    const navigate = useNavigate();

    const onClick = (link) => {
        navigate(link);
    };

    return (
        <div className="max-w-[900px] min-h-screen mx-auto p-5 flex flex-col">
            <div className="w-full h-[80px] flex justify-center  items-center gap-5">
                <img src={logo} alt="BFAR XI Logo" className="w-[80px]" />
                <p className="text-5xl font-extrabold opacity-80">BFAR XI</p>
            </div>

            <div className="flex flex-col flex-1 gap-5 items-center justify-center">
                <div className="flex gap-5">
                    <div
                        className="w-[150px] h-[150px] rounded-xl cursor-pointer flex flex-col gap-2 items-center justify-center shadow-md hover:shadow-lg"
                        onClick={() => onClick("/survey")}
                    >
                        <MdInsertDriveFile className="text-5xl opacity-80" />
                        <p className="font-semibold opacity-75 ">New Survey</p>
                    </div>
                    <div
                        className="w-[150px] h-[150px] rounded-xl cursor-pointer flex flex-col gap-2 items-center shadow-md hover:shadow-lg justify-center"
                        onClick={() => onClick("/list")}
                    >
                        <MdViewList className="text-5xl opacity-80" />
                        <p className="font-semibold opacity-75">Survey Lists</p>
                    </div>
                </div>
                <div className="flex gap-5">
                    <div
                        className="w-[150px] h-[150px] rounded-xl cursor-pointer flex flex-col gap-2 items-center justify-center shadow-md hover:shadow-lg"
                        onClick={() => onClick("/analytics")}
                    >
                        <MdAssessment className="text-5xl opacity-80" />
                        <p className="font-semibold opacity-75">Analytics</p>
                    </div>
                    <div
                        className="w-[150px] h-[150px] rounded-xl cursor-pointer flex flex-col gap-2 items-center justify-center shadow-md hover:shadow-lg"
                        onClick={() => onClick("/list")}
                    >
                        <MdOutlineBookmark className="text-5xl opacity-80" />
                        <p className="font-semibold opacity-75">Reports</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Home;
