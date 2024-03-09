
export const reducer = (state, action) =>{

   if(action.type === "ADD_TASK"){  
     const newTask = [...state.mytasks, action.tsk]
     return {...state, mytasks:newTask, modalOpen:true, msg:"New Task is Added Successfully"}
 }
 
 if(action.type === 'EMPTY'){
   return {...state, modalOpen:true, msg:"Please enter task"}
 }
 
 if(action.type === 'CLOSE'){
   return {...state, modalOpen:false, msg:""}
 }
 
 if(action.type ===  'REMOVE'){
   const newList = state.mytasks.filter(mytask => mytask.id !== action.tsk)
  const removed = state.mytasks.find(mytask => mytask.id == action.tsk)
  
  if(removed){
    const completed = [...state.completedTasks, removed]
    return {...state, mytasks:newList, modalOpen:true, msg:"Task has been deleted", completedTasks:completed}

  }

 }
   return state

 }
 