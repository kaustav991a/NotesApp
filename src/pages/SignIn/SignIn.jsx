import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SignIn.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    firebaseError: ""
  });

  const handleSignIn = async (e) => {
    e.preventDefault();

    setErrors({
      username: "",
      password: "",
      firebaseError: ""
    });

    let valid = true;

    switch (true) {
      case !user.email.trim():
        setErrors(prev => ({ ...prev, username: "Email is required" }));
        valid = false;
        break;

      case !user.password.trim():
        setErrors(prev => ({ ...prev, password: "Password is required" }));
        valid = false;
        break;

      default:
        break;
    }

    if (!valid) return;

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      if (res) {
        navigate("/notes");
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, firebaseError: error.message }));
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <section className="auth-sec">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="auth-wrap">
                <Link to="/" className="nextBackBtn">
                  <FaArrowLeft />
                </Link>
                <h3 className="title-border">Sign In To Your Account</h3>
                <form className="form-sec" onSubmit={handleSignIn}>
                  <div className="inpt-wrp">
                    <input
                      type="email"
                      placeholder="Email"
                      value={user.email}
                      onChange={(e) => {
                        setUser({ ...user, email: e.target.value });
                      }}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                  </div>
                  <div className="inpt-wrp">
                    <input
                      type="password"
                      placeholder="Password"
                      value={user.password}
                      onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                      }}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                  </div>
                  {errors.firebaseError && <p className="error">{errors.firebaseError}</p>}
                  <div className="inpt-wrp submit">
                    <input type="submit" value="Sign In" />
                  </div>
                  <div className="inpt-wrp">
                    <h6>
                      New here? <Link to="/signup">Let's create an account</Link>
                    </h6>
                    <h6>
                      don't panic <Link to="/resetpassword">Forgot password?</Link>
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

export default SignIn;
