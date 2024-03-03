import styles from "./Header.module.css";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.text}>Yumemi Coding Test</h1>
    </header>
  );
};

export default Header;
