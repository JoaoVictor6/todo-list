import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AuthFirebase from '../../services/auth';

import './style.scss';
type UserProps ={
  photoUrl: string
  name: string
}

export default function Nav() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProps>();
  const { UserInfo, googleSignout } = AuthFirebase;
  useEffect(() => {
    if(!UserInfo) return navigate('/');

    setUserData({
      photoUrl: UserInfo.photoURL,
      name: UserInfo.displayName
    });
  }, [UserInfo, navigate]);
  return(
    <nav className="account-info">
      <button 
        className="account-info__button"
        onClick={() => {
          googleSignout().then(() => {
            navigate('/');
          });
        }}
      >
        Exit
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
          <path stroke="#565459" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.833 10l-2.5-2.5M10 10h5.833H10zm5.833 0l-2.5 2.5 2.5-2.5zM15.833 5v-.833c0-.92-.746-1.667-1.666-1.667H5.833c-.92 0-1.666.746-1.666 1.667v11.666c0 .92.746 1.667 1.666 1.667h8.334c.92 0 1.666-.746 1.666-1.667V15"/>
        </svg>
      </button>
      <img 
        className="account-info__user-picture"
        src={userData?.photoUrl}
        alt={`${userData?.name}`}
      />
    </nav>
  );
}