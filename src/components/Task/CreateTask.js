import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import CustomButton from "../../Comman/custom-button/custom-button";
import {useDispatch} from "react-redux";
import {createTask} from "../../store/actions/taskActions";
import {TextField} from "@material-ui/core";

const CreateTask = () => {
    const [task, setTask] = useState({
        id: '',
        taskName: '',
        taskDesc: '',
        startDateTime: '',
        endDateTime: ''
    });
    const dispatch = useDispatch();
    let history = useHistory();


    const handleSubmit = (e)  => {
        e.preventDefault();
        if (task.taskName  && task.startDateTime && task.endDateTime) {
            task['id'] = generateId();
            dispatch(createTask(task));
            history.push('/viewTask');
        }
    }

     const generateId = () => {
        return (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask(task => ({...task, [name]: value}));
    }

    return (
        <div className="task_wrapper task_create_form">
            <div className="container">
                <div className='form_container'>
                    <div className='task_wrapper_card col-md-8'>
                        <div className='task_card_header'>
                       <span className='task_title_header'>
                           Create Task
                       </span>
                        </div>
                        <div className='task_card_content'>
                            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                                <div className="d-flex flex-column">
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Task Name"
                                        value={task.taskName}
                                        onChange={handleChange}
                                        variant="outlined"
                                        name='taskName'
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Task Desc"
                                        value={task.taskDesc}
                                        onChange={handleChange}
                                        variant="outlined"
                                        name='taskDesc'
                                    />
                                    <TextField
                                        id="datetime-local"
                                        label="Start Date Time"
                                        type="datetime-local"
                                        value={task.startTime}
                                        onChange={handleChange}
                                        variant="outlined"
                                        name="startDateTime"
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="datetime-local"
                                        label="End Date Time"
                                        type="datetime-local"
                                        value={task.endTime}
                                        onChange={handleChange}
                                        name="endDateTime"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    />
                                </div>
                                <div className='buttons'>
                                    <CustomButton clear type="reset">Clear</CustomButton>
                                    <CustomButton type='submit'>Submit</CustomButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTask;
