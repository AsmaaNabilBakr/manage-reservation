import { Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { DataType } from "../ReservationList";

interface Props {
  allReservations: DataType[];
  setReservationsToShow: (filteredReservations: DataType[]) => void;
}
function Search({ allReservations, setReservationsToShow }: Props) {
  const { Search } = Input;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!searchQuery) {
      setReservationsToShow(allReservations);
      return;
    }
    const handler = setTimeout(() => {
      const filteredReservations = allReservations.filter(
        (reservation) =>
          reservation.customer.firstName.toLowerCase().includes(searchQuery) ||
          reservation.customer.lastName.toLowerCase().includes(searchQuery)
      );
      setReservationsToShow(filteredReservations);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  return (
    <Row className="input-field search-box">
      <Col span={8}>
        <Search
          placeholder="Search reservations..."
          size="large"
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
      </Col>
    </Row>
  );
}

export default Search;
