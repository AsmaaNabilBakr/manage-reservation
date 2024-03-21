import { Button, Col, DatePicker, Flex, Row, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { DataType } from "../ReservationList";

interface Props {
  allReservations: DataType[];
  setReservationsToShow: (filteredReservations: DataType[]) => void;
}

const restaurantShifts = ["Breakfast", "Lunch", "Dinner"];
const restaurantAreas = ["Bar", "Main Room"];
const restaurantStatus = [
  "Confirmed",
  "Seated",
  "Checked Out",
  "Not Confirmed",
];
const { Option } = Select;

const convertDateFormat = (date: string) => {
  const dateParts = date.split(".");
  const formattedDateString = `${dateParts[1]}.${dateParts[0]}.${dateParts[2]}`;

  return formattedDateString;
};

function Filter({ allReservations, setReservationsToShow }: Props) {
  const [filteredDate, setFilteredDate] = useState("");
  const [filteredShift, setFilteredShift] = useState<string | null>(null);
  const [filteredArea, setFilteredArea] = useState<string | null>(null);
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);

  const handleDateChange = (value: string) => {
    const selectedDate = new Date(value).toDateString();
    setFilteredDate(selectedDate);
  };

  const resetFilters = () => {
    setFilteredDate("");
    setFilteredShift(null);
    setFilteredArea(null);
    setFilteredStatus(null);
    setReservationsToShow(allReservations);
  };

  const filterReservations = () => {
    const filteredReservations = allReservations?.filter((reservation) => {
      const formatBusinessDate = convertDateFormat(reservation.businessDate);
      const reservationDate = new Date(formatBusinessDate).toDateString();
      const reservationShift = reservation.shift.toLowerCase();
      const reservationArea = reservation.area.toLowerCase();

      const reservationStatus = reservation.status.toLowerCase().split(" ");
      const formatFilteredStatus =
        filteredStatus?.toLowerCase().split(" ") || [];
      return (
        reservationDate.includes(filteredDate || "") &&
        reservationShift.includes(filteredShift?.toLowerCase() || "") &&
        reservationArea.includes(filteredArea?.toLowerCase() || "") &&
        reservationStatus[0].includes(formatFilteredStatus[0] || "")
      );
    });

    setReservationsToShow(filteredReservations);
  };

  return (
    <Flex gap={12} className="filter-form" vertical>
      <Row gutter={10}>
        <Col xs={6} sm={16} md={12} lg={6}>
          <label>Date</label>
          <DatePicker
            placeholder="Date"
            className="input-field"
            value={filteredDate !== "" ? dayjs(filteredDate) : null}
            onChange={(_, dateString) => handleDateChange(dateString as string)}
          />
        </Col>

        <Col xs={6} sm={16} md={12} lg={6}>
          <label>Shift</label>
          <Select
            onChange={(value) => setFilteredShift(value)}
            className="input-field"
            placeholder="Shift"
            value={filteredShift}
          >
            {restaurantShifts.map((shift) => (
              <Option key={shift} value={shift}>
                {shift}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={6} sm={16} md={12} lg={6}>
          <label>Area</label>
          <Select
            onChange={(value) => setFilteredArea(value)}
            className="input-field"
            placeholder="Area"
            value={filteredArea}
          >
            {restaurantAreas.map((area) => (
              <Option key={area} value={area}>
                {area}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={6} sm={16} md={12} lg={6}>
          <label>Status</label>
          <Select
            onChange={(value) => setFilteredStatus(value)}
            className="input-field"
            value={filteredStatus}
            placeholder="Status"
          >
            {restaurantStatus.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Flex gap={10} className="action-btns">
        <Button type="primary" onClick={() => filterReservations()}>
          Filter
        </Button>
        <Button danger onClick={() => resetFilters()}>
          Reset
        </Button>
      </Flex>
    </Flex>
  );
}

export default Filter;
