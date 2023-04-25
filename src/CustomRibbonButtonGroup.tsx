import React from "react";
import styles from "./styles/CustomRibbonButtonGroup.module.css";

interface CustomRibbonButtonGroupProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  caption?: string;
}

const CustomRibbonButtonGroup: React.FC<CustomRibbonButtonGroupProps> = ({
  children,
  style,
  caption,
}) => {
  return (
    <div className={styles.customRibbonButtonGroupWrapper}>
      <div className={styles.customRibbonButtonGroup} style={style}>
        {children}
      </div>
      {caption && (
        <div className={styles.customRibbonButtonGroupCaption}>{caption}</div>
      )}
    </div>
  );
};

export default CustomRibbonButtonGroup;




