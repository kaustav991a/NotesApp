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
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function SignUp() {
    const navigate = useNavigate();
    const [passwordStrength, setPasswordStrength] = useState("");


    const [user, setUser] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        acceptedTerms: false,
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        acceptedTerms: "",
        gender: "male",
        all : "",
    });

 

    const getPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)) return "Strong";
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) return "Medium";
    return "Weak";
};

    const validateFields = (name, value) => {

        switch (name) {
            case "name":
                return value.trim().length < 3 ? "Please enter a valid name" : "";

            case "email":
                return !/^\S+@\S+\.\S+$/.test(value) ? "Invalid email format" : "";

            case "username":
                return value.trim() === "" ? "Username is required" : "";

            case "password":
                return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value)
                    ? "Weak password (8+ chars, upper, lower, number, special)"
                    : "";

            case "confirmPassword":
                return value !== user.password ? "Passwords do not match" : "";

            case "acceptedTerms":
                return !value ? "Accept the terms" : "";

            default:
                return "";
        }
    };

    //   const [error, setError] = useState("");;

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(auth, user.email, user.password);
            const uid = res.user.uid;

            await setDoc(doc(db, "users", uid), {
                name: user.name,
                email: user.email,
                username: user.username,
                acceptedTerms: user.acceptedTerms,
                createdAt: new Date(),
            });

            console.log("User registered and data stored successfully");
            navigate("/notes");
        } catch (err) {
            console.log(err);
            setErrors({ ...errors, all: err.message });
        }
    };

    return (
        <section className="auth-sec">
            <img src="../images/hero_1.jpg" alt="" />
            <img className='map-img' src="../images/map_line.png" alt="" />
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="auth-wrap">
                            <Link to="/" className="nextBackBtn"><FaArrowLeft /></Link>
                            <h3 className='title-border'>Sign Up Your Account</h3>
                            <form className='form-sec' onSubmit={handleSignUp}>
                                <div className="inpt-wrp">
                                    <input
                                        type="text"
                                        placeholder='Full Name'
                                        value={user.name}
                                        onChange={(e) => {
                                            setUser({ ...user, name: e.target.value });
                                            setErrors({ ...errors, name: validateFields("name", e.target.value) });
                                        }}
                                    />
                                    {errors.name && <p className="error">{errors.name}</p>}
                                </div>
                                <div className="inpt-wrp">
                                    <input
                                        type="email"
                                        placeholder='Email'
                                        value={user.email}
                                        onChange={(e) => {
                                            setUser({ ...user, email: e.target.value });
                                            setErrors({ ...errors, email: validateFields("email", e.target.value) });
                                        }

                                        }
                                      
                                    />
                                    {errors.email && <p className="error">please enter a valid email</p>}
                                </div>
                                <div className="inpt-wrp">
                                    <input
                                        type="text"
                                        placeholder='Username'
                                        value={user.username}
                                        onChange={
                                            (e) => {
                                                setUser({ ...user, username: e.target.value });
                                                setErrors({ ...errors, username: validateFields("username", e.target.value) });
                                            }
                                        }
                                    />
                                    {errors.username && <p className="error">{errors.username}</p>}
                                </div>
                                <div className="inpt-wrp">
                                    <input
                                        type="password"
                                        placeholder='Password'
                                        value={user.password}

                                        onChange={
                                            (e) => {
                                                setUser({ ...user, password: e.target.value });
                                                setErrors({ ...errors, password: validateFields("password", e.target.value) });
                                                 setPasswordStrength(getPasswordStrength(e.target.value));
                                            }
                                        }
                                        
                                    />
                                     {
                                        user.password && (
                                            <>
                                              <p className={`strength ${passwordStrength.toLowerCase()}`}>
                                                Strength: {passwordStrength}
                                            </p>
                                            <div className={`indicator ${passwordStrength.toLowerCase()}`}>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                            </>
                                        )
                                    }
                                </div>
                                <div className="inpt-wrp">
                                    <input
                                        type="password"
                                        placeholder='Confirm Password'
                                        value={user.confirmPassword}
                                        onChange={
                                            (e) => {
                                                setUser({ ...user, confirmPassword: e.target.value });
                                                setErrors({ ...errors, confirmPassword: validateFields("confirmPassword", e.target.value) });
                                            }
                                        }
                                    />
                                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                                </div>
                                <div className="inpt-wrp">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="validationFormCheck1"
                                            checked={user.acceptedTerms}

                                            onChange={(e) => {
                                                    setUser({ ...user, acceptedTerms: e.target.checked });
                                                    setErrors({ ...errors, acceptedTerms: validateFields("acceptedTerms", e.target.checked) });
                                                }}

                                        />
                                        <label className="form-check-label" htmlFor="validationFormCheck1">
                                            I accept the <a href="#">Terms and Conditions</a>
                                        </label>

                                    </div>
                                    {errors.acceptedTerms && <p className="error">{errors.acceptedTerms}</p>}
                                </div>


                                <div className="inpt-wrp submit">
                                    <input type="submit" value='Register' />
                                </div>
                                <div className="inpt-wrp">
                                    <h6>Already a user? <Link to="/signin">just sign in here!</Link></h6>
                                </div>
                                <p>{errors.all}</p>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default SignUp;
