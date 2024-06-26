import axios from "../utils/axios";
import { getUser } from "../utils/Constants";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const accessToken = useSelector((state) => state.auth.access);
  const [user, setUser] = useState(null);
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    const id = decoded.user_id;

    useEffect(() => {
      axios
        .get(`${getUser}${id}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [accessToken, id]);
  }

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="p-2 border rounded-md"
        />
      </div>
      <div className="space-x-4 flex items-center">
        {user ? (
          <div className="flex items-center space-x-2">
            <img
              className="inline-block h-12 w-12 rounded-full"
              src="https://cdn-icons-png.freepik.com/256/64/64572.png?semt=ais_hybrid"
              alt="Dan_Abromov"
            />
            <span className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {user?.username}
              </span>
              <span className="text-sm font-medium text-gray-500">
                @dan_abromov
              </span>
            </span>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 bg-gray-200 rounded-md">
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
