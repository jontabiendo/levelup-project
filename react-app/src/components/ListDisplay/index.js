import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import listsReducer, { setLists } from "../../store/lists";
import DeleteListModal from "./deleteListModal";
import OpenModalButton from "../OpenModalButton";
import { updateListTasksThunk, addTaskThunk, deleteTaskThunk } from "../../store/lists";
// import { addTaskThunk, deleteTaskThunk } from "../../store/tasks";
import TaskTile from "../taskTile/taskTile";
import { categories } from "../CreateListModal";


import './ListDisplay.css'

const ListDisplay = ({ list, onRerender, currentListState }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [currentList, setCurrentList] = currentListState
    const [title, setTitle] = useState(currentList.title)
    const [showComplete, setShowComplete] = useState(false)
    const [description, setDescription] = useState(currentList.description)
    const [isPublic, setIsPublic] = useState(currentList.is_public)
    const [category, setCategory] = useState(currentList.category)
    const [tasks, setTasks] = useState(currentList.tasks)
    const [saved, setSaved] = useState(true) 
    const listRef = useRef()

    useEffect(() => {
        setTitle(currentList.title)
        setDescription(currentList.description)
        setIsPublic(currentList.is_public)
        setTasks(currentList.tasks)
        setCategory(currentList.category)
    }, [currentList]);
    console.log(saved)

    useEffect(() => {
        if (saved) return
        
        const unsavedChanges = (e) => {
            if (!listRef.current.contains(e.target)) {
                alert("You have unsaved changes, click save to save changes")
                setSaved(true)
            }    
        }
        document.addEventListener("click", unsavedChanges)
        console.log("event listener added")

        return () => document.removeEventListener("click", unsavedChanges)
    }, [saved])
    
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

    const deleteTask = (e, taskId, listId) => {
        e.preventDefault()
        dispatch(deleteTaskThunk(taskId, listId))
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
                <label>Title: <input type="text" value={title} onChange={(e) => {
                    setTitle(e.target.value)
                    setSaved(false)}} placeholder="title"></input></label>
                <div id="check-field">
                    <input type="checkbox" value={true} onChange={(e) => {
                        setIsPublic(!isPublic) 
                        setSaved(false)}}></input>
                    <label>Public</label>
                </div>
            </div>
            <label>Description: 
            </label>
                <textarea value={description} onChange={(e) => {
                    setDescription(e.target.value)
                    setSaved(false)}} placeholder="description" />
            <div className="list-detail-footer">
                <label>Category: 
                    <select onChange={(e) => {
                        setCategory(e.target.value)
                        setSaved(false)}}>
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
                        <div className="left-task-wrapper">
                        {task.is_complete ? (<input type="checkbox" onChange={(e) => {
                            setTasks({
                            ...tasks,
                            [task.id]: {
                                ...task,
                                is_complete: !tasks[task.id].is_complete
                            }
                        })
                        setSaved(false)}} checked></input>) : (<input type="checkbox" onChange={(e) => {
                            setTasks({
                            ...tasks,
                            [task.id]: {
                                ...task,
                                is_complete: !tasks[task.id].is_complete
                            }
                        })
                        setSaved(false)}}></input>)}
                        <input onKeyDown={task.description.length === 50 ? alert("You have reached the limit of 50 characters") : ""} type="text" value={task.description} onChange={(e) => {
                            setTasks({
                            ...tasks,
                            [task.id]: {
                                ...task,
                                description: e.target.value
                            }
                        })
                        setSaved(false)}} maxLength={50} size={50}></input>
                        </div>
                        <div className="right-task-wrapper">
                            <select onChange={(e) => {
                                setTasks({
                                ...tasks,
                                [task.id]: {
                                    ...task,
                                    priority: e.target.value
                                }
                            }) 
                            setSaved(false)}}>
                                {task.priority === 'low' ? <option value="low" selected>low</option> : <option value="low" >low</option>}
                                {task.priority === 'medium' ? <option value="medium" selected>medium</option> : <option value="medium">medium</option>}
                                {task.priority === 'high' ? <option value="high" selected>high</option> : <option value="high">high</option>}
                            </select>
                            {user && user.email === "demo@aa.io" ? null : (<button onClick={(e) => deleteTask(e, task.id, task.list_id)}><i className="fa-solid fa-trash"></i></button>)}
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