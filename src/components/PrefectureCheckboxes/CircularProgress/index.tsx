import React from "react";

import styles from "./CircularProgress.module.css";
const circularProgress = () => {
  // https://css-loaders.com/
  return <progress className={styles.progress} />;
};

export default circularProgress;
