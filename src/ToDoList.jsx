import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button"
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import "./index.css"
import AddIcon from '@mui/icons-material/Add';
import { Add, Delete } from "@mui/icons-material";
const   ToDoList=()=>{
  const [item, setItem] = useState("")
  const [itemstodisplay, setItemstodisplay] = useState({})
  const input = useRef()

  const itemAdd=(e)=>{
    if(item=="")
    {
      return;
    }
    let temp=localStorage.getItem("grocessaryItems");
    if(temp==null)
    {

      localStorage.setItem("grocessaryItems",JSON.stringify({[item]:item}))
    }
    else{
      console.log(temp);
      temp = JSON.parse(temp) 
      temp={...temp,[item]:item}
      localStorage.clear("grocessaryItems");
      localStorage.setItem('grocessaryItems',JSON.stringify(temp))
      setItemstodisplay((item)=>temp)
    }
    setItem("");


  }

  const itemDelete=(item)=>{
    var items = Object.keys(itemstodisplay).filter( (itemm)=>itemm !==item)
    localStorage.clear("grocessaryItems")
    let tempObj ={} 
    for(let value of items) 
    tempObj[value]=value;
    localStorage.setItem("grocessaryItems",JSON.stringify(tempObj))
    setItemstodisplay(tempObj)
  }
  useEffect(() => {

    let temp = localStorage.getItem("grocessaryItems");
    temp=JSON.parse(temp)
    setItemstodisplay((item)=>temp)
    return () => {
      
    }
  }, [])
  
  return(
   < >
   <div className="main_div">
    <div className="center_div">
      <h1>ToDo List</h1>
    <div>

<form ref={input}>

      <input  type="text" value={item} onChange={(e)=>{ setItem(e.target.value)}}  placeholder="Add an Item"/>
</form>
      <Button variant="contained" color="success" onClick={itemAdd} ><Add></Add></Button>
    </div>
    <div id="items">

    {
     itemstodisplay && Object.keys(itemstodisplay).map( ( key,value)=>(<li key={key}><IconButton  onClick={(e)=>{ itemDelete(key)}}   size="small"><Delete color="secondary" ></Delete></IconButton>{key}</li>))
    }
    </div>
    </div>
   </div>

   </>
  )
}
export default ToDoList;