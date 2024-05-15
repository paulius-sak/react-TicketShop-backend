import React from "react";
import styles from "./Header.module.css";

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
      </nav>
    </div>
  );
};

export default Header;
