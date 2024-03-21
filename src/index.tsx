import React from "react";
import ReactDOM from "react-dom/client";
import ReservationList from "./ReservationList";
import Header from "./components/Header";
import "./styles.scss";
import { Col, Flex, Row } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Flex vertical className="app" gap="large">
    <Header />
    <ReservationList />
  </Flex>
);
