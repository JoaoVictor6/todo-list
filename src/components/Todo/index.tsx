import React from 'react';
import './style.scss';

interface TodoItem {
  finished: boolean
  description: string
  id: string
}
type EventsHandler = {
  changeHandler: React.ChangeEventHandler<HTMLInputElement>
  deleteHandler: React.MouseEventHandler<HTMLButtonElement>
}
type TodoProps = EventsHandler & {
  items: TodoItem[]
}

export default function Todo({items, changeHandler, deleteHandler}:TodoProps){
  return (
    <section className='todo-list-container'>
      {items.map(({id, description, finished}) => (
        <section 
          className='todo-item'
          key={`${id}__item`}
        >
          <input type="checkbox" id={id} checked={finished} onChange={changeHandler}/>
          <h1>
            <label htmlFor={id}>
              {description}
            </label>
          </h1>
          <button id={id} onClick={deleteHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </section>
      )
      )}
    </section>
  );
}