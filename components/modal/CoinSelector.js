import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useSDK } from "@thirdweb-dev/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/sanity";
import { FaCheck } from "react-icons/fa";

const CoinSelector = ({
  setAction,
  selectedToken,
  setSelectedToken,
  sanityTokens,
}) => {
  const sdk = useSDK();
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const getCoinsInfo = async () => {
      if (!sanityTokens.length) return;
      const data = await Promise.all(
        sanityTokens.map(async (token) => {
          const tokenContract = await sdk.getContract(token.contractAddress);

          const tokenBalance = await tokenContract.erc20.balance();
          const balance = tokenBalance.displayValue;

          const url = imageUrlBuilder(client).image(token.logo).url();
          return { balance, url };
        })
      );
      setCoinData(data);
    };

    getCoinsInfo();
  }, [sanityTokens]);

  return (
    <Wrapper>
      <Title>Select Asset</Title>
      <CoinList>
        {sanityTokens.map((token, index) => (
          <CoinItem
            key={index}
            onClick={() => {
              setSelectedToken(token);
              setAction("send");
            }}
          >
            {coinData && (
              <Image
                src={coinData[index].url}
                alt="image"
                height={30}
                width={30}
              />
            )}

            <CoinDetail>
              <Name>{token.name}</Name>
              <Symbol>{token.symbol}</Symbol>
            </CoinDetail>

            <Balance>
              {coinData ? coinData[index].balance : "Fetching ..."}{" "}
              {token.symbol}
            </Balance>
            {selectedToken == token ? (
              <FaCheck style={{ marginLeft: "10px", color: "#3773f5" }} />
            ) : undefined}
          </CoinItem>
        ))}
      </CoinList>
    </Wrapper>
  );
};

export default CoinSelector;

const Wrapper = styled.div``;
const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;
const CoinList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CoinItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: #141519;
  }
`;

const CoinDetail = styled.div`
  flex: 1;
  margin-left: 15px;
`;

const Name = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
`;

const Symbol = styled.div`
  color: #888f9b;
  font-size: 0.8rem;
`;

const Balance = styled.div``;
