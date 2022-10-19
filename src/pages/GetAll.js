import { useEffect, useState } from 'react';
import { taskAPIs } from '../API/axiosSetup';
import { Alert } from '@mui/material';
import CircularIndeterminate from '../Components/CircularIndeterminate';
import AllTask from '../Components/AllTasks';
import { showAlert } from "../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";

export default function GetAll() {
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        taskAPIs.get("/task/getMany").then((res) => {
            const taskDataInfo = [...res.data];
            setTasks(taskDataInfo);
            setLoading(true);
        }).catch((err) => {
            dispatch(showAlert(err.response.data, "error"));
            setError(err.response.data);
            setLoading(true);
        });
    },);

    const handleDelete = (_id, index) => {
        taskAPIs.delete(`/task/delete/${_id}`).then((res) => {
            dispatch(showAlert("Deleted", "success"));
            const task2 = [...tasks];
            task2.splice(index, 1);
            setTasks([...task2]);
        }).catch((err) => {
            dispatch(showAlert(err.response.data, "error"));
        });
    }

    return (loading ?
        error ?
            <Alert severity="error">
                {error}— <strong>check it out!</strong>
            </Alert>
            : <AllTask TaskData={tasks} Title="All Tasks" handleDelete={handleDelete} />
        : <CircularIndeterminate />
    );
}