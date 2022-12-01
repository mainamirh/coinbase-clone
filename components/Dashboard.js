import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import Portfolio from "./Portfolio";
import Sidebar from "./Sidebar";
import Promos from "./Promos";

const Dashboard = () => {
  const [sanityTokens, setSanityTokens] = useState([]);

  useEffect(() => {
    const getCoins = async () => {
      try {
        const coins = await fetch(
          "https://073a2xqy.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20'coins'%5D%20%7B%0A%20%20name%2C%0A%20%20symbol%2C%0A%20%20contractAddress%2C%0A%20%20usdPrice%2C%0A%20%20logo%0A%7D"
        );
        const tokens = (await coins.json()).result;
        setSanityTokens(tokens);
      } catch (error) {
        console.log(error);
      }
    };

    getCoins();
  }, []);

  return (
    <Wrapper>
      <Sidebar />
      <Main>
        <Header sanityTokens={sanityTokens} />
        <div style={{ display: "flex" }}>
          <Portfolio sanityTokens={sanityTokens} />
          <Promos />
        </div>
      </Main>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 1460px;
  margin-left: auto;
  margin-right: auto;
`;

const Main = styled.div`
  flex: 1;
`;
