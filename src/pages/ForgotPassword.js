import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import "../styles/forgotpassword.css";

const ForgotPassword = () => {
  const [email,setEmail] = useState('')
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("An email to reset password was sent");
      navigate("/signin");
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  };
  return (
    <Layout title="Reset your password">
      <div className="row forgot-password-container">
        <div className="col-md-7 forgot-password-col1">
          <img src="./assets/forgot-password.svg" alt="forgot-img" />
        </div>
        <div className="col-md-5 forgot-password-col2">
          <h1>Reset Your Password</h1>
          <form onSubmit={onSubmitHandler}>
            <div className=" mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                An email will be sent to you.
              </div>
            </div>
            <div className="d-flex justify-content-between btn-goup">
              <button type="submit" className="btn ">
                Reset Password
              </button>
              <button
                type="button"
                className="btn signin"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;