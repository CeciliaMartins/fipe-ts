import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AppProps } from 'next/app';
import '../styles/globals.css';


const theme = {
    colors: {
        primary: '#0070f3',
    },
}

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}