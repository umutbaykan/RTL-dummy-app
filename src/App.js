import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [init, setInit] = useState("initial state")

  const someFetch = () => {
    fetch("/getTodos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({somekey: "somevalue"}),
    })
    .then((response) => {
      if (!response.ok) {
        const error = new Error(`HTTP Error: Status ${response.status}`);
        error.status = response.status;
        throw error;
      }
      return response.json();
    })
      .then((data) => setInit(data.todos))
  }

  const somePostFetch = () => {
    fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({somekey: "somevalue"}),
    })
  }

  return (
    <div className="App">
      <p data-testid="unique-id">{init}</p>
      <button data-testid="button-to-click" onClick={() => someFetch()}>clicky</button>
      <button data-testid="button-to-click-2" onClick={() => somePostFetch()}>clicky</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
