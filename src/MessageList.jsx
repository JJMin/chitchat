import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map((messageObj, index) => <Message key={index} id={index} username={messageObj.username} message={messageObj.content} />)}
        <div className="message system"></div>
      </main>
    );
  }
}

export default MessageList;
