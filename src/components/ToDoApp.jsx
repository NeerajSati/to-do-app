import React,{useState, useEffect} from 'react'
import './todoapp.css'

function ToDoApp() {
    const [list,setList] = useState([]);
    const [doneList,setDoneList] = useState([]);
    const [currTask,setCurrTask] = useState("");
    const handleSubmit = (e) =>{
        if(currTask){
            setList(list => [currTask, ...list]);
        }
        e.target.value = "";
    }
    const handleCompleted = (id) =>{
        setDoneList(doneList => [list[id], ...doneList]);
        const updatedList = list.filter((el,index)=>{
            return index !== id;
        })
        setList(updatedList);
    }
    const handleReset = (id) =>{
        setDoneList([]);
        setList([]);
    }
    
  return (
    <div className='todoapp'>
        <button className='resetBtn' onClick={handleReset}>Reset Page</button>
        <div className='inputHalf'>
            <input className="taskInput" type="text" placeholder='Enter a task(e.g, Shopping)' onChange = {(e)=>setCurrTask(e.target.value)} onKeyPress={(e) => {
                if (e.key === "Enter") {
                    handleSubmit(e);
                }
            }}></input>
            <button className="taskSubmit" onClick={(e)=>handleSubmit(e)}>Add</button>
        </div>
        <div className='taskHalf'>
            {
                doneList && doneList.map((singleDoneList)=>{
                    return <div key={singleDoneList} className='singleTask singleTaskCompleted'>{singleDoneList}</div>
                })
            }
            {
                list && list.map((singleList,id)=>{
                    return <div key={singleList} className='singleTask' onClick={()=>handleCompleted(id)}>{singleList}</div>
                })
            }
        </div>
    </div>
  )
}

export default ToDoApp