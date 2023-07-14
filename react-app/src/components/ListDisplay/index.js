import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import listsReducer, { setLists } from "../../store/lists";
import DeleteListModal from "./deleteListModal";
import OpenModalButton from "../OpenModalButton";


import './ListDisplay.css'

const ListDisplay = ({ list, onRerender }) => {
    const dispatch = useDispatch()
    const currentList = useSelector(state => state.lists.current_list)
    const [showList, setShowList] = useState(list.id === currentList.id)
    const [title, setTitle] = useState(list.title)
    const [showComplete, setShowComplete] = useState(false)
    const [description, setDescription] = useState(list.description)
    const [isPublic, setIsPublic] = useState(list.public)
    const [tasks, setTasks] = useState(list.tasks)
    const listRef = useRef()

    useEffect(() => {
        if (!showList) return;

        const closeList = (e) => {
          if (!listRef.current || !listRef.current.contains(e.target)) {
            setShowList(false);
          }
        };

        document.addEventListener("click", closeList);

        return () => document.removeEventListener("click", closeList);
    }, [showList]);

    const openList = () => {
        if (showList) return;
        setShowList(true);
    };

    const listClassName = "list-display-div" + (showList ? "" : " hidden")

    const handleSubmit = () => {

    }

    const newTask = (e) => {
        e.preventDefault()
    }

    return (
        <>
        <div className="list-menu-selector">
            <button onClick={openList}>{title}</button>
            <OpenModalButton modalComponent={<DeleteListModal onRerender={onRerender} list={list} />} buttonText={<i class="fa-solid fa-trash"></i>} />
        </div>
        <div className={listClassName} ref={listRef}>
            <form>
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
            <ul className="list-tasks-ul">
                <h3>Tasks:</h3>
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
                            <button><i class="fa-solid fa-trash"></i></button>
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