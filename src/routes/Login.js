import React, { useRef, useState } from "react";

import { Button, Card, Col, Input, Row } from "antd";
import { EyeOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {loginRequest} from "../clients/AuthClient"
import AlertMap from "../components/feedback/AlertMap";
import { useAuth } from "../util/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messageState, setMessageState] = useState({type: "error", messages: []});
  const {setToken} = useAuth();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current?.input?.value;
    const password = passwordRef.current?.input?.value

    if (!email || !password) {
      setMessageState({type: "error", messages: ['Please enter a valid email/password']});
      setLoading(false);
    }

    const response = await loginRequest(email, password);
    if (response.status !== 200) {
      console.log('in login: ', response)
      setMessageState({type: "error", messages:response.errors});
    }
    else {
      setMessageState({type: "success", messages: ["Success! Redirecting ..."]});
      setToken(response.body.token);
      setTimeout(() => navigate('/dashboard'), 1000)
    }

    setLoading(false);
  }
  return (
    <Row style={{height: 'calc(100vh - 64px)', alignItems: 'center', marginTop: '-64px'}}>
      <Col span={12} offset={6}>
        <Card title={<h3 style={{textAlign: 'center'}}>Login</h3>}>
          <AlertMap type={messageState.type} messages={messageState.messages} />
          <Row style={{marginTop: '1em'}}>
            <Input ref={emailRef} type="email" size="large" placeholder="email" prefix={<MailOutlined />} />
          </Row>
          <Row style={{marginTop: '1em'}}>
            <Input ref={passwordRef} size="large" placeholder="password" type="password" prefix={<EyeOutlined />}/>
          </Row>
          <br />
          <Row>
            <Button className="auth-button" onClick={(e) => login(e)} type="primary" loading={loading}>Login</Button>
          </Row>
          <Row style={{marginTop: '2em'}}>
            <span>
              Need an account? <Link to={"/register"}>Sign up!</Link>
            </span>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
