import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SignIn.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    acceptedTerms: false
  })


  const handleSignIn = async (e) =>{
     e.preventDefault();
     try {
       const res = await signInWithEmailAndPassword(auth, user.email , user.password);
       if(res){
          navigate("/notes");
       }
     } catch (error) {
         console.log(error);
     }
     

  }
   
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
              <form className="form-sec" onSubmit={handleSignIn}>
                <div className="inpt-wrp">
                  <input type="text" placeholder="Username" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                </div>
                <div className="inpt-wrp">
                  <input type="password" placeholder="Password" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="validationFormCheck1"
                  />
                  <label class="form-check-label" for="validationFormCheck1" checked={user.acceptedTerms} onChange={(e) =>
                    setUser({ ...user, acceptedTerms: e.target.checked })
                  }>
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
