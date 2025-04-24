import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
    gender: "male",
  });
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!user.acceptedTerms) {
      setError("Please accept the terms and conditions.");
      return;
    }

    toast.info("Creating your account...", {
      // Show a toast notification
      position: "top-right",
      autoClose: false, // Keep it open until we manually close it
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const uid = res.user.uid;
      await setDoc(doc(db, "users", uid), {
        name: user.name,
        email: user.email,
        username: user.username,
        acceptedTerms: user.acceptedTerms,
        createdAt: new Date(),
        gender: user.gender,
      });
      console.log("data added succesfully");
      toast.dismiss(); // Dismiss the toast
      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/notes");
    } catch (err) {
      console.error("Error signing up:", err);
      setError(err.message);
      toast.dismiss(); // Dismiss the info toast on error
      toast.error(`Error: ${err.message}`, {
        // Show error in toast
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e) => {
    setUser({ ...user, gender: e.target.value });
  };

  return (
    <>
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <section className="auth-sec">
        <img src="../images/hero_1.jpg" alt="" />
        <img className="map-img" src="../images/map_line.png" alt="" />
        <Container>
          <Row>
            <Col lg={12}>
              <div className="auth-wrap">
                <Link to="/" className="nextBackBtn">
                  {" "}
                  <FaArrowLeft />
                </Link>
                <h3 className="title-border">Sign Up Your Account</h3>
                <form className="form-sec" onSubmit={handleSignUp}>
                  <div className="inpt-wrp">
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="inpt-wrp">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="inpt-wrp">
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={user.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="inpt-wrp">
                    <select
                      id="gender"
                      name="gender"
                      value={user.gender}
                      onChange={handleGenderChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Rather not to say</option>
                    </select>
                  </div>
                  <div className="inpt-wrp">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="inpt-wrp">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={user.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="validationFormCheck1"
                      name="acceptedTerms"
                      checked={user.acceptedTerms}
                      onChange={handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="validationFormCheck1"
                    >
                      I accept the <a href="#">Terms and Conditions</a>
                    </label>
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <div className="inpt-wrp submit">
                    <input type="submit" value="Register" />
                  </div>
                  <div className="inpt-wrp">
                    <h6>
                      Already a user?{" "}
                      <Link to="/signin">just sign in here!</Link>
                    </h6>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default SignUp;
