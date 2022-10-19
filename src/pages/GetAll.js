import { useState } from 'react';
import { taskAPIs } from '../API/axiosSetup';
import { Alert } from '@mui/material';
import CircularIndeterminate from '../Components/CircularIndeterminate';
import AllTask from '../Components/AllTasks';
import { showAlert } from "../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";

export default function GetAll() {
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const getData = () => {
        taskAPIs.get("/task/getMany").then((res) => {
            const taskDataInfo = [...res.data];
            setTasks(taskDataInfo);
            setLoading(true);
        }).catch((err) => {
            dispatch(showAlert(err.message, "error"));
            setError(err.message);
            setLoading(true);
        });
    };
    getData();
    const handleDelete = (_id) => {
        taskAPIs.delete(`/task/delete/${_id}`).then((res) => {
            dispatch(showAlert("Deleted", "success"));
            window.location.reload();
        }).catch((err) => {
            dispatch(showAlert(err.message, "error"));
        });
        getData();
    }

    return (loading === true ?
        error ?
            <Alert severity="error">
                {error}— <strong>check it out!</strong>
            </Alert>
            : <AllTask TaskData={tasks} Title="All Tasks" handleDelete={handleDelete} />
        : <CircularIndeterminate />
    );
}