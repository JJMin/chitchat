import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {
          this.props.messages.map((messageObj, index) => {
            if (messageObj.type === "incomingMessage") {
              return <Message key={index} id={index} username={messageObj.username} message={messageObj.content} />
            }
            else if (messageObj.type === "incomingNotification") {
              return <Notification key={index} notification={messageObj.content}/>
            }
          })
        }
      </main>
    );
  }
}

export default MessageList;
