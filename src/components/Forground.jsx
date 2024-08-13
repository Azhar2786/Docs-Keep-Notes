import React, { useRef, useState } from 'react';
import Card from './Card';
import { IoMdClose } from "react-icons/io";
import { useTodo } from '../contexts';

function Forground() {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [reminder, setReminder] = useState("");
  const [editId, setEditId] = useState(null);

  const { todos, addTodo, updateTodo, toggleComplete , deleteTodo} = useTodo();

  const ref = useRef(null);
  const handleAddNote = () => {
    setShowInput(true);
  };

  const handleCancel = () => {
    setShowInput(false);
    setTitle("");
    setInputValue("");
    setReminder("");
    setEditId(null);
  };

  const handleSaveNote = () => {
    const newNote = { title, content: inputValue, reminder, completed: false };

    if (editId !== null) {
      updateTodo(editId, { ...newNote, id: editId });
    } else {
      addTodo(newNote);
    }

    handleCancel();
  };

  const handleEdit = (id) => {
    const note = todos.find((note) => note.id === id);
    if (note) {
      setTitle(note.title);
      setInputValue(note.content);
      setReminder(note.reminder);
      setEditId(note.id);
      setShowInput(true);
    }
  };

  const onDeleteTodo = (id) => {
    deleteTodo(id);
  }

  const handleToggleComplete = (id) => {
    toggleComplete(id);
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleReminderChange = (e) => setReminder(e.target.value);

  return (
    <>
      <div className='fixed top-0 left-0 z-[3] w-full h-full'>
        <button 
          onClick={handleAddNote} 
          className='fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition z-[4]'>
          Add Note
        </button>

        {showInput && (
          <>
            {/* Backdrop Overlay */}
            <div className='fixed inset-0 bg-black opacity-50 z-[4]' ></div>

            {/* Input Form */}
            <div className='fixed top-1/4 left-1/2 -translate-x-1/2 bg-white p-7 rounded-lg shadow-2xl z-[5] w-[90%] max-w-md animate-fadeIn bg-gradient-to-r from-purple-100 via-blue-100 to-blue-200'>
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-gray-700'>
                  {editId !== null ? 'Edit Note' : 'Add New Note'}
                </h2>
                <button onClick={handleCancel}>
                  <IoMdClose size={24} className='text-gray-600 hover:text-gray-800 hover:scale-110 transition'/>
                </button>
              </div>

              <input 
                value={title}
                onChange={handleTitleChange}
                className='w-full mt-4 p-2 border border-gray-300 rounded-md' 
                placeholder='Note Title' />

              <textarea 
                value={inputValue}
                onChange={handleInputChange}
                className='w-full mt-4 h-28 p-2 border border-gray-300 rounded-md resize-none' 
                placeholder='Enter your note here...'></textarea>

              <div className='mt-4'>
                <label className='text-gray-600'>Set Reminder:</label>
                <input 
                  type='datetime-local'
                  value={reminder}
                  onChange={handleReminderChange} 
                  className='w-full mt-2 p-2 border border-gray-300 rounded-md' />
              </div>

              <div className='flex justify-end space-x-2 mt-6'>
                <button 
                  onClick={handleCancel}
                  className='bg-red-500 text-white p-2 rounded hover:bg-red-600 transition hover:scale-110'>
                  Cancel
                </button>
                <button 
                  onClick={handleSaveNote}
                  className='bg-green-500 text-white p-2 rounded hover:bg-green-600 transition hover:scale-110'>
                  {editId !== null ? 'Update Note' : 'Save Note'}
                </button>
              </div>
            </div>
          </>
        )}

        <div ref={ref} className='flex flex-wrap gap-7 p-4 fixed top-0 left-0 z-[3] w-full h-full  overflow-y-scroll hide-scrollbar'>
          {todos.map((note) => (
            <Card 
              key={note.id} 
              note={note} 
              onEdit={() => handleEdit(note.id)}
              onToggleComplete={() => handleToggleComplete(note.id)}
              onDelete={() => onDeleteTodo(note.id)}
              reference={ref}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Forground;
