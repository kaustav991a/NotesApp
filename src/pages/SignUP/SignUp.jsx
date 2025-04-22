import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./SignUp.scss"
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
function SignUp() {
    return (
        <>
            <section className="auth-sec">
                <img src="../images/hero_1.jpg" alt="" />
                <img className='map-img' src="../images/map_line.png" alt="" />
                <Container >
                    <Row>
                        <Col lg={12}>
                            <div className="auth-wrap">
                                <Link to="/" className="nextBackBtn"> <FaArrowLeft /></Link>
                                <h3 className='title-border'>Sign Up Your Account</h3>
                                <form className='form-sec'>
                                    <div className="inpt-wrp">
                                        <input type="email" placeholder='Email' />
                                    </div>
                                    <div className="inpt-wrp">
                                        <input type="name" placeholder='Email' />
                                    </div>
                                    <div className="inpt-wrp">
                                        <input type="email" placeholder='Email' />
                                    </div>
                                    <div className="inpt-wrp">
                                        <input type="password" placeholder='Password' />
                                    </div>
                                    <div className="inpt-wrp">
                                        <input type="password" placeholder='Confirm Password' />
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="checkbox" class="form-check-input" id="validationFormCheck1"
                                        />
                                        <label class="form-check-label" for="validationFormCheck1">I accept the <a href="#">Terms and Conditions</a></label>
                                    </div>
                                    <div className="inpt-wrp submit">
                                        <input type="submit" value='Start Registration' />
                                    </div>
                                    <div className="inpt-wrp">
                                        <h6>Already a user? <Link to="auth/signin">just sign in here!</Link></h6>
                                    </div>
                                </form>
                            </div>
                        </Col>
                       
                    </Row>

                </Container>

            </section>
        </>
    )
}

export default SignUp