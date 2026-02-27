import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';
function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [isDark, setIsDark] = useState(false);
  // Состояние для текущего фильтра 
  const [filter, setFilter] = useState('all');
  // Сохраняем задачи в localStorage при каждом изменении 
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  // Добавь этот эффект:
  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#333' : '#fff';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, [isDark]);
  // Добавление новой задачи
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };
  // Переключение статуса задачи 
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  // Удаление задачи 
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  // Фильтрация задач 
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' 
  });
  // Подсчет активных задач 
  const activeCount = todos.filter(todo => !todo.completed).length;
   return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      // Цвета фона и текста
      backgroundColor: isDark ? '#333' : '#fff',
      color: isDark ? '#fff' : '#333',
      minHeight: '100vh',
      transition: 'all 0.3s'
    }}>
      
      <h1 style={{ textAlign: 'center', color: isDark ? '#fff' : '#333' }}>Менеджер задач</h1>
      
      <button
        onClick={() => setIsDark(!isDark)}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          background: isDark ? '#fff' : '#333',
          color: isDark ? '#333' : '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'block',
          margin: '0 auto 20px auto'
        }}
      >
        {isDark ? 'Светлая тема' : 'Тёмная тема'}
      </button>

      <AddTodoForm onAdd={addTodo} isDark={isDark} />
      
      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
        isDark={isDark}
      />
      {filteredTodos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999' }}>
          {filter === 'all' ? 'Задач пока нет' :
            filter === 'active' ? 'Нет активных задач' : 'Нет выполненных задач'}
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              task={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              isDark={isDark}
            />
          ))}
        </ul>
      )}
      {todos.length > 0 && (
        <button
          onClick={() => setTodos([])}
          style={{
            marginTop: '20px',
            padding: '8px 16px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Очистить всё
        </button>
      )}
    </div>
  );
}
export default App;