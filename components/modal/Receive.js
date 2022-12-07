import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/sanity";
import { BiCopy } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

// import { useAddress } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const Receive = ({ setAction, selectedToken }) => {
  // const address = useAddress();
  const [address, setAddress] = useState();
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.NEXT_PUBLIC_PRIVATE_KEY,
    "goerli"
  );

  const [imageUrl, setImageUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    sdk.wallet.getAddress().then((value) => {
      setAddress(value);
    });

    const url = imageUrlBuilder(client).image(selectedToken.logo).url();
    setImageUrl(url);
  }, [selectedToken]);

  return (
    <Wrapper>
      <QRCode>
        <Image
          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${address}`}
          alt="QRCode"
          height={250}
          width={250}
        />
      </QRCode>
      <Row onClick={() => setAction("select")}>
        {imageUrl && (
          <Image src={imageUrl} alt="image" width={30} height={30} />
        )}
        <CoinName>{selectedToken.name}</CoinName>
      </Row>

      <Row style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <Title>{selectedToken.symbol} Address</Title>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Address>{address}</Address>
          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(address);
              setCopied(true);
            }}
          >
            {copied ? <FaCheck style={{ color: "#27ad75" }} /> : <BiCopy />}
          </CopyButton>
        </div>
      </Row>
    </Wrapper>
  );
};

export default Receive;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #282b2f;
  height: 100%;
`;

const QRCode = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-top: 1px solid #282b2f;
  padding: 0.6rem 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const CoinName = styled.div`
  font-size: 1.2rem;
  margin-left: 0.5rem;
`;

const Title = styled.div`
  color: white;
  margin-bottom: 0.5rem;
`;

const Address = styled.div`
  font-size: 0.8rem;
  color: #8a919e;
`;

const CopyButton = styled.div`
  cursor: pointer;
`;
