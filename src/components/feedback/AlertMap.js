import React from "react";
import { Alert, Space } from "antd";

const AlertMap = ({type, messages}) => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {
        messages.length > 0 &&
        messages.map((msg, index) => {
          console.log('HERE: ', msg);
          return <Alert type={type} message={msg} key={index} />;
        })}
    </Space>
  );
};

export default AlertMap;
