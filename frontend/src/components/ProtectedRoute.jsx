import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../auth/Redux/authReducer";
import axios from "../utils/axios";
import { getRefresh } from "../utils/Constants";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const [isAuthorized, setIsAuthorized] = useState(null);

  const accessToken = useSelector((state) => state.auth.access);
  const refreshToken = useSelector((state) => state.auth.refresh);

  useEffect(() => {
    const auth = async () => {
      if (!accessToken) {
        setIsAuthorized(false);
        return;
      }

      try {
        const decoded = jwtDecode(accessToken);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
          const handleTokenRefresh = async () => {
            try {
              const res = await axios.post(getRefresh, {
                refresh: refreshToken,
              });
              if (res.status === 200) {
                const newAccessToken = res.data.access;
                const decoded = jwtDecode(newAccessToken);

                dispatch(
                  setLogin({
                    user: decoded.user,
                    access: newAccessToken,
                    refresh: refreshToken,
                  })
                );
                setIsAuthorized(true);
              } else {
                setIsAuthorized(false);
              }
            } catch (error) {
              console.error("Token refresh failed:", error);
              setIsAuthorized(false);
            }
          };

          await handleTokenRefresh();
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
        setIsAuthorized(false);
      }
    };

    auth();
  }, [accessToken, refreshToken, dispatch]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}
