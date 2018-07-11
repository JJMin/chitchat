import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.newMessageHandler = this.newMessageHandler.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({ messages: messages })
    // }, 3000);
    this.chitchatWebSocket = new WebSocket("ws://localhost:3001/");
    
    // Interprets incoming messages from websocket server
    this.chitchatWebSocket.onmessage = e => {
      const msgObj = JSON.parse(e.data);
      this.updateMessages(msgObj);
    };
  }

  updateMessages = msgObj => {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, msgObj];
    this.setState({ messages: newMessages });
  };

  newMessageHandler(e) {
    if (e.key == "Enter") {
      const newMessageObj = {
        username: this.state.currentUser.name,
        content: e.target.value
      };

      // Send the msg object as a JSON-formatted string
      this.chitchatWebSocket.send(JSON.stringify(newMessageObj));

      e.target.value = "";
    }
  }

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
          newMessageHandler={this.newMessageHandler}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}

export default App;
