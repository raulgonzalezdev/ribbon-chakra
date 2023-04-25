import React, { useCallback } from "react";
import {
  Input,
  TextareaAutosize,
  Select,
  MenuItem,
  Switch,
  Tabs,
  Tab,
  MobileStepper,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { TabContext, TabPanel as MuiTabPanel } from "@mui/lab";
import CustomRibbonButton from "./CustomRibbonButton";
import CustomRibbonButtonGroup from "./CustomRibbonButtonGroup";
import RibbonSplitButton from './RibbonSplitButton';
import RibbonButton, { RibbonButtonProps } from './RibbonButton';
import RibbonIconButton from './RibbonIconButton';
import BasicSpeedDial from "./speeddial/BasicSpeedDial";
import { styled, useTheme } from "@mui/system";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Link from 'next/link';

interface RibbonIconProps {
  iconName?: string;
}

interface ButtonProps {
  key: number;
  caption: string;
  iconName?: string; // Agregue esta línea
  icon: JSX.Element | null;
  onClick: () => void;
}

interface RibbonProps {
  ribbonTabs: any[];
  onButtonClick?: (button: typeof RibbonButton) => void;
}

const componentMap = {
  Input: Input,
  TextArea: TextareaAutosize,
  Select: Select,
  Switch: Switch,
};

const StyledMobileStepper = styled(MobileStepper)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  padding: 0,
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: "auto",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minHeight: "auto",
  minWidth: "auto",
  fontSize: "0.6rem",
  fontWeight: "bold",
  padding: theme.spacing(1, 3),
  margin: 0,
  borderRadius: "12px 12px 0 0",
  borderTop: `1px solid ${theme.palette.divider}`,
  borderLeft: `1px solid ${theme.palette.divider}`,
  borderRight: `1px solid ${theme.palette.divider}`,
  "&:first-of-type": {
    borderLeft: 0,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    borderBottom: "1px solid transparent",
  },
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

const StyledTabPanel = styled(MuiTabPanel)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: 0,
  position: 'relative',
  width: '100%'
}));

const convertIconName = (iconName: string) => {
  return iconName;
};

const Ribbon: React.FC<RibbonProps> = ({ ribbonTabs, onButtonClick }) => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const RibbonIcon = ({ iconName }: RibbonIconProps) => {
    if (!iconName) {
      return { iconComponent: null, displayIcon: false };
    }

    const IconComponent = require("@mui/icons-material")[convertIconName(iconName)];

    if (!IconComponent) {
      return { iconComponent: null, displayIcon: false };
    }

    return { iconComponent: <IconComponent />, displayIcon: true };
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  const renderButtons = (buttons: ButtonProps[]) => {
    return buttons.map((button, index) => {
      const { iconName } = button;
      const { iconComponent, displayIcon } = RibbonIcon({ iconName });

      return (
        <RibbonButton
          key={index}
          caption={button.caption}
          icon={iconComponent}
          onClick={button.onClick}
          displayIcon={displayIcon}
        />
      );
    });
  };

  return (
    <TabContext value={String(selectedTabIndex)}>
      <StyledTabs
        value={selectedTabIndex}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Ribbon Tabs"
      >
        {ribbonTabs.map((tab, index) => (
          <StyledTab key={index} label={tab.title} />
        ))}
      </StyledTabs>
      {ribbonTabs.map((tab, index) => (
        <StyledTabPanel key={index} value={String(index)}>
          {renderButtons(tab.buttons)}
        </StyledTabPanel>
      ))}
    </TabContext>
  );
};

export default Ribbon;

