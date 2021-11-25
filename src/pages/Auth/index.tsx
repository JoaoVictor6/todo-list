import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem, setItem } from '../../hooks/useLocalStorage';
import AuthFirebase from '../../services/auth';
import './style.scss';

export default function Auth() {
  const navigate = useNavigate()
  useEffect(() => {
    const uid = getItem<string>("@todolist/uid")

    if(uid) {
      navigate(`/users/${uid}/todos`)
    }
  })
  async function onClickHandler() {
    const response = await AuthFirebase()
        
    setItem("@todolist/uid", response)
    navigate(`/users/${response}/todos`)
  }
  return (
    <main>
      <button className="auth-button" onClick={onClickHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="none" viewBox="0 0 38 38">
          <path fill="#4285F4" d="M37.596 19.427c0-1.25-.11-2.438-.3-3.594H19.403v7.141h10.244c-.46 2.343-1.805 4.323-3.8 5.668v4.75h6.112c3.578-3.309 5.636-8.185 5.636-13.965z"/>
          <path fill="#34A853" d="M19.404 38c5.13 0 9.42-1.71 12.556-4.608l-6.112-4.75c-1.71 1.14-3.88 1.837-6.444 1.837-4.956 0-9.152-3.34-10.656-7.853H2.446v4.892C5.566 33.725 11.978 38 19.404 38z"/>
          <path fill="#FBBC05" d="M8.748 22.626A11.025 11.025 0 018.146 19c0-1.267.222-2.486.602-3.626v-4.892H2.446a18.78 18.78 0 000 17.036l6.302-4.892z"/>
          <path fill="#EA4335" d="M19.404 7.52c2.802 0 5.304.967 7.283 2.85l5.415-5.414C28.825 1.884 24.534 0 19.404 0 11.978 0 5.565 4.275 2.446 10.482l6.302 4.892c1.504-4.512 5.7-7.853 10.656-7.853z"/>
        </svg>
        Enter with google
      </button>
    </main>
  );
}
