import React, {useState} from "react";
import CustomButton from "../../Comman/custom-button/custom-button";
import {TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {updateTask} from "../../store/actions/taskActions";

const EditTask = () => {
    let {id} = useParams();
    const dispatch = useDispatch();
    let history = useHistory();
    const taskList = JSON.parse(localStorage.getItem('taskList'));
    let findValue = taskList.find(item => item['id'] === id);
    const [task, setTask] = useState({
        id: findValue ? findValue['id'] : '',
        taskName: findValue ? findValue['taskName'] : '',
        taskDesc: findValue ? findValue['taskDesc'] : '',
        startDateTime: findValue ? findValue['startDateTime'] : '',
        endDateTime: findValue ? findValue['endDateTime'] : ''
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setTask(task => ({...task, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (task.taskName && task.startDateTime && task.endDateTime) {
            dispatch(updateTask(task));
            history.push('/viewTask');
        }
    }

    return (
        <div className="task_wrapper task_create_form">
            <div className="container">
                <div className='form_container'>
                    <div className='task_wrapper_card col-md-8'>
                        <div className='task_card_header'>
                       <span className='task_title_header'>
                           Edit Task
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
                                        value={task.startDateTime}
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
                                        value={task.endDateTime}
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

export default EditTask;
