import '../styles/globals.scss';
import SnackbarProvider from 'react-simple-snackbar';
import { MathJaxContext } from 'better-react-mathjax';

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider>
      <MathJaxContext>
        <Component {...pageProps} />
      </MathJaxContext>
    </SnackbarProvider>
  );
}

export default MyApp;
