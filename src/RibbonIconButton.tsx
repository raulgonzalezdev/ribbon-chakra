import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const SmallIconButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5),
  minWidth: 'auto',
  minHeight: 'auto',
  textTransform: 'none',
  '& .MuiSvgIcon-root': {
    fontSize: '1rem',
  },
  '& .MuiButton-label': {
    fontSize: '0.8rem',
  },
}));

interface RibbonIconButtonProps {
  icon: React.ReactNode;
  caption: string;
  onClick: () => void;
  textPosition?: 'left' | 'right';
}

const RibbonIconButton: React.FC<RibbonIconButtonProps> = ({ icon, caption, onClick, textPosition = 'right' }) => {
  return (
    <SmallIconButton onClick={onClick}>
      {textPosition === 'left' && <span style={{ marginRight: '0.5rem' }}>{caption}</span>}
      {icon}
      {textPosition === 'right' && <span style={{ marginLeft: '0.5rem' }}>{caption}</span>}
    </SmallIconButton>
  );
};

export default RibbonIconButton;



