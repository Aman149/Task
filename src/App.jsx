import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import Signup from './components/Signup.jsx';
import Todo from './components/Todo.jsx';
import CreateTodo from './components/CreateTodo.jsx';
import UpdateTodo from './components/UpdateTodo.jsx';
import TodoCompleted from './components/TodoCompleted.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { isAuthenticated } from './lib/auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={isAuthenticated() ? '/todo' : '/login'} replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route
          path='/todo'
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />
        <Route
          path='/add-todo'
          element={
            <ProtectedRoute>
              <CreateTodo />
            </ProtectedRoute>
          }
        />
        <Route
          path='/edit-todo/:id'
          element={
            <ProtectedRoute>
              <UpdateTodo />
            </ProtectedRoute>
          }
        />
        <Route
          path='/todo-completed'
          element={
            <ProtectedRoute>
              <TodoCompleted />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

