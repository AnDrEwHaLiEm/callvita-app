import { Route, Routes } from "react-router-dom";
import GetAll from '../pages/GetAll'
import AddTask from "../pages/addTask";
import EditTask from "../pages/EditTask";
import ResponsiveAppBar from "./ResponsiveAppBar";
import SearchByTitle from "../pages/searchByTitle";
import SearchByDescription from "../pages/searchByDescription";

const PagetRoute = () => {
    return (
        <>
            <ResponsiveAppBar />
            <Routes>
                <Route exact path="/" element={<GetAll />} />
                <Route exact path="/add" element={<AddTask />} />
                <Route exct path="/edit/:id" element={<EditTask />} />
                <Route exact path="/getTitle" element={<SearchByTitle />} />
                <Route exact path="/getDescription" element={<SearchByDescription />} />
            </Routes>
        </>
    );
};

export default PagetRoute;
