import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes/index';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/auth';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <ToastContainer autoClose={3000} />
      <Routes/>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;