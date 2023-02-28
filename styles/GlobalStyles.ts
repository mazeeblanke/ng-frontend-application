import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { Cinzel } from '@next/font/google';

const cinzel = Cinzel({
	subsets: ['latin']
})

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
//========================================================================================================
// GENERAL
//========================================================================================================
* {
	box-sizing: border-box;
}
*::before {
	box-sizing: border-box;
}
*::after {
	box-sizing: border-box;
}

body {
  background-color: ${({ theme }) => theme.colors.black};
}

html {
	font-family: ${cinzel.style.fontFamily};
}

`;

export default GlobalStyle;
