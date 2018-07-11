import React, { Component } from 'react';

class ChatBar extends Component {
  handleSubmit = e => {
    if (e.key == "Enter") {
      const newMessage = e.target.value;
      this.props.sendMessage(newMessage);
      e.target.value = "";
    }
  }

  handleChange = e => {
    if (e.key == "Enter") {
      const newUsername = e.target.value;
      this.props.sendUsername(newUsername);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name} onKeyPress={this.handleChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleSubmit} />
      </footer>
    );
  };
};

export default ChatBar;
