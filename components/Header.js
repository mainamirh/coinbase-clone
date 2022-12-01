import styled from "styled-components";
import { ConnectWallet } from "@thirdweb-dev/react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import Link from "next/link";
import TransferModal from "./modal/TransferModal";

Modal.setAppElement("#__next");

const Header = ({ sanityTokens }) => {
  const router = useRouter();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#0a0b0d",
      padding: 0,
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(10, 11, 13, 0.75)",
    },
  };

  return (
    <Wrapper>
      <Title>Assets</Title>
      <ConnectWallet />
      <Button style={{ backgroundColor: "#0052ff", marginLeft: "10px" }}>
        Buy / Sell
      </Button>
      <Link href={"/?transfer=1"}>
        <Button>Send /Receive</Button>
      </Link>
      <Modal
        isOpen={!!router.query.transfer}
        onRequestClose={() => router.push("/")}
        style={customStyles}
      >
        <TransferModal sanityTokens={sanityTokens} />
      </Modal>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #282b2f;
  display: flex;
  align-items: center;
`;
const Button = styled.div`
  border: 1px solid #282b2f;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 0.4rem;
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  flex: 1;
`;
