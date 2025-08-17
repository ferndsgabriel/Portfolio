import { Route, Routes } from "react-router-dom";
import Home from "./Pages/home";

const RoutesApp =  () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    )
}

export default RoutesApp;