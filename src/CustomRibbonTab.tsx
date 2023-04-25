import React from "react";
import { Tab } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

interface CustomMaterialRibbonTabProps {
  label: string;
  icon?: boolean;
  rest?: any;
}

const CustomRibbonTab: React.FC<CustomMaterialRibbonTabProps> = ({
  label,
  icon,
  ...rest
}) => {
  return (
    <Tab
      {...rest}
      label={label}
      // @ts-ignore
      icon={icon && <HomeIcon />}
      style={{ display: "flex", flexDirection: "row" }}
    />
  );
};

export default CustomRibbonTab;
