import React, {useState} from 'react';
import './App.scss';
import Todo from './components/Todo';

interface TodoProps {
  finished: boolean
  description: string
}

function App() {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [inputDescription, setInputDescription] = useState('');

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!inputDescription) return;
    setTodos((old) => [...old, {
      description: inputDescription,
      finished: false,
    }]);
    setInputDescription('');
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.target.id;

    setTodos((oldTodos) => (
      oldTodos.map((item:TodoProps, index) =>{
        return id === index+'' ? {...item, finished: event.target.checked} : {...item};
      })
    ));
  }

  function deleteHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = event.currentTarget.id;
    setTodos((oldTodos) =>
      [...oldTodos.filter((_, index) => index+'' !== id)],
    );
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
              id={index + ''}/>
          );
        })}
      </div>
    </main>
  );
}

export default App;
