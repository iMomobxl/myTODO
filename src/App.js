import './App.css';

function App() {
  return (
    <div className="App">
      <h1>TODO app</h1>
      <div className="todo-wrapper">

        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" placeholder="What's the task title?" />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" placeholder="What's the task description?" />
          </div>
          <div className="todo-input-item">
            <button type="button" className="primaryBtn">Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button className="secondaryBtn">TODO</button>
          <button className="secondaryBtn">Completed</button>
        </div>

        <div className="todo-list">
          <div className="todo-list-item">
            <h3>Task 1</h3>
            <p>Description</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
