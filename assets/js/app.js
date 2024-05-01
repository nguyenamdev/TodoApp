async function fetchAndDisplayTodoList() {
  try {
    const response = await fetch('/todos');
    const todos = await response.json();

    const todoTableBody = document.getElementById('todo-table-body');
    todoTableBody.innerHTML = '';

    todos.forEach(todo => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${todo.id}</td>
        <td>${todo.todo}</td>
        <td>
          <button class="btn btn-primary btn-sm edit-btn" data-id="${todo.id}">Edit</button>
          <button class="btn btn-danger btn-sm delete-btn" data-id="${todo.id}">Delete</button>
        </td>
      `;
      todoTableBody.insertBefore(row, todoTableBody.firstChild);
    });
  } catch (error) {
    console.error('Error fetching todo list:', error);
  }
}
// Call the function to fetch and display todo list when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayTodoList();
});
// Function to handle form submission and add new todo
document.getElementById('add-todo-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const todoInput = document.getElementById('todo-input').value;

  try {
    const response = await fetch('/todos/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: todoInput,
      }),
    });

    if (response.ok) {
      // Refresh the todo list after adding a new todo
      fetchAndDisplayTodoList();
      // Clear the input field
      document.getElementById('todo-input').value = '';
    } else {
      console.error('Failed to add todo:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding todo:', error);
  }
});

document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('edit-btn')) {
    const todoId = event.target.dataset.id;
    const newTodo = prompt('Enter the new todo:');
    if (newTodo !== null) {
      try {
        const response = await fetch(`/todos/${todoId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            todo: newTodo,
          }),
        });
        if (response.ok) {
          // Refresh the todo list after editing a todo
          fetchAndDisplayTodoList();
        } else {
          console.error('Failed to edit todo:', response.statusText);
        }
      } catch (error) {
        console.error('Error editing todo:', error);
      }
    }
  }
});
// Function to handle delete button click
document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const todoId = event.target.dataset.id;
    try {
      const response = await fetch(`/todos/${todoId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Refresh the todo list after deleting a todo
        fetchAndDisplayTodoList();
      } else {
        console.error('Failed to delete todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
});
// Function to handle form submission and search todo
document.getElementById('search-input').addEventListener('input', () => {
  const searchKeyword = document.getElementById('search-input').value.toLowerCase();
  const rows = document.querySelectorAll('#todo-table-body tr');

  rows.forEach(row => {
    const todoText = row.querySelector('td:nth-child(2)').textContent.trim().toLowerCase();
    if (todoText.includes(searchKeyword)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});



