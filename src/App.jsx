import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };
    this.newMessageHandler = this.newMessageHandler.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
  }

  newMessageHandler(e) {
    if (e.key == 'Enter') {
      const oldMessages = this.state.messages;
      const newMessageObj = {
        id: oldMessages.length + 1,
        username: this.state.currentUser.name,
        content: e.target.value
      };
      const newMessages = [...oldMessages, newMessageObj];
      this.setState({
        messages: newMessages
      });
      e.target.value = '';
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">ChitChat</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar newMessageHandler={this.newMessageHandler} currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;
