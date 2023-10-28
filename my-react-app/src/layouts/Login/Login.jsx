import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import "./Login.css"

export default function Login() {
  
  const [isShowRegister,setIsShowRegister] = useState(false)
 
  const [isShowErrortips,setIsShowErrortips]=useState(false)
  
  const [tips,setTips] = useState("")
  const  regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/;

  
  function toggleLogin  (){
    setIsShowRegister (!isShowRegister)
    setIsShowErrortips (false)
  }

  const imageStyle = {
    width: '100%',
    height: 'auto',
  };
  const cardStyle = {
    width: '100%',
    height: '100vh',
  };

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [SignData,setSignData] = useState({
    grade: 1,
    password: "",
    username: ""
  })

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {username,password} = loginData
    if (!username){
      setIsShowErrortips (true)
      setTips ('please input your username')
      return
    }
    else if (!regex.test(password)){
      setIsShowErrortips (true)
      setTips ('password does not meet the requirement')
      return
    }
    else{
      setIsShowErrortips (false)
    }
    
    try {
      const response = await axios.post('/admin/login', loginData);
      console.log(response)
      
      console.log('Login successful:', response.data);
      if (response.data.res===0){
        setIsShowErrortips (true)
        setTips (response.data.resMsg)
      }else{
       
        localStorage.setItem('adminId', response.data.result.id);
       
        history.push('/');
        window.location.reload()
      }
    } catch (error) {
      console.error('Login error:', error);
     
    }

  };


  const handleRegisterSubmit = async (e)=>{
    e.preventDefault();
      const {grade,password,confirmPassword,username} = SignData
      if (!username){
        setIsShowErrortips (true)
        setTips ('please input your username')
      }else if (!regex.test(password)){
        setIsShowErrortips (true)
        setTips ('password does not meet the requirement')
      }else if (password!==confirmPassword){
        setIsShowErrortips (true)
        setTips ('The two password inputs are inconsistent')
      }else if (!grade){
        setIsShowErrortips (true)
        setTips ('please select your grade')
      }else{
        const response= await axios.post('/admin/signup',{grade,password,username})
        console.log(response)
        if (response.data.res===0){
          setIsShowErrortips (true)
          setTips (response.data.resMsg)
        }else{
         
          localStorage.setItem('adminId', response.data.result.id);
         
          history.push('/');
          window.location.reload()
        }
      }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleRegisterForm = (e) => {
    console.log(e)
    e.preventDefault()
    const { name, value } = e.target;
    setSignData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };
  

  useEffect(() => {
    if (localStorage.getItem('adminId')){
      history.push('/')
    }
  },[history]);

  return (
    <div style={{ position: 'fixed', top: '0', right: '0', bottom: '0', left: '0', overflow: 'auto', backgroundColor: 'white' }}>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><img src="/Logo.png" alt="" style={{width: '50%'}} /></Navbar.Brand>
          <Navbar.Brand href="/">Alumni Circle Management System </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">About us</Nav.Link>
          </Nav>
          <Button onClick={toggleLogin}>{isShowRegister ? 'Login':'Register'} </Button>
        </Container>
      </Navbar>

      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Card bg="light" text="dark" style={cardStyle}>
            <Card.Body>
              <Container>
                <Row>
                  {
                    isShowRegister ?   <Col md={6}>
                      <h1>Register</h1>
                      <Form onSubmit={handleRegisterSubmit}>
                              <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your username"
                                    name='username'
                                    value={SignData.username}
                                    onChange={handleRegisterForm}
                                />
                              </Form.Group>
                              <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    name= 'password'
                                    value={SignData.password}
                                    onChange={handleRegisterForm}
                                />
                              </Form.Group>
                              <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    name= 'confirmPassword'
                                    value={SignData.confirmPassword}
                                    onChange={handleRegisterForm}
                                />
                              </Form.Group>
                              <Form.Group controlId="password">
                                <Form.Label>Grade</Form.Label>
                                <Form.Select aria-label="Default select example"  value={SignData.college} name="college" onChange={handleRegisterForm}>
                                  {
                                    [1,2,3].map((item,index)=>{
                                      return <option value={item} key={index}>{item}</option>
                                    })
                                  }
                                </Form.Select>
                              </Form.Group>
                              <div className="loginButton registerButton" >
                                <p style={{display: isShowErrortips ? "block":"none"}}>{tips}</p>
                                <Button variant="primary" type="submit" style={{marginTop: '5px'}}>
                                  Register
                                </Button>
                              </div>
                      </Form>
                      <Button variant="link" onClick={toggleLogin}>
                       Login
                      </Button>
                    </Col> :
                        <Col md={6}>
                      <h1>{'Login'}</h1>
                      <Form onSubmit={handleSubmit}>
                            <>
                              <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your username"
                                    name='username'
                                    value={loginData.username}
                                    onChange={handleChange}
                                />
                              </Form.Group>
                              <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    name= 'password'
                                    value={loginData.password}
                                    onChange={handleChange}
                                />
                              </Form.Group>
                              <div className="loginButton">
                                <p style={{display: isShowErrortips ? "block":"none"}}>{tips}</p>
                                <Button variant="primary" type="submit" style={{marginTop: '5px'}}>
                                  Login
                                </Button>
                              </div>

                            </>
                      </Form>
                      <Button variant="link" onClick={toggleLogin}>
                        Register
                      </Button>
                    
                    </Col>
                  }
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src="/fb_share1.png" alt="" style={imageStyle} />
        </div>
      </div>
    </div>
  );
}
