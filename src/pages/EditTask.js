import * as Yup from "yup";
import { useParams } from "react-router";
import React from 'react';
import { useEffect, useState } from "react";
import { showAlert } from "../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";
import TaskForm from '../Components/taskForm';
import { taskAPIs } from '../API/axiosSetup';
import CircularIndeterminate from "../Components/CircularIndeterminate";
const inputs = [
    {
        id: 'title',
        validation: Yup.string().min(2).max(30).required('Title is required'),
        initialValue: '',
        label: 'title ',
        type: 'text'
    },
    {
        id: 'description',
        validation: Yup.string().min(7).max(30).required('description is required'),
        initialValue: '',
        label: 'description ',
        type: 'text'
    }
]


export default function EditTask() {
    const { id } = useParams();
    const [values, setValues] = useState();
    const [inputsData, setInputsData] = useState([...inputs]);
    const [err, setErr] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        taskAPIs
            .get(`/task/getOne/${id}`)
            .then((res) => {
                setValues(res.data);
                inputs.forEach(
                    (item) => {
                        (item.initialValue = res.data[item.id])
                    }
                );
                setInputsData([...inputs]);
            })
            .catch((err) => {
                dispatch(showAlert(err.message, "error"));
                setErr(true);
            });
    }, []);

    const handleUpdate = async (values, { resetForm }) => {
        await taskAPIs
            .put(`/task/edit/${id}`, values)
            .then((res) => {
                dispatch(showAlert("updated successfully", "success"));
            })
            .catch((err) => {
                dispatch(showAlert(err.message, "error"));
            });
    };



    return (err === false ?
        (values ?
            <TaskForm
                handleSubmit={handleUpdate}
                inputsProps={inputsData}
                title="Edit task "
                submitLabel="Edit task"
            /> : <CircularIndeterminate />)
        : <>Not Found</>

    );
}