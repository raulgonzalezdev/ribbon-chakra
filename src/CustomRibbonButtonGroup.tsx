import React from "react";

interface CustomRibbonButtonGroupProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  caption?: string;
}

const customRibbonButtonGroupWrapperStyle: React.CSSProperties = {
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 1px",
};

const customRibbonButtonGroupStyle: React.CSSProperties = {
  display: "inline-flex",
  flexDirection: "row",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "2px",
  border: "1px solid #e7e6e6",
  boxShadow: "inset 0 0 3px rgba(0, 0, 0, 0.1)",
  padding: "1px",
};

const customRibbonButtonGroupCaptionStyle: React.CSSProperties = {
  fontSize: "10px",
  color: "#666",
  textAlign: "center",
  whiteSpace: "nowrap",
  marginTop: "2px",
};

const CustomRibbonButtonGroup: React.FC<CustomRibbonButtonGroupProps> = ({
  children,
  style,
  caption,
}) => {
  return (
    <div style={customRibbonButtonGroupWrapperStyle}>
      <div style={{ ...customRibbonButtonGroupStyle, ...style }}>
        {children}
      </div>
      {caption && (
        <div style={customRibbonButtonGroupCaptionStyle}>{caption}</div>
      )}
    </div>
  );
};

export default CustomRibbonButtonGroup;
