import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const LargeIconButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1),
  minWidth: 'auto',
  minHeight: 'auto',
  textTransform: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export interface RibbonButtonProps {
  caption: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  displayIcon?: boolean; // Agregue esta línea
}
 // @ts-ignore
const RibbonButton: React.FC<RibbonButtonProps> = ({ buttonKey, icon, caption, onClick }) => {

  return (
    <LargeIconButton onClick={onClick}>
      {icon}
      <span style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{caption}</span>
    </LargeIconButton>
  );
};

export default RibbonButton;


