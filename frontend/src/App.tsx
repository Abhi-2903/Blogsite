import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from '../Layout';
function App() {
  return (
    
    <BrowserRouter>
    <ToastContainer position="top-center" autoClose={2000} />
      <Layout/>
    </BrowserRouter>
  );
}

export default App;
