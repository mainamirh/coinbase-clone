import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import CoinbaseLogo from "../assets/cb-logo.png";
import { navItems } from "../public/static/navItems";

const Sidebar = () => {
  const [activeNavItem, setActiveNavItem] = useState(navItems[0].title);

  return (
    <Wrapper>
      <LogoContainer>
        <Logo>
          <Image
            src={CoinbaseLogo}
            alt="Coinbase Logo"
            width={137}
            height={30}
          />
        </Logo>
      </LogoContainer>
      <NavItemsContainer>
        {navItems.map((item, index) => (
          <NavItem key={index} onClick={() => setActiveNavItem(item.title)}>
            <NavIcon
              style={{ color: item.title == activeNavItem && "#0052ff" }}
            >
              {item.icon}
            </NavIcon>
            <NavTitle>{item.title}</NavTitle>
          </NavItem>
        ))}
      </NavItemsContainer>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  border-right: 1px solid #282b2f;
  width: calc(22rem - 16px - 16px);
  height: max-content;
  padding: 0 1rem;
`;
const LogoContainer = styled.div`
  margin: 1.5rem 0;
`;

const Logo = styled.div`
  width: 44%;
  object-fit: contain;
  margin-left: 1.5rem;
`;

const NavItemsContainer = styled.div`
  margin-top: 3rem;
  &:hover {
    cursor: pointer;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  height: 4rem;
  &:hover {
    background-color: #141519;
  }
`;

const NavIcon = styled.div`
  background-color: #141519;
  padding: 0.7rem;
  border-radius: 50%;
  margin: 0 1rem;
  display: grid;
  place-items: center;
`;

const NavTitle = styled.div``;
