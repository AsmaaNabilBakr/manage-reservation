import type { TableProps } from "antd";
import { Flex, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Search from "./components/Search";

interface CustomerName {
  firstName: string;
  lastName: string;
}
export interface DataType {
  id: number;
  businessDate: string;
  status: string;
  shift: string;
  start: string;
  end: string;
  quantity: number;
  customer: CustomerName;
  area: string;
  guestNotes: string;
}
export const getFormattedDate = (date: string): string => {
  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  let hours = dateObject.getHours();
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");

  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${day}-${month}-${year} at ${hours}:${minutes} ${ampm}`;
};

const sortDate = (a: string, b: string) => {
  const dateA = new Date(a);
  const dateB = new Date(b);
  return dateA.getTime() - dateB.getTime();
};
const sortStrings = (a: string, b: string) => a.localeCompare(b);

const capitalizeStr = (str: string) => {
  const arrOfSplittedStr = str.split(" ");
  const capitalizedArr = arrOfSplittedStr.map(
    (word) => `${word[0]}${word.slice(1).toLowerCase()}`
  );
  return capitalizedArr.join(" ");
};

const reservationStatus = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return <Tag color="#2ECC71">{capitalizeStr(status)}</Tag>;
    case "SEATED":
      return <Tag color="#9B59B6">{capitalizeStr(status)}</Tag>;
    case "CHECKED OUT":
      return <Tag color="grey">{capitalizeStr(status)}</Tag>;
    case "NOT CONFIRMED":
      return <Tag color="#F39C12">{capitalizeStr(status)}</Tag>;
  }
};

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "customer",
    key: "customer",
    width: 250,

    sorter: (a, b) => {
      const fullNameA = `${a.customer.firstName} ${a.customer.lastName}`;
      const fullNameB = `${b.customer.firstName} ${b.customer.lastName}`;
      return fullNameA.localeCompare(fullNameB);
    },
    defaultSortOrder: "ascend",
    render: (customer) => (
      <b>
        {customer.firstName} {customer.lastName}
      </b>
    ),
  },
  {
    title: "Start",
    dataIndex: "start",
    key: "startDate",
    width: 300,

    sorter: (a, b) => sortDate(a.start, b.start),
    render: (start) => getFormattedDate(start),
  },
  {
    title: "End",
    dataIndex: "end",
    width: 300,

    key: "endDate",
    sorter: (a, b) => sortDate(a.end, b.end),
    render: (end) => getFormattedDate(end),
  },
  {
    title: "Shift",
    key: "shift",
    dataIndex: "shift",
    width: 100,

    render: (shift) => capitalizeStr(shift),
    sorter: (a, b) => sortStrings(a.shift, b.shift),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
    sortDirections: ["ascend", "descend", "ascend"],
  },
  {
    title: "Area",
    dataIndex: "area",
    width: 200,

    key: "area",
    render: (area) => capitalizeStr(area),
    sorter: (a, b) => sortStrings(a.area, b.area),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 200,

    render: (status) => reservationStatus(status),
    sorter: (a, b) => sortStrings(a.status, b.status),
  },
  {
    title: "Notes",
    dataIndex: "guestNotes",
    width: 350,
    key: "guestNotes",
  },
];

const ReservationList: React.FC = () => {
  const [allReservations, setAllReservations] = useState<DataType[]>([]);
  const [reservationsToShow, setReservationsToShow] = useState<DataType[]>();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3001/reservations");
      const response = await res.json();
      setAllReservations(response.reservations);
      setReservationsToShow(response.reservations);
    };
    getData();
  }, []);

  return (
    <Flex gap="large" align="start" className="page-content" vertical>
      <Filter
        allReservations={allReservations}
        setReservationsToShow={setReservationsToShow}
      />
      <Search
        allReservations={allReservations}
        setReservationsToShow={setReservationsToShow}
      />
      <Table
        columns={columns}
        dataSource={reservationsToShow}
        sortDirections={["ascend", "descend", "ascend"]}
        showSorterTooltip={false}
        pagination={{
          pageSizeOptions: [10, 15, 25, 100],
          totalBoundaryShowSizeChanger: 1,
        }}
      />
    </Flex>
  );
};

export default ReservationList;
