import { useEffect, useState } from 'react';
import { taskAPIs } from '../API/axiosSetup';
import { Alert } from '@mui/material';
import CircularIndeterminate from '../Components/CircularIndeterminate';

export default function GetAll() {
    const [tasks, setTasks] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    useEffect(() => {
        taskAPIs.get("/task/getMany").then((res) => {
            const taskDataInfo = [...res.data];
            setTasks(taskDataInfo);
            setLoading(true);
        }).catch((error) => {
            setError(error.response.data);
            setLoading(true);
        });
    }, [])
    console.log(tasks);
    return (loading === true ?
        error ?
            <Alert severity="error">
                {error}— <strong>check it out!</strong>
            </Alert>
            : <>
                Andrew Haliem
            </>
        : <CircularIndeterminate />
    );
}