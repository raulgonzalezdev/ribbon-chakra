import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

// Agrega esto
import { styled } from "@mui/system";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

// Agrega esto
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  top: '50%',
  right: 20,
  transform: 'translateY(-190%)',
}));

export default function BasicSpeedDial() {
  return (
    <Box sx={{ height: "100%", transform: "translateZ(0px)", flexGrow: 1, position: "relative" }}>
      <StyledSpeedDial // Modifica esto
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", top: 0, right: 10 }} // Modifica esto
        icon={<SpeedDialIcon />}
        direction="left"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </StyledSpeedDial>
    </Box>
  );
}
