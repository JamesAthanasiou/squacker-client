import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside.js';

const MessageTimeline = props => {
  return (
    <div className='container'>
      <div className='row'>
        <UserAside 
          profileImageUrl={props.profileImageUrl}
          username={props.username}
        />
        <MessageList />
      </div>
    </div>
  );
};

export default MessageTimeline;

