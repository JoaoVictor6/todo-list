import React, { useEffect, useState } from 'react';
import './style.scss';

const greetings = [
  [
    'Good morning',
    5,
    11
  ],
  [
    'Good afternoon',
    11,
    16
  ],
  [
    'Good Evening',
    16,
    19
  ],
  [
    'Good night',
    19,
    5
  ]
];

export default function Header(){
  const [message, setMessage] = useState('');
  useEffect(() => {
    const h = new Date();
    const hours = h.getHours();
    const greeting = greetings.filter(([_, init, finish]) => (init <= hours && hours < finish) || init >= 19);

    setMessage(greeting[0][0] as string);
  },[]);

  return (
    <header className="header">
      <h1 className="header__title">{message}</h1>
    </header>
  );
}