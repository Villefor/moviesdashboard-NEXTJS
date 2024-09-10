"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(scrollPosition > currentScrollPos || currentScrollPos < 10);
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <NavContainer visible={visible}>
      <Logo>Teste Frontend – Salaryfits</Logo>
      <MenuIcon onClick={toggleMenu}>{menuOpen ? "✖" : "☰"}</MenuIcon>
      <Menu open={menuOpen}>
        <MenuItem>
          <Link href="/filmes-populares">Filmes Populares</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/series-populares">Séries Populares</Link>
        </MenuItem>
      </Menu>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav<{ visible: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #141414;
  position: fixed;
  width: 100%;
  top: ${({ visible }) => (visible ? "0" : "-80px")};
  transition: top 0.3s ease-in-out;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #f4f4f4;
`;

const MenuIcon = styled.div`
  font-size: 1.5rem;
  color: #f4f4f4;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Menu = styled.ul<{ open: boolean }>`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: ${({ open }) => (open ? "4rem" : "-200px")};
    right: 1rem;
    background-color: #141414;
    padding: 1rem;
    border-radius: 5px;
    width: 150px;
    transition: top 0.3s ease-in-out;
    gap: 1rem;
  }
`;

const MenuItem = styled.li`
  list-style: none;

  a {
    text-decoration: none;
    color: #f4f4f4;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #e50914;
    }
  }
`;
