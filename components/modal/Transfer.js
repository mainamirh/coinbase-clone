import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaWallet } from "react-icons/fa";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/sanity";

// import { useSDK } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import { ethers } from "ethers";

const Transfer = ({ selectedToken, setAction, setTxnHash }) => {
  // const sdk = useSDK();
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.NEXT_PUBLIC_PRIVATE_KEY,
    "goerli"
  );
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [balance, setBalance] = useState("Fetching ...");
  const [error, setError] = useState("");

  useEffect(() => {
    const getInfo = async () => {
      try {
        const tokenContract = await sdk.getContract(
          selectedToken.contractAddress
        );
        const tokenBalance = await tokenContract.erc20.balance();
        setBalance(tokenBalance.displayValue);

        const url = imageUrlBuilder(client).image(selectedToken.logo).url();
        setImageUrl(url);
      } catch (error) {
        console.log(error);
      }
    };

    getInfo();
  }, [selectedToken]);

  const sendCrypto = async (recipient, amount) => {
    if (selectedToken && ethers.utils.isAddress(recipient) && amount) {
      setError("");
      setAction("transferring");
      try {
        const tokenContract = await sdk.getContract(
          selectedToken.contractAddress
        );
        const tx = await tokenContract.erc20.transfer(recipient, amount);
        setTxnHash(tx.receipt.transactionHash);
        setAction("transferred");
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Some inputs are invalid.");
    }
  };

  return (
    <Wrapper>
      <Amount>
        <Input
          type="number"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <span>{selectedToken.symbol}</span>
      </Amount>
      <Warning style={{ color: amount && "#0a0b0d" }}>
        Amount is a required field
      </Warning>
      <PayDetail>
        <PayTo>
          <FaWallet />
          <Recipient
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </PayTo>
        <PayWith onClick={() => setAction("select")}>
          <div style={{ marginRight: "10px" }}>Pay with</div>
          {imageUrl && (
            <Image src={imageUrl} alt="image" height={26} width={26} />
          )}
          <div style={{ flex: "1", paddingLeft: "10px" }}>
            {selectedToken.name}
          </div>
        </PayWith>
      </PayDetail>
      <Error>{error}</Error>
      <Button onClick={() => sendCrypto(recipient, amount)}>Continue</Button>
      <Balance>
        <div style={{ marginRight: "10px" }}>Your Balance: </div>
        <div style={{ marginRight: "8px" }}>
          {balance} {selectedToken.symbol}
        </div>
      </Balance>
    </Wrapper>
  );
};

export default Transfer;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Amount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    font-size: 3rem;
    color: #3773f5;
  }
`;

const Input = styled.input`
  border: none;
  background: none;
  outline: none;
  max-width: 41%;
  margin-right: 1rem;
  font-size: 4.5rem;
  color: #3773f5;

  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    display: none;
  }
`;

const Warning = styled.div`
  text-align: center;
  color: #8a919e;
  margin-top: 15px;
`;

const PayDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: #8a919e;
  margin-top: 25px;
`;

const PayTo = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  border: 1px solid #282b2f;
  border-radius: 10px 10px 0 0;
  border-bottom: none;
  font-size: 1.4rem;
  padding: 1rem 1.1rem;
`;
const Recipient = styled.input`
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  margin: 0 1rem;
  width: 100%;
`;

const PayWith = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #282b2f;
  border-radius: 0 0 10px 10px;
  font-size: 1.2rem;
  padding: 1rem 1.1rem;
  cursor: pointer;

  &:hover {
    background-color: #141519;
  }
`;

const Button = styled.div`
  background-color: #3773f5;
  text-align: center;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 0.4rem;
  margin-top: 30px;
  transition: opacity 0.15s;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

const Balance = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #8a919e;
  margin: 1.5rem 0 0 0.5rem;
`;

const Error = styled.p`
  color: red;
  padding: 0;
  padding-top: 5px;
  margin: 0;
  text-align: center;
`;
