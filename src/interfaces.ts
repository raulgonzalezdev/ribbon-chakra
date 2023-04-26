// interfaces.ts
export interface RibbonIconProps {
    iconName?: string;
  }
  
  export interface ButtonProps {
    key: number;
    caption: string;
    iconName?: string;
    icon?: JSX.Element | string | null;
    onClick?: () => void;
  }
  
  export interface RibbonProps {
    customTabs?: any[];
    onButtonClick?: (button: typeof RibbonButton) => void;
  }
  
  export interface RibbonButtonGroup {
    caption?: string;
    flexDirection?: "row" | "column";
    buttons: typeof RibbonButton[];
  }
  