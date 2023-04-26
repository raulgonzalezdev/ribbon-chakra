import React from "react";
import { Tab } from "@chakra-ui/react";
import { HomeIcon } from "@chakra-ui/icons";

interface CustomChakraRibbonTabProps {
  label: string;
  icon?: boolean;
  rest?: any;
}

const CustomRibbonTab: React.FC<CustomChakraRibbonTabProps> = ({
  label,
  icon,
  ...rest
}) => {
  return (
    <Tab {...rest} display="flex" flexDirection="row">
      {icon && <HomeIcon />}
      {label}
    </Tab>
  );
};

export default CustomRibbonTab;
