import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const SmallIconButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5), // reducir el padding a la mitad
  minWidth: 'auto',
  minHeight: 'auto',
  textTransform: 'none',
  '& .MuiSvgIcon-root': { // seleccionar el icono dentro del botón y aplicar estilos
    fontSize: '1rem', // disminuir el tamaño de fuente del icono
  },
  '& .MuiButton-label': { // seleccionar el texto dentro del botón y aplicar estilos
    fontSize: '0.8rem', // disminuir el tamaño de fuente del texto
  },
}));

interface RibbonIconButtonProps {
  icon: React.ReactNode;
  caption: string;
  onClick: () => void;
  textPosition?: 'left' | 'right';
 
}

const RibbonIconButton: React.FC<RibbonIconButtonProps> = ({ icon, caption, onClick, textPosition = 'right', key }) => {
  return (
    <SmallIconButton onClick={onClick}>
      {textPosition === 'left' && <span style={{ marginRight: '0.5rem' }}>{caption}</span>}
      {icon}
      {textPosition === 'right' && <span style={{ marginLeft: '0.5rem' }}>{caption}</span>}
    </SmallIconButton>
  );
};

export default RibbonIconButton;


