import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/default-profile-image.jpg';

const MessageItem = ({
  date, 
  profileImageUrl, 
  text, 
  username, 
  removeMessage, 
  isCorrectUser,
  user_id,
  message_id
}) => (
  <div>
    <li className='list-group-item'>
      <img 
        className='timeline-image'
        src={profileImageUrl || DefaultProfileImage} 
        alt={username} 
        height='100' 
        width='100' 
      />
      <div className='message-area'>
        <Link to='/'>@{username} &nbsp;</Link>
        <span className='text-muted'>
          <Moment className='text-muted' format='Do MMM YYYY'>
            {date}
          </Moment>
        </span>
        <p>{text}</p>
        {isCorrectUser && (
          <div>
            <Link to={`/users/${user_id}/messages/${message_id}/edit`} className='btn btn-warning'>
              Edit
            </Link>
            <button className='btn btn-danger' onClick={removeMessage}>
              Delete
            </button>
          </div>
        )}

      </div>
    </li>
  </div>
);

export default MessageItem;