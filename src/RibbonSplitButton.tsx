import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";

type OptionType = string | { type: "divider" };

interface RibbonSplitButtonProps {
  options: OptionType[];
  defaultSelectedIndex?: number;
  icon?: React.ReactNode;
  displayIcon?: boolean;
}

const CustomButtonGroup = styled(ButtonGroup)`
  background-color: #ffffff;
  border: 1px solid #c1c1c1;
  min-height: 32px;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 0.8rem;

  & .MuiButton-root {
    color: #5a5a5a;
    font-size: 0.8rem;
  }

  & .MuiButton-contained {
    background-color: #ffffff;
  }

  & .MuiButton-root:hover {
    background-color: #f5f5f5;
  }
`;

const CustomMenuItem = styled(MenuItem)`
  font-size: 0.8rem;
`;



const RibbonSplitButton: React.FC<RibbonSplitButtonProps> = ({
  options,
  defaultSelectedIndex,
  icon,
  displayIcon,
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex || 0);

  const handleClick = () => {
    if (options && options[selectedIndex]) {
      console.info(`You clicked ${options[selectedIndex]}`);
    } else {
      console.warn("No options available or invalid selectedIndex.");
    }
  };
  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement>, index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <CustomButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        {!displayIcon && (
          <Button onClick={handleClick}>
            {options && options[selectedIndex] ? (
              typeof options[selectedIndex] === "string"
                ? options[selectedIndex]
                : ""
            ) : (
              ""
            )}
          </Button>
        )}
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          {icon && <span style={{ marginRight: "0.25rem" }}>{icon}</span>}
          <ArrowDropDownIcon fontSize="small" />
        </Button>

      </CustomButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options &&
                    Array.isArray(options) &&
                    options.map((option, index) =>
                      typeof option === "object" && option.type === "divider" ? (
                        <Divider key={`divider-${index}`} />
                      ) : (
                        <CustomMenuItem
                          key={typeof option === "string" ? option : `option-${index}`}
                          selected={index === selectedIndex}
                          onClick={(event) =>
                            handleMenuItemClick(event, index)
                          }
                        >
                          {typeof option === "string" ? option : ""}
                        </CustomMenuItem>
                      )
                    )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default RibbonSplitButton;
