import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SignIn.scss";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function SignIn() {
  return (
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
              <form className="form-sec">
                <div className="inpt-wrp">
                  <input type="text" placeholder="Username" />
                </div>
                <div className="inpt-wrp">
                  <input type="password" placeholder="Password" />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="validationFormCheck1"
                  />
                  <label class="form-check-label" for="validationFormCheck1">
                    I accept the <a href="#">Terms and Conditions</a>
                  </label>
                </div>
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
  );
}

export default SignIn;
