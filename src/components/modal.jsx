import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function Modal({modalContent, closeModal}) {

useEffect(()=>{
setTimeout(()=>{
  closeModal()
}, 800)
})
  return (
    <div>
      <span className={modalContent === 'New Task is Added Successfully' ? 'bg-success text-center p-2' : 'bg-danger text-center p-2'}>{modalContent}</span>
    </div>
  )
}

export default Modal
