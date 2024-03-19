import { StarOutlined } from "@ant-design/icons";
import { Alert, Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../util/AuthContext";
import { addTickerToList, getWatchListRequest } from "../clients/UserClient";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
];
const WatchListModal = ({ symbol, isModalOpen, toggleModal }) => {
  const [watchList, setWatchLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const { token } = useAuth();
  const [succ, setSucc] = useState(false);

  const getWatchLists = async () => {
    const response = await getWatchListRequest(token);
    if (response.status === 200) {
      setWatchLists(response.body.watchLists);
      // setSelectedList(response.body.watchLists.filter(w => w.name));
    }
  };

  const addToList = async ({ name }) => {
    addTickerToList(token, name, symbol);
    setSucc(true);
    setTimeout(() => toggleModal(), 1000);
  };

  useEffect(() => {
    getWatchLists();
  }, []);

  return (
    <Modal
      open={isModalOpen}
      onOk={toggleModal}
      onCancel={toggleModal}
      title={`Select a watchlist for $${symbol}: `}
    >
      {succ && (
        <Alert type="success" message="successfully added to watchlist" />
      )}
      {watchList.length === 0 ? (
        <span>
          Go create some watch lists: <Link to={"/watchlist"}>here</Link>
        </span>
      ) : (
        <Table
          columns={columns}
          dataSource={watchList}
          onRow={(record, index) => {
            return {
              onClick: (event) => {
                event.preventDefault();
                addToList({ name: record.name });
              }, // click row
            };
          }}
        />
      )}
    </Modal>
  );
};

const WatchListButton = ({ symbol }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <Button shape="circle" icon={<StarOutlined />} onClick={toggleModal} />
      <WatchListModal
        symbol={symbol}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </>
  );
};

export default WatchListButton;
