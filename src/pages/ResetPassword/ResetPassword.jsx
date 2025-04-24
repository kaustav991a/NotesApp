import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./ResetPassowrd.scss"
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6"; 
import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from "../../firebase";
import { useState } from 'react';

function ResetPassword() {
    const [user , setUser] = useState();
    
    const handleReset = async (e) =>{
       e.preventDefault();
      try{
            await sendPasswordResetEmail (auth , user);
           alert("password reset link is shared over email");
      }catch (error){
        console.log(error);
      }
    }
  return (
     <section className="auth-sec">
            <Container >
                <Row>
                    <Col lg={12}>
                        <div className="auth-wrap">
                            <Link to="/" className="nextBackBtn"> <FaArrowLeft /></Link>
                            <h3 className='title-border'>Reset Your Password</h3>
                            <form className='form-sec' onSubmit={handleReset}>
                               
                                <div className="inpt-wrp">
                                    <input type="email" placeholder='Enter your email or username ' value={user} onChange={(e)=>{setUser(e.target.value)}} />
                                </div>
                                <div className="inpt-wrp submit">
                                    <input type="submit" value='Reset' />
                                </div>
                            </form>
                        </div>
                    </Col>

                </Row>

            </Container>

        </section>
  )
}

export default ResetPassword