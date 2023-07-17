import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import listsReducer, { setLists } from "../../store/lists";
import DeleteListModal from "./deleteListModal";
import OpenModalButton from "../OpenModalButton";
import { updateListTasksThunk } from "../../store/lists";
import { addTaskThunk, deleteTaskThunk } from "../../store/tasks";


import './ListDisplay.css'

const ListDisplay = ({ list, onRerender, currentListState }) => {
    const dispatch = useDispatch()
    const [currentList, setCurrentList] = currentListState
    const [title, setTitle] = useState(currentList.title)
    const [showComplete, setShowComplete] = useState(false)
    const [description, setDescription] = useState(currentList.description)
    const [isPublic, setIsPublic] = useState(currentList.is_public)
    const [tasks, setTasks] = useState(currentList.tasks)
    const listRef = useRef()

    useEffect(() => {
        setTitle(currentList.title)
        setDescription(currentList.description)
        setIsPublic(currentList.is_public)
        setTasks(currentList.tasks)
    }, [currentList]);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const list = {
            id: currentList.id,
            title,
            description,
            isPublic,
            category: currentList.category
        }
        console.log(list)

        dispatch(updateListTasksThunk(list, tasks))
    };

    const saveTasks = async (e) => {
        e.preventDefault()
        console.log('saving tasks...')
    };
    
    const newTask = (e) => {
        e.preventDefault()
        dispatch(addTaskThunk(currentList.id)).then((data) => setTasks({...tasks, ...data}))
    };

    const deleteTask = (e, taskId) => {
        e.preventDefault()
        dispatch(deleteTaskThunk(taskId))
    }
    
    // console.log(isPublic)
    return (
        <>
        <div className="list-display-div" ref={listRef}>
            <form onSubmit={(e) => handleSubmit(e)}>
            <div className="list-header">
                <label>Title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title"></input></label>
                <div id="check-field">
                    <input type="checkbox" onChange={(e) => setIsPublic(!isPublic)}></input>
                    <label>Public</label>
                </div>
            </div>
            <label>Description: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description"></input></label>
            <div id="check-field">
                    <input type="checkbox" onChange={(e) => setShowComplete(!showComplete)}></input>
                    <label>Show Completed</label>
            </div>
                <button type="submit">Save</button>
            </form>
            <form onSubmit={(e) => newTask(e)}>
            <ul className="list-tasks-ul">
                <h3>Tasks:</h3>
                <button type="submit">Save tasks</button>
                {tasks ? Object.values(tasks).map(task => (
                    <li key={task.id} className="list-item">
                        <div className="left-task-wrapper">
                        <input type="checkbox" onChange={(e) => setTasks({
                            ...tasks,
                            [task.id]: {
                                ...task,
                                is_complete: !tasks[task.id].is_complete
                            }
                        })}></input>
                        <input type="text" value={task.description} onChange={(e) => setTasks({
                            ...tasks,
                            [task.id]: {
                                ...task,
                                description: e.target.value
                            }
                        })}></input>
                        </div>
                        <div className="right-task-wrapper">
                            <select>
                                {task.priority === 'low' ? <option value="low" selected>low</option> : <option value="low" >low</option>}
                                {task.priority === 'medium' ? <option value="medium" selected>medium</option> : <option value="medium">medium</option>}
                                {task.priority === 'high' ? <option value="high" selected>high</option> : <option value="high">high</option>}
                            </select>
                            <button onClick={(e) => deleteTask(e, task.id, task.list_id)}><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </li>
                )): null}
            </ul>
            <button onClick={(e) => newTask(e)}>+</button>
                </form>
        </div>
        </>
    )
}

export default ListDisplay;