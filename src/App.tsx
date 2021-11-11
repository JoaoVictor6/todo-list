import React from 'react';
import './App.scss';

function App() {
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  return (
    <main className="App">
      <header>
        <h1>Todo list</h1>
        <h2>With realtime database</h2>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="new goal for day!"/>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
              <path
                fill="#717171"
                fillRule="evenodd"
                // eslint-disable-next-line max-len
                d="M14 4.2a1.4 1.4 0 011.4 1.4v7h7a1.4 1.4 0 110 2.8h-7v7a1.4 1.4 0 11-2.8 0v-7h-7a1.4 1.4 0 110-2.8h7v-7A1.4 1.4 0 0114 4.2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </header>
    </main>
  );
}

export default App;
