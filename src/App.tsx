import { ToastContainer } from 'react-toastify';

import { Header } from './components/Header';
import { Orders } from './components/Orders';
import { GlobalStyles } from './styles/GlobalStyles';

export function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Orders />
      <ToastContainer autoClose={3000} position="bottom-center" />
    </>
  );
}
