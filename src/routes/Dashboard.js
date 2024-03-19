import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Space, Table,Input, Button } from "antd";
import AlertMap from "../components/feedback/AlertMap";
import { EyeOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { getCurrentHoldings } from "../clients/UserClient";
import { useAuth } from "../util/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { formatNumber } from "../util/StocksTable";
import {addBalanceRequest} from "../clients/AuthClient"

const cols = [
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
    render: (text) => (
      <Link to={"/trade?symbol=" + text.symbol}>
        <a>{text.symbol.toUpperCase()}</a>
      </Link>
    ),
  },
  {
    title: "Name",
    dataIndex: "symbol",
    key: "name",
    render: (text) => <p>{text.longName}</p>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (text) => <p>{text} shares</p>
  },
  {
    title: "Value",
    key: "value",
    render: (data) => {
      return <p>${formatNumber(data.amount * data.symbol.summary.previousClose)}</p>;
    },
  },
];

const Dashboard = () => {
  const cashToAddref = useRef('');
  const navigate = useNavigate();
  const [messageState, setMessageState] = useState({type: "error", messages: []});

  const sendCash = async (e) => {
  
    e.preventDefault();
    const cashToAdd = cashToAddref.current?.input?.value;
  
    if (!cashToAdd) {
      setMessageState({type: "error", messages: ['Please enter a valid email/password']});
    }
  
    const response = await addBalanceRequest(cashToAdd);
    if (response.status !== 200) {
      console.log('in adding balance: ', response)
      setMessageState({type: "error", messages:response.errors});
    }
    else {
      setTimeout(() => navigate('/dashboard'), 1000)
    }
  
  }
  const { token } = useAuth();
  const [cashBalance, setCashBalance] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [messageStatus, setMessageStatus] = useState({
    type: "",
    messages: [],
  });
  const getUserHoldings = async () => {
    let response = await getCurrentHoldings(token);
    if (response.status === 200) {
      let user = response?.body?.user;
      setCashBalance(user?.balance || 0);
      console.log(user.stocks);
      setStocks(user?.stocks);
      console.log(response);
    } else {
      setMessageStatus({ type: "error", messages: response.errors });
    }
  };

  useEffect(() => {
    getUserHoldings();
  }, []);
  return (
    <>
      <Row>
        <h3 className="page-heading">Dashboard</h3>
      </Row>
      <Row>
        <AlertMap type={messageStatus.type} messages={messageStatus.messages} />
      </Row>
      <Row>
        <Col offset={2}>Current Holds</Col>
      </Row>
      <Row>
        <Col offset={2}>
          <Space direction="horizontal">
            <p>Total Cash: </p>
            <p>${cashBalance.toFixed(2)}</p>
          </Space>
            <Row style={{marginTop: '1em'}}>
            <Input ref={cashToAddref} type="email" size="large" placeholder="cash to add" prefix={<EyeOutlined />} />
            <Button className="auth-button mt-1" onClick={(e) => sendCash(e)} type="primary">Add cash</Button>

          </Row>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col offset={2} span={20}>
          {stocks.length > 0 && (
            <Table
              style={{ width: "100%" }}
              columns={cols}
              dataSource={stocks}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
