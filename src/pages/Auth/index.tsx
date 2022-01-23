import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthFirebase from '../../services/auth';
import illustration from '../../assets/images/pablita-list-is-empty.png'
import googleLogo from '../../assets/images/google-logo.png'

import './style.scss';

export default function Auth() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = AuthFirebase.UserInfo
    if(!user)return
    const { uuid } = user

    navigate(`/users/${uuid}/todos`)
  })
  async function onClickHandler() {
    const authFirebase = AuthFirebase
    const response = await authFirebase.authentication()
        
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
