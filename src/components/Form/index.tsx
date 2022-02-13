import React, { useState } from 'react';
import './style.scss';

type FormProps = {
  submitHandler: (event: React.FormEvent<HTMLFormElement>, description: string) => void
}

export default function Form({ submitHandler }: FormProps){
  const [inputDescription, setInputDescription] = useState('');
  return(
    <form
      onSubmit={(e) => {
        submitHandler(e, inputDescription);
        setInputDescription('');
      }}
    >
      <input
        type="text"
        placeholder="new goal for day!"
        value={inputDescription}
        onChange={(e) => setInputDescription(e.target.value)}
      />
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26">
          <path stroke="#A9A6A6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 13v6.5M6.5 13H13 6.5zm13 0H13h6.5zM13 13V6.5 13z"/>
        </svg>
      </button>
    </form>
  );
}