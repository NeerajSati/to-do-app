import React,{useState, useEffect} from 'react'
import './todoapp.css'

function ToDoApp() {
    const getList = () => {
        let myList = localStorage.getItem('list');
        if(myList){
            return JSON.parse(myList);
        }
        else
            return [];
    }
    const getDoneList = () => {
        let myDoneList = localStorage.getItem('doneList');
        if(myDoneList){
            return JSON.parse(myDoneList);
        }
        else
            return [];
    }
    const [list,setList] = useState(getList());
    const [doneList,setDoneList] = useState(getDoneList());
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
    useEffect(() => {
      localStorage.setItem('list',JSON.stringify(list))
      localStorage.setItem('doneList',JSON.stringify(doneList))
    }, [list,doneList])
    


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