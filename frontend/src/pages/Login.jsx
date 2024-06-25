import React from "react";
import Form from "../components/Form";
import { userLogin } from "../utils/Constants";

const Login = () => {
  return <Form route={userLogin} method="login" />;
};

export default Login;
