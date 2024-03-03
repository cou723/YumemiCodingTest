import React from "react";

import styles from "./Tabs.module.css";
type Props = {
  value: number;
  onChange: (value: number) => void;
  tabs: { label: string; value: number }[];
};

const Tabs: React.FC<Props> = ({ value, onChange, tabs }) => {
  const [selected, setSelected] = React.useState(value);
  return (
    <div className={styles.box}>
      {tabs.map((tab, i) => {
        return (
          <button
            key={i}
            onClick={() => {
              setSelected(tab.value);
              onChange(tab.value);
            }}
            className={`${styles.tab} ${selected === tab.value ? styles.tab_selected : ""}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
