import deleteIcon from '../assets/delete.svg'
import './Todo.css'

function Login() {
  // Function to handle the click on a todo item
  const handleTodoItemClick = () => {
    // Add your logic for opening a new page here
    console.log('Opening a new page...');
  };

  return (
    <div className='todo'>
      <h1 className='todo-heading'>Daily Tasks</h1>
      <button className='todo-completed'>✅ Completed</button>
      <h2 className='todo-list-heading'>To do Tasks</h2>

      <div className="todo-list">
        <div className="todo-item" onClick={handleTodoItemClick}>
          <div className="todo-content">
            <label>Todo item 1</label>
            <span className="delete-icon" onClick={(e) => e.stopPropagation()}>
              <img src={deleteIcon} alt="Delete" />
            </span>
          </div>
        </div>
        <div className="todo-item" onClick={handleTodoItemClick}>
          <div className="todo-content">
            <label>Todo item second</label>
            <span className="delete-icon" onClick={(e) => e.stopPropagation()}>
              <img src={deleteIcon} alt="Delete" />
            </span>
          </div>
        </div>
        <div className="todo-item" onClick={handleTodoItemClick}>
          <div className="todo-content">
            <label>This is the third item of todo list</label>
            <span className="delete-icon" onClick={(e) => e.stopPropagation()}>
              <img src={deleteIcon} alt="Delete" />
            </span>
          </div>
        </div>
      </div>

      <button className='add-todo-button'>+</button>

    </div>
  )
}

export default Login;
