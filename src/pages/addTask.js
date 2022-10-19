import TaskForm from '../Components/taskForm';
import * as Yup from 'yup'
import { taskAPIs } from '../API/axiosSetup';
import { showAlert } from "../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";

const inputs = [
    {
        id: 'id',
        validation: Yup.string().min(1).max(30).required('ID is required'),
        initialValue: '',
        label: 'ID ',
        type: 'text'
    },
    {
        id: 'title',
        validation: Yup.string().min(2).max(30).required('Title is required'),
        initialValue: '',
        label: 'title ',
        type: 'text'
    },
    {
        id: 'description',
        validation: Yup.string().min(7).max(200).required('description is required'),
        initialValue: '',
        label: 'description ',
        type: 'text'
    }
]

export default function AddTask() {

    const dispatch = useDispatch();

    const handleSubmit = async (values, { resetForm }) => {
        const { id, description, title } = values;
        taskAPIs.post('/task/create', { id, title, description }).then((res) => {
            dispatch(showAlert("Add successfully", "success"));
            resetForm();
        }).catch((error) => {
            dispatch(showAlert("Error When Create Task", "error"));
            console.log(error);
        });
    };

    return (
        <>
            <TaskForm
                inputsProps={inputs}
                title="Add New Task "
                submitLabel="create task"
                handleSubmit={handleSubmit}
            />
        </>
    );
}