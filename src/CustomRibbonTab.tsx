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
  const iconElement = icon ? <HomeIcon /> : null;

  return (
    <Tab
      {...rest}
      label={label}
      icon={iconElement}
      style={{ display: "flex", flexDirection: "row" }}
    />
  );
};

export default CustomRibbonTab;







