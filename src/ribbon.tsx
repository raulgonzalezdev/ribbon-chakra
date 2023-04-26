import React, { useCallback } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  VStack,
  Input,
  Textarea,
  Select,
  Switch,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import CustomRibbonButton from "./CustomRibbonButton";
import CustomRibbonButtonGroup from "./CustomRibbonButtonGroup";
// import BasicSpeedDial from "./speeddial/BasicSpeedDial";
import { ribbonTabs } from "./ribbonTabs";
import { RibbonProps, RibbonButtonGroup, RibbonIconProps, ButtonProps } from './interfaces';

const Ribbon: React.FC<RibbonProps> = ({ customTabs, onButtonClick }) => {

   
    const tabsToUse = customTabs ? customTabs : ribbonTabs ? ribbonTabs : [];
    console.log(tabsToUse)

  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  const isMobile = false; // Reemplace esto con su lógica para manejar dispositivos móviles

  const RibbonIcon = ({ iconName }: RibbonIconProps) => {
    if (!iconName) {
      return { iconComponent: null, displayIcon: false };
    }

    const IconComponent = require("@mui/icons-material")[iconName];

    if (!IconComponent) {
      return { iconComponent: null, displayIcon: false };
    }

    return { iconComponent: <IconComponent />, displayIcon: true };
  };

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index);
  };

  const renderReactComponent = useCallback(
    (button: RibbonButton, index: number) => {
      const ComponentMap: { [key: string]: any } = {
        Input: Input,
        TextArea: Textarea,
        Select: Select,
        Switch: Switch,
      };
      const Component = button.component
        ? ComponentMap[button.component]
        : undefined;

      if (!Component) return null;

      const wrappedComponent =
        button.component === "Select" ? (
          <Component>
            {button.options.items.map((item, itemIndex) => (
              <option key={itemIndex} value={item.value}>
                {item.label}
              </option>
            ))}
          </Component>
        ) : (
          <Component onChange={button.onChange} />
        );

      return (
        <Box key={index} display="inline-block" marginRight={1}>
          {wrappedComponent}
        </Box>
      );
    },
    []
  );

  return (
    <Box>
      <Tabs
        index={selectedTabIndex}
        onChange={handleTabChange}
        isLazy
        colorScheme="blue"
        variant="enclosed"
      >
        <TabList>
          {tabsToUse.map((tab, index) => (
            <Tab key={index}>{tab.caption}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabsToUse.map((tab, index) => (
            <TabPanel key={index}>
              <VStack alignItems="flex-start" spacing={isMobile ? 2 : 4}>
                {tab.ribbonGroups.map((group: RibbonButtonGroup, index: number) => (
                  <CustomRibbonButtonGroup
                    key={index}
                    flexDirection={group.flexDirection || "row"}
                    caption={group.caption}
                    buttonSize={group.buttonSize}
                    >
                      {group.ribbonButtons.map((button: ButtonProps, index: number) => {
                        const { iconComponent, displayIcon } = RibbonIcon(button);
                        if (displayIcon) {
                          return (
                            <CustomRibbonButton
                              key={index}
                              caption={button.caption}
                              iconComponent={iconComponent}
                              onClick={button.onClick}
                            />
                          );
                        } else if (button.component) {
                          return renderReactComponent(button, index);
                        } else {
                          return null;
                        }
                      })}
                    </CustomRibbonButtonGroup>
                  ))}
                </VStack>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        <Box display="flex" justifyContent="space-between">
          <IconButton
            aria-label="Anterior"
            icon={<ChevronLeftIcon />}
            onClick={() => setSelectedTabIndex((prev) => Math.max(prev - 1, 0))}
            disabled={selectedTabIndex === 0}
          />
          <IconButton
            aria-label="Siguiente"
            icon={<ChevronRightIcon />}
            onClick={() =>
              setSelectedTabIndex((prev) => Math.min(prev + 1, tabsToUse.length - 1))
            }
            disabled={selectedTabIndex === tabsToUse.length - 1}
          />
        </Box>
    
      </Box>
    );
  };
  
  export default Ribbon;
  
