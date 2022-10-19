import { useState } from 'react';
import { taskAPIs } from '../API/axiosSetup';
import { Alert, TextField } from '@mui/material';
import Button from "@mui/material/Button";
import CircularIndeterminate from '../Components/CircularIndeterminate';
import AllTask from '../Components/AllTasks';
import { showAlert } from "../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";

export default function SearchByDescription() {
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState();
    const [loading, setLoading] = useState(3);
    const [error, setError] = useState();
    const [description, setDescription] = useState();


    const getTasks = async () => {
        if (description) {
            await taskAPIs.get(`/task/get/description/${description}`).then((res) => {
                const taskDataInfo = res.data;
                setTasks(taskDataInfo);
                setLoading(1);
                setError(null);
            }).catch((err) => {
                dispatch(showAlert(err.message, "error"));
                setError(err.message);
                setLoading(1);
            });
        }
    }
    const handleSubmit = async (e) => {
        const inputDescription = e.target[0].value;
        setLoading(2);
        setDescription(inputDescription);
    }
    const handleDelete = (_id) => {
        setLoading(2);
        taskAPIs.delete(`/task/delete/${_id}`).then((res) => {
            dispatch(showAlert("Deleted", "success"));
        }).catch((err) => {
            dispatch(showAlert(err.message, "error"));
        })
        getTasks();
    }
    if (loading === 2)
        getTasks();
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
                    id="description"
                    label="description"
                    name="description"
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