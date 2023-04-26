import React from "react";

interface CustomRibbonButtonProps {
  children: React.ReactNode;
  caption: string;
}

const customRibbonButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 4px",
  padding: "4px 8px",
  border: "1px solid transparent",
  fontSize: "0.9rem",
  whiteSpace: "nowrap",
};

const customRibbonButtonHoverStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  backgroundColor: "#f5f5f5",
  cursor: "pointer",
};

const CustomRibbonButton: React.FC<CustomRibbonButtonProps> = ({
  children,
  caption,
}) => {
  const [hover, setHover] = React.useState(false);

  const combinedStyle = React.useMemo(
    () => ({
      ...customRibbonButtonStyle,
      ...(hover ? customRibbonButtonHoverStyle : {}),
    }),
    [hover]
  );

  return (
    <div
      style={combinedStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {React.cloneElement(children as React.ReactElement, {
        style: { marginBottom: "2px" },
      })}
      <div>{caption}</div>
    </div>
  );
};

export default CustomRibbonButton;
