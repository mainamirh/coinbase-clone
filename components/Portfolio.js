import { useEffect, useState } from "react";
import styled from "styled-components";
import { coins } from "../public/static/coins";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import BalanceChart from "./BalanceChart";

import { useSDK } from "@thirdweb-dev/react";

const Portfolio = ({ sanityTokens }) => {
  const sdk = useSDK();
  const [walletBalance, setWalletBalance] = useState("0");

  useEffect(() => {
    const calculateTotalBalance = async () => {
      if (!sanityTokens.length) return;
      const tokenBalances = await Promise.all(
        sanityTokens.map(async (token) => {
          const tokenContract = await sdk.getContract(token.contractAddress);
          const tokenBalance = await tokenContract.erc20.balance();

          return Number(tokenBalance.displayValue) * Number(token.usdPrice);
        })
      );
      const totalBalance = tokenBalances.reduce((acc, curr) => acc + curr, 0);

      setWalletBalance(totalBalance);
    };

    calculateTotalBalance();
  }, [sanityTokens]);

  return (
    <Wrapper>
      <Chart>
        <div>
          <Balance>
            <BalanceTitle>Portfolio balance</BalanceTitle>
            <BalanceValue>
              {"$"}
              {walletBalance.toLocaleString()}
            </BalanceValue>
          </Balance>
        </div>
        <BalanceChart />
      </Chart>
      <Table>
        <thead>
          <tr style={{ border: "1px solid #282b2f" }}>
            <TableHeader style={{ fontSize: " 1.5rem", fontWeight: "600" }}>
              Your Assets
            </TableHeader>
          </tr>
        </thead>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Balance</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Allocation</TableHeader>
            <TableHeader>
              <BsThreeDotsVertical />
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, i) => (
            <tr key={i}>
              <TableData>
                <CoinInfo>
                  <Image
                    src={coin.logo}
                    alt={coin.name}
                    width={30}
                    height={30}
                  />
                  <div style={{ marginLeft: "15px" }}>
                    <Primary>{coin.name}</Primary>
                    <Secondary>{coin.sign}</Secondary>
                  </div>
                </CoinInfo>
              </TableData>
              <TableData>
                <div>
                  <Primary>${coin.balanceUsd}</Primary>
                  <Secondary>{coin.balanceCoin}</Secondary>
                </div>
              </TableData>
              <TableData>
                <Primary>${coin.priceUsd}</Primary>
                <div style={{ color: coin.change < 0 ? "#f0616d" : "#26ad75" }}>
                  {coin.change > 0 && "+"}
                  {coin.change}%
                </div>
              </TableData>
              <TableData>{coin.allocation}%</TableData>
              <TableData>
                <BsThreeDotsVertical />
              </TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Portfolio;

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
`;

const Chart = styled.div`
  border: 1px solid #282b2f;
  padding: 1rem;
`;

const Balance = styled.div``;

const BalanceTitle = styled.div`
  color: #8a919e;
  font-size: 0.9rem;
`;

const BalanceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #282b2f;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  padding: 10px 25px;
  text-align: left;
  border-bottom: 1px solid #282b2f;
`;

const TableData = styled.td`
  padding: 10px 25px;
  text-align: left;
  border-bottom: 1px solid #282b2f;
`;

const Primary = styled.div`
  margin-bottom: 0.1rem;
`;

const Secondary = styled.div`
  color: #8a919e;
  font-size: 0.8rem;
`;

const CoinInfo = styled.div`
  display: flex;
  align-items: center;
`;
