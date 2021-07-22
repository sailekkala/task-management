import React, {useEffect, useState} from "react";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Task.scss';
import CustomButton from "../../Comman/custom-button/custom-button";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteTask, getAllTasks} from "../../store/actions/taskActions";
import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    TablePagination,
    TableRow, Menu, MenuItem
} from "@material-ui/core";


const columns = [
    { id: 'taskName', label: 'Name', minWidth: 170 },
    { id: 'taskDesc', label: 'Description', minWidth: 190 },
    {
        id: 'startDateTime',
        label: 'Start Date Time',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'endDateTime',
        label: 'End Date Time',
        minWidth: 170,
        align: 'center'
    },
    {
        id : 'Action',
        label: 'Actions',
        minWidth: 100,
        align: "center",
        customColumn : 'ACTIONS'
    }
];




export const ViewTask = () => {
    const dispatch = useDispatch();
    const taskListData = useSelector(state => state.taskList);
    const {tasks} = taskListData;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const  handleTaskDelete = (task) => {
      if (task){
          dispatch(deleteTask(task))
      }
        handleClose();
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        dispatch(getAllTasks())
    }, [dispatch])

    return (
        <div className="task_wrapper">
            <div className="container h100">
                <div className='task_wrapper_card'>
                    <div className='task_card_header'>
                       <span className='task_title_header'>
                           Tasks
                       </span>
                        <span style={{flexGrow: 1}}/>
                        <Link to={'/createTask'}>
                            <CustomButton inverted>Add Task</CustomButton>
                        </Link>
                    </div>

                    <div className='task_card_container'>
                        <TableContainer className='tableContainer'>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tasks !== undefined && tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={task.id}>
                                                {columns.map((column) => {
                                                    const value = task[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                             {column.format && typeof value === 'number' ? column.format(value) :
                                                                column.customColumn === 'ACTIONS' ? (
                                                                    <MoreVertIcon onClick={handleMenuClick} aria-controls="simple-menu" aria-haspopup="true"/>) : value
                                                             }
                                                            <Menu
                                                                id="simple-menu"
                                                                anchorEl={anchorEl}
                                                                keepMounted
                                                                open={Boolean(anchorEl)}
                                                                onClose={handleClose}>
                                                                <MenuItem component={Link} to={`./editTask/${task['id']}`}>Edit Task</MenuItem>
                                                                <MenuItem onClick={() => handleTaskDelete(task)}>Delete Task</MenuItem>
                                                            </Menu>
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={tasks !== undefined ? tasks.length : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTask;
