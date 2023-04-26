# Ribbon React Menu

Menu Ribbon para React, creado por Raul Gonzalez.

## Características

Se trata de un componente principal de una aplicación que utiliza varios componentes de la librería Material-UI, y un componente de terceros llamado "Ribbon" que permite crear un menú estilo cinta (como el de Microsoft Office) con pestañas y grupos de botones.

Si no se le pasa ningún parámetro al componente, se creará un menú de cinta predefinido con dos pestañas, "Home" y "Insert", cada una con varios grupos de botones.

En el cuerpo del componente principal se encuentra la función handleButtonClick, que se ejecuta al hacer clic en un botón del Ribbon y muestra el botón en la consola del navegador. También se utiliza el componente Ribbon con los tabs personalizados customTabs y la función handleButtonClick, y

- Basado en Material-UI
- Fácil de usar e integrar en tus proyectos
- Soporte para diferentes componentes de entrada

## Instalación

Para instalar Ribbon React Menu, ejecuta el siguiente comando:

```bash
npm install ribbon-react-menu
```
o

```bash
yarn add ribbon-react-menu

```

## Uso

1. Importa el componente Ribbon en tu archivo de React:


```bash
import Ribbon from "ribbon-react-menu";

```
2. Utiliza el componente Ribbon en tu aplicación, proporcionando las propiedades necesarias:

**En el archivo src/ribbonTabs.tsx  hay una estructura completa de la forma como puedes personalizar sus menus. Para los Iconos se recomienda los de la libreria Material UI**

Este código define la estructura para crear una cinta de opciones personalizada utilizando el componente Ribbon. El primer parámetro de Ribbon es opcional y se puede utilizar para proporcionar una estructura personalizada de tabs y botones. Si no se proporciona, el componente creará un menú predefinido.

El objeto ribbonTabs contiene un array de objetos que definen cada pestaña de la cinta de opciones. Cada objeto tiene las siguientes propiedades:

- **label:** el texto que se muestra en la pestaña
- **mode:** el modo de visualización de la pestaña (por defecto, default)
- **icon:** el icono que se muestra en la pestaña
- **buttonGroups:** un array de objetos que definen cada grupo de botones de la pestaña. Cada objeto tiene las siguientes propiedades:
- **flexDirection:** la dirección en la que se muestran los botones (row para horizontal o column para vertical)
- **caption:** el texto que se muestra debajo del grupo de botones
- **buttons:** un array de objetos que definen cada botón del grupo. Cada objeto tiene las siguientes propiedades:
- **type:** el tipo de botón **(RibbonButton, RibbonIconButton, RibbonSplitButton o RibbonReactComponent)**
- **caption:** el texto que se muestra en el botón
- **icon:** el icono que se muestra en el botón
- **route:** la ruta que se activa al hacer clic en el botón (opcional)
- **dropdownItems:** un array de objetos que definen los elementos del menú desplegable del botón dividido (opcional)
- **component:** el componente React que se renderiza en el botón React Component (opcional)
- **options:** un objeto que contiene las opciones para el componente React (opcional)
- **onChange:** un manejador de eventos que se ejecuta cuando cambia el valor del componente React (opcional)

En este caso, el objeto ribbonTabs define varias pestañas, cada una con grupos de botones que ejecutan diferentes acciones. Por ejemplo, la primera pestaña tiene un grupo de botones de portapapeles y un grupo de botones de estilo. La segunda pestaña tiene un grupo de botones de ejemplo, mientras que la tercera pestaña tiene grupos de botones de inserción, diseño, opciones y vista. La última pestaña contiene grupos de botones personalizados que utilizan componentes React.

```
import React, { useState } from 'react';

// Importamos el componente Ribbon desde la librería "ribbon-react-menu"
import Ribbon from "ribbon-react-menu";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { Box } from "@mui/material";

const theme = createTheme();

const ribbonTabs = [

// Define la estructura del Ribbon, que consta de una o varias pestañas
  // Cada pestaña tiene uno o varios grupos de botones
  {
    label: "Home",
    mode: "default",
    icon: "Home",
    buttonGroups: [
      {
        flexDirection: "row",
        caption: "Clibooard",
        buttons: [
          { type: "RibbonButton", caption: "Paste", icon: "ContentPaste" , route: "/ribboneditor"},
          { type: "RibbonButton", caption: "Cut", icon: "AccountBalance", route: "/datagridmasterdetails" },
          { type: "RibbonButton", caption: "Copy", icon: "FileCopy" , route: "/menus"},
        ],
      },
      {
        flexDirection: "column",
        caption: "Styles",
        buttons: [
          { type: "RibbonIconButton", caption: "Bold", icon: "FormatBold" },
          { type: "RibbonIconButton", caption: "Italic", icon: "FormatItalic" },
          { type: "RibbonIconButton", caption: "Underline", icon: "FormatUnderlined" },
          { type: "RibbonIconButton", caption: "Strikethrough", icon: "FormatStrikethrough" },
        ],
      },
      {
        flexDirection: "column",
        caption: "Undo",
        buttons: [
          { type: "RibbonIconButton", caption: "Undo", icon: "Undo" },
          { type: "RibbonIconButton", caption: "Redo", icon: "Redo" },
        ],
      },
    ],
  },
  {
    label: "Examples",
    mode: "default",
    icon: "AccountBalance",
    buttonGroups: [
      {
        flexDirection: "row",
        caption: "Examples",
        buttons: [
          { type: "RibbonButton", caption: "Ribbon Button", icon: "Mail" },
          { type: "RibbonToolButton", caption: "Ribbon Tool Button", icon: "Settings" },
          {
            type: "RibbonSplitButton",
            icon: "Settings",
            caption: " ",
            dropdownItems: [
              { type: "RibbonDropdownItem", caption: "Windows 10" },
              { type: "RibbonDropdownItem", caption: "Windows 11" },
              { type: "RibbonDropdownItem", caption: "Office 365" },
            ],
          },
        ],
      },
    ],
  }
  
  ];
// Creamos un componente StyledBoxMainContainer mediante la función styled de MUI
const StyledBoxMainContainer = styled(Box)(({ theme }) => ({
  marginTop: 30,
  display: 'flex',
  width: '100%',
  position: 'relative',
}));

// Creamos un componente StyledBoxContent mediante la función styled de MUI
const StyledBoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

// Creamos el componente principal de nuestra aplicación
const App = (props) => {

  // Función que se ejecuta al hacer clic en un botón del Ribbon
  const handleButtonClick = (button) => {
    console.log("Clicked button:", button);
    // Aquí puedes manejar la navegación a diferentes páginas en función del botón
  };

  return (
    // Utilizamos el ThemeProvider de MUI para aplicar el tema personalizado
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <StyledBoxMainContainer display="flex">

          <Box
            flexGrow={1}
            sx={{
              overflow: 'auto',
            }}
          >
            <StyledBoxContent component="main">
              <Box
                sx={{
                  width: '100%',
                  marginLeft: 0,
                  position: "sticky",
                  top: theme.spacing(8),
                  zIndex: 1100,
                }}
              >
                {/* Utilizamos el componente Ribbon con los tabs personalizados y la función handleButtonClick */}
                <Ribbon customTabs={ribbonTabs} onButtonClick={handleButtonClick} />
              </Box>
              {/* Renderizamos los componentes hijos */}
              {props.children}
            </StyledBoxContent>
          </Box>
        </StyledBoxMainContainer>
      </Box>
    </ThemeProvider>
  );
};

export default App;


```
## Dependencias

Este proyecto utiliza las siguientes dependencias:


**@mui/icons-material**
**@mui/lab**
**@mui/material**
**@mui/system**
**@emotion/react**
**@emotion/styled**
**next**
**react**
**react-dom**

## Desarrollo

Para construir el proyecto, ejecuta el siguiente comando:

```
  npm run build
```

Para ejecutar las pruebas, ejecuta el siguiente comando:

```
npm test

```

