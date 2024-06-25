import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../utils/axios";
import { setLogin } from "../auth/Redux/authReducer";

function Form({ route, method }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(route, { username, password });
      if (method === "login") {
        dispatch(
          setLogin({
            user: res.data.user,
            access: res.data.access,
            refresh: res.data.refresh,
          })
        );
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.detail || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center mx-auto my-12 p-6 rounded-lg shadow-md max-w-md"
    >
      <h1 className="text-2xl mb-4">{name}</h1>
      <input
        type="text"
        className="w-11/12 p-2 mb-4 border border-gray-300 rounded-lg"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        className="w-11/12 p-2 mb-4 border border-gray-300 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className="w-11/12 p-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        type="submit"
      >
        {name}
      </button>
    </form>
  );
}

export default Form;
