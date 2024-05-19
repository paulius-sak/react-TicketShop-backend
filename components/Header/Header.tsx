import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import cartSvg from "../../assets/cart.svg";
import accountSvg from "../../assets/account.svg";
import burgerSvg from "../../assets/burger-menu.svg";

type LinkType = {
  id: number;
  title: string;
  href: string;
};

type LogoType = {
  title: string;
  href: string;
};

type HeaderProps = {
  logo: LogoType;
  links: LinkType[];
};

const Header = ({ logo, links }: HeaderProps) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isMobileMenuOpen]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <a href={logo.href}>{logo.title}</a>
      </div>
      <nav>
        <ul className={styles.links}>
          {links.map((link) => {
            return (
              <a href={link.href} key={link.id}>
                {link.title}
              </a>
            );
          })}
        </ul>

        <button onClick={mobileMenu} className={styles.burgerMenu}>
          <img src={burgerSvg.src} alt="burgerMenu" />
        </button>

        <div
          className={`${styles.linksMobileWrapper} ${isMobileMenuOpen && styles.linksMobileWrapperOpen}`}
        >
          <ul className={styles.linksMobile}>
            {links.map((link) => {
              return (
                <a href={link.href} key={link.id}>
                  {link.title}
                </a>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
