import React, { useState } from "react";
import { MdPerson, MdLock } from "react-icons/md";
import logo from "./../assets/images/bfar.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false); // ⬅️ Loading state added

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // ⬅️ Start loading

    try {
      const res = await axios.post(
        "https://bfar-server.onrender.com/api/login",
        {
          username,
          password,
        }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name); 
        navigate("/dashboard");
      } else {
        setToastMessage(res.data.error || "Login failed");
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      setToastMessage(err.message);
      setTimeout(() => setToastMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-1 justify-center items-center p-10 bg-gray-100">
        {toastMessage && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-error text-white">
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        <div className="flex-1 h-full grid place-items-center p-5">
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-2 bg-white shadow-sm rounded-lg p-10"
          >
            <div className="avatar flex w-full justify-center">
              <div className="w-24 rounded-full">
                <img src={logo} alt="BFAR logo" className="w-30" />
              </div>
            </div>
            <h1 className="text-center text-3xl font-black text-blue-950">
              BFAR XI
            </h1>
            <h2 className="font-bold text-gray-600">
              Field Monitoring and Evaluation System
            </h2>
            <h1 className="mt-6 font-bold text-2xl mb-2 text-blue-950">
              Login
            </h1>

            <label className="input bg-gray-100 text-gray-700 outline-0">
              <MdPerson size={22} className="text-gray-600" />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </label>

            <label className="input bg-gray-100 text-gray-700">
              <MdLock size={22} className="text-gray-600" />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </label>

            <button
              type="submit"
              className="btn btn-success text-white mt-2"
              disabled={loading}
              aria-busy={loading}
              aria-live="polite"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-md "  aria-hidden="true"></span>
                  <span className="visually-hidden">Logging in...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
