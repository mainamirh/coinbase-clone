import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Transfer from "./Transfer";
import CoinSelector from "./CoinSelector";
import Receive from "./Receive";
import { TailSpin } from "react-loader-spinner";

// import { useNetwork } from "@thirdweb-dev/react";

const TransferModal = ({ sanityTokens }) => {
  const [action, setAction] = useState("send");
  const [selectedToken, setSelectedToken] = useState(sanityTokens[0]);
  const [txnHash, setTxnHash] = useState();
  // const network = useNetwork();

  const renderLogic = () => {
    switch (action) {
      case "send":
        return (
          <Transfer
            selectedToken={selectedToken}
            setAction={setAction}
            setTxnHash={setTxnHash}
          />
        );

      case "receive":
        return <Receive setAction={setAction} selectedToken={selectedToken} />;

      case "select":
        return (
          <CoinSelector
            setAction={setAction}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            sanityTokens={sanityTokens}
          />
        );

      case "transferring":
        return (
          <Transferring>
            <h2 style={{ marginBottom: "80px" }}>Transfer in progress ...</h2>
            <TailSpin
              height="80"
              width="80"
              color="#3773f5"
              ariaLabel="tail-spin-loading"
              radius="0"
              // wrapperStyle={{}}
              // wrapperClass=""
              visible={true}
            />
          </Transferring>
        );

      case "transferred":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "#27ad75",
                fontWeight: "600",
                fontSize: "2rem",
              }}
            >
              Transfer complete
            </span>
            {txnHash && (
              <p style={{ fontSize: "1.1rem" }}>
                See transaction on
                <Link
                  // href={`https://${network[0].data.chain.name.toLowerCase()}.etherscan.io/tx/${txnHash}`}
                  href={`https://goerli.etherscan.io/tx/${txnHash}`}
                  target="_blank"
                  style={{ color: "#3773f5" }}
                >
                  {" "}
                  Etherscan
                </Link>
              </p>
            )}
          </div>
        );

      default:
        return;
    }
  };

  const selectedStyle = {
    color: "#3773f5",
  };

  const unselectedStyle = {
    border: "1px solid #282b2f",
  };

  return (
    <Wrapper>
      <Selector>
        <Option
          style={action === "send" ? selectedStyle : unselectedStyle}
          onClick={() => setAction("send")}
        >
          <p>Send</p>
        </Option>
        <Option
          style={action === "receive" ? selectedStyle : unselectedStyle}
          onClick={() => setAction("receive")}
        >
          <p>Receive</p>
        </Option>
      </Selector>
      <ModalMain>{renderLogic()}</ModalMain>
    </Wrapper>
  );
};

export default TransferModal;

const Wrapper = styled.div`
  height: 35rem;
  width: 27rem;
  color: white;
  border: 1px solid #282b2f;
  display: flex;
  flex-direction: column;
`;
const Selector = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 5rem;
`;

const Option = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #111214;
  }
`;

const ModalMain = styled.div`
  padding: 1rem;
  flex: 1;
`;

const Transferring = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
