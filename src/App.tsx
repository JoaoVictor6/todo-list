import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router';
import Header from './components/Header';
import Todo from './components/Todo';
import { FirebaseDatabase } from './services/database';
import { auth } from './services/firebase';

import notFoundIllustration from './assets/images/pablita-page-not-found.png';
import './App.scss';
import Nav from './components/Nav';
import Form from './components/Form';
function ID(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
}

interface TodoProps {
  finished: boolean
  description: string
  id: string
}

function App() {
  const [todos, setTodos] = useState<TodoProps[]>();
  const { uid } = useParams();
  const navigate = useNavigate();

  const firebaseDatabase = new FirebaseDatabase(auth, () => {
    navigate('/');
  });
  const { 
    changeTodoData, 
    getTodos, 
    deleteTodo, 
    writeUserTodo
  } = firebaseDatabase;

  useEffect(() => {
    getTodos<TodoProps[]>(uid as string).then(data => {
      data ? setTodos(data) : setTodos([]);
    });
  }, [uid, getTodos]);

  function submitHandler(event: React.FormEvent<HTMLFormElement>, description: string) {
    event.preventDefault();
    const idTodo = ID();
    
    if (!description) return;
    setTodos((old) => [...old || [] as TodoProps[], {
      description: description,
      finished: false,
      id: idTodo
    }]);

    writeUserTodo(idTodo, description, false);
  }

  async function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.target.id;
    setTodos((oldTodos) => (
      oldTodos?.map((item:TodoProps) =>{
        if(id === item.id){
          changeTodoData(item.id, item.description, event.target.checked);
          return {...item, finished: event.target.checked};
        } 
        return {...item};
      })
    ));
  
  }

  function deleteHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = event.currentTarget.id;
    setTodos((oldTodos) =>
      [...oldTodos?.filter((item) => item.id !== id) || []],
    );

    deleteTodo(id);
  }

  return (
    <main className="App">
      <Nav />
      <Header />
      <section className="app-container">
        <Form submitHandler={submitHandler}/>
        <section className="todo-container">
          {!todos || todos?.length === 0 ? (
            <section className="notfound">
              <img src={notFoundIllustration} alt="Not found illustration" />
              <h1>tasks not found</h1>
            </section>
          ) : (
            <Todo items={todos} changeHandler={changeHandler} deleteHandler={deleteHandler}/>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
