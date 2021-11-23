import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import './App.scss';
import Todo from './components/Todo';
import { changeTodoData, deleteTodo, getTodos, writeUserTodo } from './services/database';

function ID(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
};

interface TodoProps {
  finished: boolean
  description: string
  id: string
}

function App() {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [inputDescription, setInputDescription] = useState('');
  const { uid } = useParams()

  useEffect(() => {
    getTodos<TodoProps[]>(uid as string).then(data => {
      if(data !== null){
        data ? setTodos(data) : setTodos([])
      }
    })
  }, [uid])

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const idTodo = ID()
    
    if (!inputDescription) return;
    setTodos((old) => [...old, {
      description: inputDescription,
      finished: false,
      id: idTodo
    }]);

    setInputDescription('');
    writeUserTodo(idTodo, inputDescription, false)
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.target.id;
    setTodos((oldTodos) => (
      oldTodos.map((item:TodoProps) =>{
        if(id === item.id){
          changeTodoData(item.id, item.description, event.target.checked)
          return {...item, finished: event.target.checked}
        } 
        return {...item};
      })
    ));
  
  }

  function deleteHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = event.currentTarget.id;
    setTodos((oldTodos) =>
      [...oldTodos.filter((item) => item.id !== id)],
    );

    deleteTodo(id)
  }

  return (
    <main className="App">
      <header>
        <h1>
          Todo list
        </h1>
        <h2>With realtime database</h2>
      </header>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="new goal for day!"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
        />
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
            <path
              fill="#717171"
              fillRule="evenodd"
              d="M14 4.2a1.4 1.4 0 011.4 1.4v7h7a1.4 1.4 0 110 2.8h-7v7a1.4 1.4 0 11-2.8 0v-7h-7a1.4 1.4 0 110-2.8h7v-7A1.4 1.4 0 0114 4.2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
      <div className="todo-area">
        {todos.map((item, index) => {
          return (
            <Todo
              isChecked={item.finished}
              deleteHandler={deleteHandler}
              changeHandler={changeHandler}
              key={`toto_${index}`}
              description={item.description}
              id={item.id}/>
          );
        })}
      </div>
    </main>
  );
}

export default App;
