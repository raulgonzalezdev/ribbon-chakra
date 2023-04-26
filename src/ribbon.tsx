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
import { ribbonTabs } from "./ribbonTabs"
import { styled, useTheme } from "@mui/system";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Link from 'next/link';
import { ThemeProvider, createTheme } from '@mui/system';




interface RibbonIconProps {
  iconName?: string;
}

interface ButtonProps {
  key: number;
  caption: string;
  iconName?: string;
  icon?: JSX.Element | string | null; // Modificar esta línea
  onClick?: () => void;
}

interface RibbonProps {
 
  customTabs?: any[]; // Agrega esta línea
  onButtonClick?: (button: typeof RibbonButton) => void;
}

interface RibbonButtonGroup {
  caption?: string;
  flexDirection?: "row" | "column";
  buttons: typeof RibbonButton[];

}


const componentMap: { [key: string]: any } = {
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

const Ribbon: React.FC<RibbonProps> = ({  customTabs, onButtonClick }) => {
  const themex = createTheme({
    palette: {
       primary: {
         main: '#1b5a90'
       },
    
     },
   });
 
  const tabsToUse = customTabs ? customTabs : ribbonTabs ? ribbonTabs : [];
  

  
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  let theme = useTheme(themex);
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

  const renderReactComponent = useCallback((button: RibbonButton, index: number) => {
    const Component = button.component ? componentMap[button.component] : undefined;


    if (!Component) return null;

    const wrappedComponent =
      button.component === "Select" ? (
        <Component onChange={button.onChange}>
          {button.options.items.map((item: { value: string | number | readonly string[] | undefined; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, itemIndex: React.Key | null | undefined) => (
            <MenuItem key={itemIndex} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Component>
      ) : (
        <Component {...button.options} onChange={button.onChange} />
      );

    return (
      <div
        style={{ display: "inline-flex", flexDirection: "row" }}
        key={index}
      >
        <CustomRibbonButton caption={button.caption}>
          {wrappedComponent}
        </CustomRibbonButton>
      </div>
    );
  }, []);


  interface RibbonButton extends ButtonProps {
    component?: string;
    type?: string;
    icon?: string;
    onClick?: () => void;
    onChange?: () => void; // Agregue esta línea
    options?: any; // Agregue esta línea
    dropdownItems?: any[];
    defaultSelectedIndex?: number;
    route?: string;    // Agrega aquí las propiedades adicionales de un botón según sea necesario
  }

  // interface RibbonButton extends Omit<ButtonProps, 'onClick'> {
  //   onClick?: () => void;
  // }

  const renderButton = useCallback((button: RibbonButton, index: number) => {
    if (button.component && componentMap[button.component]) {

      return renderReactComponent(button, index);
    }
    const ribbonIconResult = RibbonIcon({ iconName: button.icon });
    const buttonProps = {
      buttonKey: index,
      caption: button.caption,
      icon: ribbonIconResult.iconComponent,
      onClick: () => {
        console.log(`Clic en el botón: ${button.icon}`);
        button.onClick && button.onClick();
        //@ts-ignore
        onButtonClick && onButtonClick(button);


      },
    };

    switch (button.type) {
      case "RibbonButton":
        return <RibbonButton {...buttonProps} />;
      case "RibbonIconButton":
        return <RibbonIconButton {...buttonProps} />;
      case "RibbonSplitButton":
        const splitButtonOptions = button.dropdownItems
          ? button.dropdownItems.map((item) => item.caption)
          : [];


        const ribbonIconResult = RibbonIcon({ iconName: button.icon });
        return (
          <RibbonSplitButton
            key={index}
            options={splitButtonOptions}
            defaultSelectedIndex={button.defaultSelectedIndex}
            icon={ribbonIconResult.iconComponent}
            displayIcon={ribbonIconResult.displayIcon}
          />
        );
      default:
        return null;
    }
  }, [onButtonClick]);

  const wrapWithLink = (button: RibbonButton, buttonComponent: string | number | boolean | JSX.Element | React.ReactFragment | null | undefined) => {
    return button.route ? (
      <Link href={button.route}>
        <span style={{ textDecoration: 'none', cursor: 'pointer' }}>{buttonComponent}</span>
      </Link>
    ) : (
      buttonComponent
    );
  };


  const renderButtons = useCallback((buttons: RibbonButton[], parentKey: React.Key | null | undefined = '') => {
    return buttons.map((button, index) => {
      const buttonElement = renderButton(button, index);
      return (
        <React.Fragment key={`${parentKey}-${index}`}>
          {wrapWithLink(button, buttonElement)}
        </React.Fragment>
      );
    });
  }, [onButtonClick]);


  const chunkArray = useCallback((array: any[], chunkSize: any) => {
    const results = [];
    while (array.length) {
      results.push(array.splice(0, chunkSize));
    }
    return results;
  }, []);

  return (
    <>
    <ThemeProvider theme={theme}>
      <TabContext value={selectedTabIndex.toString()}>
        {isMobile ? (
          <StyledMobileStepper
            activeStep={selectedTabIndex}
            steps={ribbonTabs.length}
            position="static"
            nextButton={
              <IconButton
                size="small"
                onClick={() =>
                  setSelectedTabIndex((prev) =>
                    prev === ribbonTabs.length - 1 ? 0 : prev + 1
                  )
                }
                aria-label="next"
              >
                <KeyboardArrowRight />
              </IconButton>
            }
            backButton={
              <IconButton
                size="small"
                onClick={() =>
                  setSelectedTabIndex((prev) =>
                    prev === 0 ? ribbonTabs.length - 1 : prev - 1
                  )
                }
                aria-label="back"
              >
                <KeyboardArrowLeft />
              </IconButton>
            }
          />
        ) : (
          <StyledTabs
            value={selectedTabIndex}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabsToUse.map((tab, tabIndex) => (
              <StyledTab
                key={tabIndex}
                label={tab.label}
                iconPosition="start"
                icon={RibbonIcon({ iconName: tab.icon }).iconComponent || undefined}

              />
            ))}
          </StyledTabs>
        )}

        {tabsToUse.map((tab, tabIndex) => (
          <StyledTabPanel
            key={tabIndex}
            value={tabIndex.toString()}
            id={`tabpanel-${tabIndex}`}
            aria-labelledby={`tab-${tabIndex}`}
          >
            {tab.buttonGroups.map((group: RibbonButtonGroup, groupIndex: React.Key | null | undefined) => {
              if (group.flexDirection === "column") {
                const chunkedButtons = chunkArray([...group.buttons], 2);

                return chunkedButtons.map((chunk, chunkIndex) => (
                  <CustomRibbonButtonGroup
                    key={`${groupIndex}-${chunkIndex}`}
                    style={{
                      flexDirection: group.flexDirection,
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem",
                    }}
                    caption={group.caption}
                  >
                    {renderButtons(chunk, `${groupIndex}-${chunkIndex}`)}
                  </CustomRibbonButtonGroup>
                ));
              } else {
                return (
                  <CustomRibbonButtonGroup
                    key={groupIndex}
                    style={{
                      flexDirection: group.flexDirection,
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem",
                    }}
                    caption={group.caption}
                  >

                    {
                      //@ts-ignore
                      renderButtons(group.buttons, groupIndex)
                    }
                  </CustomRibbonButtonGroup>
                );
              }
            })}

            <BasicSpeedDial />
          </StyledTabPanel>
        ))}
      </TabContext>
      </ThemeProvider>
    </>
  );
};

export default Ribbon;


