import RoutesApp from "./routes";
import ScrollReveal from "scrollreveal";
import React,{ useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  useEffect(() => {
    const sr = ScrollReveal({
            reset: true,
    });
    sr.reveal('.scrollReveal', {
        duration: 500,
    });
  }, []);
  
  return (
    <div className="App">
      <RoutesApp/>
      <ToastContainer
position="bottom-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </div>
  );
}

export default App;
