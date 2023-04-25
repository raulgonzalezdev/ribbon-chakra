import React from "react";
import styles from "./styles/CustomRibbonButton.module.css";

interface CustomRibbonButtonProps {
  children: React.ReactNode;
  caption: string;
}

const CustomRibbonButton: React.FC<CustomRibbonButtonProps> = ({
  children,
  caption,
}) => {
  return (
    <div className={styles.customRibbonButton}>
      {children}
      <div>{caption}</div>
    </div>
  );
};

export default CustomRibbonButton;


