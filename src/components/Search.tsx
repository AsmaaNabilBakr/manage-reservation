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
      const filteredReservations = allReservations.filter((reservation) => {
        const fName = reservation.customer.firstName.toLowerCase();
        const surname = reservation.customer.lastName.toLowerCase();
        const fullName = `${fName} ${surname}`;
        return (
          fName.includes(searchQuery) ||
          surname.includes(searchQuery) ||
          fullName.includes(searchQuery)
        );
      });
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
