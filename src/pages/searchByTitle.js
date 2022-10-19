import { useState } from 'react';
import { taskAPIs } from '../API/axiosSetup';
import { Alert, TextField } from '@mui/material';
import Button from "@mui/material/Button";
import CircularIndeterminate from '../Components/CircularIndeterminate';
import AllTask from '../Components/AllTasks';
import { showAlert } from "../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";

export default function SearchByTitle() {
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState();
    const [loading, setLoading] = useState(3);
    const [error, setError] = useState();



    const handleSubmit = async (e) => {
        const inputTitle = e.target[0].value;
        setLoading(2);
        await taskAPIs.get(`/task/get/title/${inputTitle}`).then((res) => {
            const taskDataInfo = res.data;
            setTasks([...taskDataInfo]);
            setLoading(1);
            setError();
        }).catch((err) => {
            console.log(err);
            dispatch(showAlert(err.response.data, "error"));
            setError(err.response.data);
            setLoading(1);
        });
    }

    const handleDelete = (_id, index) => {
        taskAPIs.delete(`/task/delete/${_id}`).then((res) => {
            dispatch(showAlert("Deleted", "success"));
            const task2 = [...tasks];
            task2.splice(index, 1);
            setTasks([...task2]);
        }).catch((err) => {
            dispatch(showAlert(err.response.datata, "error"));
        })
    }

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
            }}
            >
                <TextField
                    size="small"
                    margin="normal"
                    style={{
                        marginLeft: "40%",
                        alignItems: "center",
                        marginBottom: "5%",
                        display: "block"
                    }}
                    type="text"
                    id="title"
                    label="Title"
                    name="title"
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    style={{
                        marginTop: "5%",
                        margin: "auto",
                        display: "block"
                    }}
                >
                    Submit
                </Button>
            </form>
            {
                loading === 1 ?
                    error ?
                        <Alert severity="error">
                            {error}— <strong>check it out!</strong>
                        </Alert>
                        : <AllTask TaskData={tasks} Title="Tasks" handleDelete={handleDelete} />
                    :
                    loading === 2 ? < CircularIndeterminate /> : null
            }
        </>

    );
}