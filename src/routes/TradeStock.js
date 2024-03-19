import { Button, Card, Col, Divider, Dropdown, Input, Row, Space } from "antd";
import TradingViewWidget from "../components/stocks/TradingView";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createOrderRequest } from "../clients/MarketClient";
import { useAuth } from "../util/AuthContext";
import AlertMap from "../components/feedback/AlertMap";

const items = [
  { key: "market", label: "market" },
  { key: "limit", label: "limit" },
];

const TradeCard = ({ price, size, title, symbol }) => {
  const {token} = useAuth();
  let info = title === 'Buy' ? 'Ask' : 'Bid'
  const [orderType, _setOrderType] = useState("Order Type");
  const priceRef = useRef();
  const amountRef = useRef();
  const [messageState, setMessageState] = useState({type: "", messages: []})
  const setOrderType = ({ key }) => {
    _setOrderType(key);
  };

  const createOrder = async (e) => {
    e.preventDefault();
    const realOrderType = title.toLowerCase();
    if (!['market', 'limit'].includes(orderType)) {
      setMessageState({type: "warning", messages: ["Please select order type"]})
      return;
    }
    const price = parseFloat(priceRef?.current?.input?.value);
    const amount = parseInt(amountRef?.current?.input?.value);
    let response = await createOrderRequest(token, orderType, realOrderType, symbol, price, amount)
    if (response.status === 200) {
      setMessageState({type:"success", messages: ["Successfully created your order"]});
    }
    else {  
      setMessageState({type: "error", messages: response.errors});
    }
  }

  return (
    <Card title={title}>
      <AlertMap type={messageState.type} messages={messageState.messages} />
      <Space direction="horizontal">
        <span>
          {info} Price:{" "}
          <span className="light-blue">
            ${(price || 0).toFixed(2)}
          </span>
        </span>
        <span>
          {info} Size:{" "}
          <span className="light-blue">{size || 0}</span>
        </span>
      </Space>

      <Divider />
      <Row>
        <span>Price: </span>
      </Row>
      <Row className="mt-1">
        <Input
        ref={priceRef}
          style={{ width: "100%" }}
          size="medium"
          type="number"
          placeholder="price"
          step={0.001}
        />
      </Row>

      <Divider />
      <Row>
        <span>Amount: </span>
      </Row>
      <Row className="mt-1">
        <Input
        ref={amountRef}
          style={{ width: "100%" }}
          size="medium"
          type="number"
          placeholder="amount"
          step={1}
        />
      </Row>
      <Divider />
      <Row>
        <span>Order Type: </span>
      </Row>
      <Row className="mt-1" style={{ width: "100%" }}>
        <Dropdown menu={{ items, onClick: setOrderType }} arrow={true}>
          <Button size="medium" block onClick={(e) => e.preventDefault()}>
            {orderType}
          </Button>
        </Dropdown>
      </Row>
      <Divider />
      <Row className="mt-1">
        <Button block type="primary" onClick={(e) => createOrder(e)}>
          {title}
        </Button>
      </Row>
    </Card>
  );
};
const TradeStock = ({ details }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [symbol, setSymbol] = useState(searchParams.get("symbol"));
  const [stock, setStock] = useState(details);

  
  useEffect(() => {
    console.log("seeting details: ", details);
    setStock(details);
  }, [details]);

  useEffect(() => {
    console.log("GOT DETAILS: ", details);
  });
  useEffect(() => {
    setSymbol(searchParams.get("symbol"));
  }, [searchParams]);
  return (
    <>
      <Row style={{ height: "60vh", marginBottom: "6em" }}>
        <Col span={20} offset={2}>
          <TradingViewWidget symbol={symbol} />
        </Col>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <Col span={9}>
          <TradeCard title={"Buy"} price={stock?.summary?.ask} size={stock?.summary?.askSize} symbol={stock?.symbol}/>
        </Col>
        <Col style={{ marginLeft: "1.5em" }} span={9}>
          <TradeCard title={"Sell"} price={stock?.summary?.bid} size={stock?.summary?.bidSize} symbol={stock?.symbol}/>
        </Col>
      </Row>
    </>
  );
};

export default TradeStock;
