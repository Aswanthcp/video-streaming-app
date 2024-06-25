import React from "react";
import { userRegister } from "../utils/Constants";
import Form from "../components/Form";

const Register = () => {
  return <Form route={userRegister} method="register" />;
};

export default Register;
