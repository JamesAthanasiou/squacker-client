import React from 'react';
import DefaultProfileImg from '../images/default-profile-image.jpg';

const UserAside = ({profileImageUrl, username}) => (
  // was col-sm-2 but that meant the profile image would resize
  // col-pixel-width-100 apears to have fixed the size but not entirely sure what the 100 represents
  <aside className='col-sm-4'>
    <div className='panel panel-default'>
      <div className='panel-body'>
        <img 
          src={profileImageUrl || DefaultProfileImg}
          alt={username}
          className='img-thumbnail'

        />
      </div>
    </div>
  </aside>
);

export default UserAside;