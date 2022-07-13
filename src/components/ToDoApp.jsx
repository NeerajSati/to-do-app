import React,{useState, useEffect} from 'react'
import './todoapp.css'

function ToDoApp() {
    const [list,setList] = useState([]);
    const [doneList,setDoneList] = useState([]);
    const [currTask,setCurrTask] = useState("");
  return (
    <div className='todoapp'>
        <button className='resetBtn'>Reset Page</button>
        <div className='inputHalf'>
            <input className="taskInput" type="text" placeholder='Enter a task(e.g, Shopping)' onChange = {(e)=>setCurrTask(e.target.value)}></input>
            <button className="taskSubmit">Add</button>
        </div>
        <div className='taskHalf'>
            {
                doneList && doneList.map((singleDoneList)=>{
                    return <div key={singleDoneList} className='singleTask singleTaskCompleted'>{singleDoneList}</div>
                })
            }
            {
                list && list.map((singleList,id)=>{
                    return <div key={singleList} className='singleTask'>{singleList}</div>
                })
            }
        </div>
    </div>
  )
}

export default ToDoApp