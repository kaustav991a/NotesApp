import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import "./SignUp.scss";
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { doc, setDoc } from 'firebase/firestore';

function SignUp() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        acceptedTerms: false
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        acceptedTerms: ""
    });

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        setErrors({
            name: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            acceptedTerms: ""
        });

        let valid = true;

      
        if (!user.name.trim()) {
            setErrors(prev => ({ ...prev, name: "Full Name is required" }));
            valid = false;
        }

        if (!user.email.trim()) {
            setErrors(prev => ({ ...prev, email: "Email is required" }));
            valid = false;
        }

        if (!user.username.trim()) {
            setErrors(prev => ({ ...prev, username: "Username is required" }));
            valid = false;
        }

        if (!user.password.trim()) {
            setErrors(prev => ({ ...prev, password: "Password is required" }));
            valid = false;
        }

        if (!user.confirmPassword.trim()) {
            setErrors(prev => ({ ...prev, confirmPassword: "Confirm Password is required" }));
            valid = false;
        }

        if (user.password !== user.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
            valid = false;
        }

        if (!user.acceptedTerms) {
            setErrors(prev => ({ ...prev, acceptedTerms: "You must accept the terms and conditions" }));
            valid = false;
        }

        if (!valid) return   ;

   
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
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    />
                                    {errors.name && <p className="error">{errors.name}</p>}
                                </div>
                                <div className="inpt-wrp">
                                    <input
                                        type="email"
                                        placeholder='Email'
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />
                                    {errors.email && <p className="error">{errors.email}</p>}
                                </div>
                                <div className="inpt-wrp">
                                    <input
                                        type="text"
                                        placeholder='Username'
                                        value={user.username}
                                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    />
                                    {errors.username && <p className="error">{errors.username}</p>}
                                </div>
                                <div className="inpt-wrp">
                                    <input
                                        type="password"
                                        placeholder='Password'
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    />
                                    {errors.password && <p className="error">{errors.password}</p>}
                                </div>
                                <div className="inpt-wrp">
                                    <input
                                        type="password"
                                        placeholder='Confirm Password'
                                        value={user.confirmPassword}
                                        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                                    />
                                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="validationFormCheck1"
                                        checked={user.acceptedTerms}
                                        onChange={(e) =>
                                            setUser({ ...user, acceptedTerms: e.target.checked })
                                        }
                                    />
                                    <label className="form-check-label" htmlFor="validationFormCheck1">
                                        I accept the <a href="#">Terms and Conditions</a>
                                    </label>
                                    {errors.acceptedTerms && <p className="error">{errors.acceptedTerms}</p>}
                                </div>

                                <div className="inpt-wrp submit">
                                    <input type="submit" value='Register' />
                                </div>
                                <div className="inpt-wrp">
                                    <h6>Already a user? <Link to="/signin">just sign in here!</Link></h6>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default SignUp;
