import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import listsReducer, { setLists } from "../../store/lists";
import DeleteListModal from "./deleteListModal";
import OpenModalButton from "../OpenModalButton";
import { updateListTasksThunk } from "../../store/lists";
import { addTaskThunk, deleteTaskThunk } from "../../store/tasks";
import TaskTile from "../taskTile/taskTile";
import { categories } from "../CreateListModal";


import './ListDisplay.css'

const ListDisplay = ({ list, onRerender, currentListState }) => {
    const dispatch = useDispatch()
    const [currentList, setCurrentList] = currentListState
    const [title, setTitle] = useState(currentList.title)
    const [showComplete, setShowComplete] = useState(false)
    const [description, setDescription] = useState(currentList.description)
    const [isPublic, setIsPublic] = useState(currentList.is_public)
    const [category, setCategory] = useState(currentList.category)
    const [tasks, setTasks] = useState(currentList.tasks)
    const listRef = useRef()

    useEffect(() => {
        setTitle(currentList.title)
        setDescription(currentList.description)
        setIsPublic(currentList.is_public)
        setTasks(currentList.tasks)
        setCategory(currentList.category)
    }, [currentList]);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const list = {
            id: currentList.id,
            title,
            description,
            isPublic,
            category
        }

        dispatch(updateListTasksThunk(list, tasks))
    };
    
    const newTask = (e) => {
        e.preventDefault()
        dispatch(addTaskThunk(currentList.id)).then((data) => setTasks({...tasks, ...data}))
    };

    const deleteTask = (e, taskId) => {
        e.preventDefault()
        dispatch(deleteTaskThunk(taskId))
        const newState = tasks
        delete newState[taskId]
        setTasks({...newState})
    }

    const taskClassname = "list-item" + (!showComplete ? "" : " hidden")

    return (
        <>
        <div className="list-display-div" ref={listRef}>
            <form id="list-display-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="list-header">
                <label>Title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title"></input></label>
                <div id="check-field">
                    <input type="checkbox" value={true} onChange={(e) => setIsPublic(!isPublic)}></input>
                    <label>Public</label>
                </div>
            </div>
            <label>Description: 
            </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" />
            <div className="list-detail-footer">
                <label>Category: 
                    <select onChange={(e) => setCategory(e.target.value)}>
                        {categories.map(option => (
                            category === option ? <option key={option} value={option} selected>{option}</option> : 
                            <option key={option} value={option}>{option}</option>
                            ))}
                    </select>
                </label>
                <button type="submit">Save</button>
            </div>
            <ul className="list-tasks-ul">
                <div id="tasks-headers">
                    <h3>Tasks:</h3>
                    <div id="check-field">
                        <input type="checkbox" onChange={(e) => setShowComplete(!showComplete)}></input>
                        <label>Show Completed</label>
                    </div>
                </div>
                {tasks ? Object.values(tasks).map(task => (
                    <li key={task.id} className={task.is_complete === false || (showComplete === true && task.is_complete === true) ? "list-item" : "hidden"}>
                        {console.log(task)}
                        <div className="left-task-wrapper">
                        {task.is_complete ? (<input type="checkbox" onChange={(e) => setTasks({
                            ...tasks,
                            [task.id]: {
                                ...task,
                                is_complete: !tasks[task.id].is_complete
                            }
                        })} checked></input>) : (<input type="checkbox" onChange={(e) => setTasks({
                            ...tasks,
                            [task.id]: {
                                ...task,
                                is_complete: !tasks[task.id].is_complete
                            }
                        })}></input>)}
                        {task.description.length > 50 && alert("Description must be less than 50 characters")}
                        <input type="text" value={task.description} onChange={(e) => setTasks({
                            ...tasks,
                            [task.id]: {
                                ...task,
                                description: e.target.value
                            }
                        })} maxLength={50} size={50}></input>
                        </div>
                        <div className="right-task-wrapper">
                            <select onChange={(e) => setTasks({
                                ...tasks,
                                [task.id]: {
                                    ...task,
                                    priority: e.target.value
                                }
                            })}>
                                {task.priority === 'low' ? <option value="low" selected>low</option> : <option value="low" >low</option>}
                                {task.priority === 'medium' ? <option value="medium" selected>medium</option> : <option value="medium">medium</option>}
                                {task.priority === 'high' ? <option value="high" selected>high</option> : <option value="high">high</option>}
                            </select>
                            <button onClick={(e) => deleteTask(e, task.id, task.list_id)}><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </li>
                )): null}
            </ul>
            <button id="add-task-button" onClick={(e) => newTask(e)}>+</button>
                </form>
        </div>
        </>
    )
}

export default ListDisplay;