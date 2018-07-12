import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

  componentDidMount() {
    this.chitchatWebSocket = new WebSocket("ws://localhost:3001/");

    // Interprets incoming messages from websocket server
    this.chitchatWebSocket.onmessage = e => {
      const msgObj = JSON.parse(e.data);
      switch(msgObj.type) {
        case "incomingMessage":
          // handle incoming message
          this.updateMessages(msgObj);
          break;
        case "incomingNotification":
          // handle incoming notification
          this.updateNotifications(msgObj);
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + msgObj.type);
      }
    };
  }

  updateNotifications = notificationObj => {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, notificationObj];
    this.setState({ messages: newMessages });
  };

  updateMessages = msgObj => {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, msgObj];
    this.setState({ messages: newMessages });
  };

  sendMessage = newMessage => {
    const newMessageObj = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: newMessage
    };
    // Send the msg object as a JSON-formatted string
    this.chitchatWebSocket.send(JSON.stringify(newMessageObj));
  };

  sendUsername = newUsername => {
    const notificationObj = {
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed their name to ${newUsername}`
    };
    // Send the notification object as a JSON-formatted string
    this.chitchatWebSocket.send(JSON.stringify(notificationObj));
    this.setState({ currentUser: { name: newUsername } });
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            ChitChat
          </a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          sendMessage={this.sendMessage}
          currentUser={this.state.currentUser}
          sendUsername={this.sendUsername}
        />
      </div>
    );
  }
}

export default App;
