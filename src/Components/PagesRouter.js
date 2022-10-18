import { Route, Routes } from "react-router-dom";
import GetAll from '../pages/GetAll'
import AddTask from "../pages/addTask";
import EditTask from "../pages/EditTask";
import ResponsiveAppBar from "./ResponsiveAppBar";

const PagetRoute = () => {
    return (
        <>
            <ResponsiveAppBar />
            <Routes>
                <Route exact path="/" element={<GetAll />} />
                <Route exact path="/add" element={<AddTask />} />
                <Route exct path="edit/:id" element={<EditTask />} />
            </Routes>
        </>
    );
};

export default PagetRoute;
