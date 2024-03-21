import { Flex } from "antd";
import Logo from "../assets/logo.svg";
function Header() {
  return (
    <Flex align="center" className="header">
      <img src={Logo} alt="Yassir" />
    </Flex>
  );
}

export default Header;
