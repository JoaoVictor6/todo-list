import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem, setItem } from '../../hooks/useLocalStorage';
import {AuthFirebase} from '../../services/auth';
import { auth } from '../../services/firebase';
import illustration from '../../assets/images/pablita-list-is-empty.png'
import googleLogo from '../../assets/images/google-logo.png'

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
    const authFirebase = new AuthFirebase(auth)
    const response = await authFirebase.authentication()
        
    setItem("@todolist/uid", response)
    navigate(`/users/${response}/todos`)
  }
  return (
    <main className='container'>
      <h1 className="container__title">
        Todo app
      </h1>
      <img src={illustration} alt="illustration" className='container__image'/>
      <button className="container__button" onClick={onClickHandler}>
        <img src={googleLogo} alt="google logo" />
        <p>
          Login with google
        </p>
      </button>
    </main>
  );
}
