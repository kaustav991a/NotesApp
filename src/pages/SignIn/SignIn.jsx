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
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    toast.info("Signing you in...", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    // Simulate a 3-second delay
    setTimeout(async () => {
      try {
        const res = await signInWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
        if (res) {
          toast.dismiss();
          toast.success("Signed in successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/notes");
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
        toast.dismiss();
        toast.error(`Error: ${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }, 2000); // 2000 milliseconds = 2 seconds
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
                  {" "}
                  <FaArrowLeft />
                </Link>
                <h3 className="title-border">Sign In To Your Account</h3>
                <form className="form-sec" onSubmit={handleSignIn}>
                  <div className="inpt-wrp">
                    <input
                      type="text"
                      placeholder="Email"
                      value={user.email}
                      onChange={(e) => {
                        setUser({ ...user, email: e.target.value });
                      }}
                    />
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
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <div className="inpt-wrp submit">
                    <input type="submit" value="Sign In" />
                  </div>
                  <div className="inpt-wrp">
                    <h6>
                      New here? <Link to="/signup">Let's create a account</Link>
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
