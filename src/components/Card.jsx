import React from 'react';
import { FaFileLines } from "react-icons/fa6";
import { MdEdit, MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from "react-icons/md";
import { motion } from "framer-motion"

function Card({ note, onEdit, onToggleComplete, onDelete, reference }) {
  return (
    <motion.div drag dragConstraints={reference}
     whileDrag={{scale: 1.2}} dragElastic={.1} dragTransition={{bounceStiffness: 100, bounceDamping: 200}} className={`relative w-60 h-72 rounded-[40px] text-black py-10 px-7 overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-purple-100 via-blue-100 to-blue-200`}>
      
      <FaFileLines size={22} className="text-blue-500" />
      
      <h3 className={`text-3xl font-semibold mt-3 ${note.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
        {note.title}
      </h3>
      
      <p className={`text-base leading-snug mt-2 ${note.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
        {note.content}
      </p>
      
      {note.reminder && (
        <div className='mt-3 text-xs text-gray-600'>
          <span className='font-medium'>Reminder:</span> {new Date(note.reminder).toLocaleString()}
        </div>
      )}

      <div className='absolute top-3 right-4 flex space-x-3'>
        <button onClick={onToggleComplete} className="focus:outline-none">
          {note.completed ? <MdCheckBox size={25} className="text-teal-500" /> : <MdCheckBoxOutlineBlank size={25} className="text-blue-500" />}
        </button>
      </div>
      
      <div className={`absolute bottom-0 w-full py-4 px-8 left-0 flex items-center justify-between transition-colors duration-300 ${note.completed ? 'bg-teal-300' : 'bg-red-300'}`}>
        <button onClick={onEdit} className='edit-button' >
        <svg className="edit-svgIcon" viewBox="0 0 512 512">
        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
        </button>

        <button onClick={onDelete} className="button">
           <svg viewBox="0 0 448 512" className="  svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
        </button>
      </div>
    </motion.div>
  );
}

export default Card;
