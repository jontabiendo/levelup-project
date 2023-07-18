import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TaskTile = ({task, resetTasks}) => {
    // return(
        // <div className="task-tile-div">
        //     <div className="left-task-wrapper">
        //                 <input type="checkbox" onChange={(e) => setTasks({
        //                     ...tasks,
        //                     [task.id]: {
        //                         ...task,
        //                         is_complete: !tasks[task.id].is_complete
        //                     }
        //                 })}></input>
        //                 <input type="text" value={task.description} onChange={(e) => setTasks({
        //                     ...tasks,
        //                     [task.id]: {
        //                         ...task,
        //                         description: e.target.value
        //                     }
        //                 })}></input>
        //                 </div>
        //                 <div className="right-task-wrapper">
        //                     <select>
        //                         {task.priority === 'low' ? <option value="low" selected>low</option> : <option value="low" >low</option>}
        //                         {task.priority === 'medium' ? <option value="medium" selected>medium</option> : <option value="medium">medium</option>}
        //                         {task.priority === 'high' ? <option value="high" selected>high</option> : <option value="high">high</option>}
        //                     </select>
        //                     <button onClick={(e) => deleteTask(e, task.id, task.list_id)}><i className="fa-solid fa-trash"></i></button>
        //                 </div>
        // </div>
    // )
};

export default TaskTile;