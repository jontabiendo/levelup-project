import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './ListDisplay.css'
import listsReducer from "../../store/lists";

const ListDisplay = ({ list }) => {
    const [title, setTitle] = useState(list.title)
    const [showComplete, setShowComplete] = useState(false)
    const [description, setDescription] = useState(list.description)
    const [tasks, setTasks] = useState(list.tasks)


    const handleSubmit = () => {

    }

    const newTask = (e) => {
        e.preventDefault()
    }

    return (
        <div className="list-display-div">
            <form>
            <div className="list-header">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title"></input>
                <div id="check-field">
                    <input type="checkbox" onChange={(e) => setShowComplete(!showComplete)}></input>
                    <label>Show Completed</label>
                </div>
            </div>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description"></input>
            <ul className="list-tasks-ul">
                {Object.values(tasks).map(task => (
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
                ))}
            </ul>
            <button onClick={(e) => newTask(e)}>+</button>
            </form>
        </div>
    )
}

export default ListDisplay;