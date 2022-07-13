import React,{useState, useEffect} from 'react'
import doneImg from '../images/Done.png'
import notDoneImg from '../images/NotDone.png'
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
    const handleSubmit = () =>{
        if(currTask){
            if(currTask.length < 35){
                setList(list => [currTask, ...list]);
            }
            else{
                let text = currTask.substr(0,33) + "...";
                setList(list => [text, ...list]);
            }
            setCurrTask("");
        }
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
            <input className="taskInput" type="text" placeholder='Enter a task(e.g, Shopping)' value = {currTask} onChange = {(e)=>setCurrTask(e.target.value)} onKeyPress={(e) => {
                if (e.key === "Enter") {
                    handleSubmit();
                }
            }}></input>
            <button className="taskSubmit" onClick={handleSubmit}>Add</button>
        </div>
        <div className='taskHalf'>
            {
                doneList && doneList.map((singleDoneList)=>{
                    return <div key={singleDoneList} className='singleTask singleTaskCompleted'><p>{singleDoneList}</p> <img className='tasksImg' src={doneImg}></img></div>
                })
            }
            {
                list && list.map((singleList,id)=>{
                    return <div key={singleList} className='singleTask' onClick={()=>handleCompleted(id)}><p>{singleList}</p> <img className='tasksImg' src={notDoneImg}></img></div>
                })
            }
        </div>
    </div>
  )
}

export default ToDoApp