// Приняли isDark в параметры
function TodoFilters({ filter, onFilterChange, activeCount, isDark }) {
  
  // Определяем цвета в зависимости от темы
  const textColor = isDark ? '#fff' : '#333';
  const borderColor = isDark ? '#555' : '#eee';
  const inactiveBg = isDark ? '#444' : '#f0f0f0';
  const inactiveColor = isDark ? '#ccc' : '#333';

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: `2px solid ${borderColor}`, // Динамическая граница
      color: textColor // Динамический цвет текста
    }}>
      <span>Осталось задач: {activeCount}</span>
      <div>
        {['all', 'active', 'completed'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => onFilterChange(filterType)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              background: filter === filterType ? '#007bff' : inactiveBg,
              color: filter === filterType ? 'white' : inactiveColor, // Динамический цвет текста кнопки
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {filterType === 'all' ? 'Все' :
             filterType === 'active' ? 'Активные' : 'Выполненные'}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodoFilters;