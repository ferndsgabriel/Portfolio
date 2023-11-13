
import { BrowserRouter, Routes, Route } from "react-router-dom";import Home from "./Pages/Home";
import Details from "./Pages/Details";

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="details/:id" element={<Details />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
