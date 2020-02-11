import React from 'react';
import { Link } from 'react-router-dom';
import DefaultProfileImg from '../images/default-profile-image.jpg';

const UserAside = ({profileImageUrl, username}) => (
  // was col-sm-2 but that meant the profile image would resize
  // col-pixel-width-100 apears to have fixed the size but not entirely sure what the 100 represents
  <aside className='col-md-4'>
    <div className='card'>
      <div className='card-body'>
        <img 
          src={profileImageUrl || DefaultProfileImg}
          alt={username}
          className='img-thumbnail'
        />
      </div>
      <div className='card-footer'>
        <Link to='/'>@{username} &nbsp;</Link>
      </div>
    </div>
  </aside>
);

export default UserAside;