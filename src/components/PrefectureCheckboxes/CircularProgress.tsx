import React from "react";

import styles from "./CircularProgress.module.css";
const circularProgress = () => {
  // https://css-loaders.com/
  return <div className={styles.circle} role="progressbar" />;
};

export default circularProgress;
