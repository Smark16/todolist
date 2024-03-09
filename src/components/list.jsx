import React, { useState, useReducer, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from './modal';
import { reducer } from './reducer';
import '../App.css';

const defaultState = {
  mytasks: [],
  modalOpen: false,
  msg: '',
  completedTasks: [],
};

function List() {
  const [task, setTask] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [isThereTask, setIsThereTask] = useState(true);
  const [complete, setComplete] = useState(true);

  const inputRef = useRef(null)


  const handleSubmit = (e) => {
    e.preventDefault();

    if (task) {
      const tasks = { id: Date.now().toString(), task };
      dispatch({ type: 'ADD_TASK', tsk: tasks });
      setTask('');
    } else {
      dispatch({ type: 'EMPTY' });
    }
  }

  const closeModal = () => {
    dispatch({ type: 'CLOSE' });
  }

  useEffect(()=>{
    if (state.completedTasks.length === 0) {
      setComplete(false);
    } else {
      setComplete(true);
    }

    if(state.mytasks.length === 0){
      setIsThereTask(true)
    }else{
      setIsThereTask(false)
    }

  }, [state.completedTasks, state.mytasks])

 
  
const date = new Date()
  return (
    <>
      <h2>TODO LIST</h2>

      {state.modalOpen && <Modal modalContent={state.msg} closeModal={closeModal} />}
      <div>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="validationDefault01" className="form-label">Add Task</label>
            <input
              type="text"
              className="form-control"
              id="validationDefault01"
              name='task'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              ref={inputRef}
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit">Add Task</button>
          </div>
        </form>

        <h4 className='mt-3'>Incompleted Tasks</h4>

        {isThereTask ? (<h6 className='bg-secondary text-white text-center p-2 h6'>No Tasks</h6>) : (

          <ul className='text-center'>
            {state.mytasks.map(list => {
              const { task, id } = list;
              return (
                <li className='d-flex justify-content-between lists' key={id}>
                  <div className='sks'>
                    <div className='check'>
                    <input type='checkbox' id={`checkbox-${id}`} />
                    <label htmlFor={`checkbox-${id}`}>
                      <span>{task}</span>
                    </label>
                    </div>
                   <div>
                   <span className='date'>{date.toDateString()}</span>
                   </div>
                  
                  </div>
                  <div className='d-flex flex-row btns'>
                    <button className='bg-danger text-white' onClick={() => dispatch({ type: 'REMOVE', tsk: id })}>Delete</button>
                    <button className='bg-success text-center' onClick={()=>dispatch({type:"EDIT", tsk:id})}>Edit</button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

      </div>

      {complete ? (
        <>
          <h4>Completed Tasks</h4>
          {state.completedTasks.map(complete => {
            const { task, id } = complete;
            console.log(task);
            return (
              <div key={id}>
                <ul className='completeList'>
                  <li className='completes'>
                    {task}
                    <span>{date.toDateString()}</span>
                    </li>
                </ul>
              </div>
            );
          })}
        </>
      ) : null}
    </>
  );
}

export default List;
