import { Button, Col, Row, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import TradingViewWidget from "../components/stocks/TradingView";

const Home = () => {
  return (
    <Space direction="vertical" style={{width: '100vw'}}>
     <Row className="mt-1">
      <Col span={24} className="text-center">
        <h1 className="home-heading">NEXTGEN: Easy online trading!</h1>
      </Col>
     </Row>
     <Row style={{justifyContent: 'center'}}>
        <Space>
        <Link to={'/login'}>
          <Button size="large">Login</Button>
        </Link>
        <Link to={'/register'}>
         <Button size="large"> Sign Up</Button>
        </Link>
        </Space>
      
     </Row>
     <Row style={{height: '60vh', padding: '1.5em'}} className="mt-1">
        <Col span={18} offset={4}>
          <TradingViewWidget />
        </Col>
     </Row>
    </Space>
  )
}

export default Home;